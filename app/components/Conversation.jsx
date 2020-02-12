import React from 'react';
import ContentTemplate from "./ContentTemplate.jsx"
import messager from "../model/Messager";
import "./style/Conversation.css"
import FileDrop from "react-file-drop";

export default class Conversations extends ContentTemplate {

    constructor(props) {
        super(props);
        this.message = React.createRef();
        this.sendMessage = this.sendMessage.bind(this);
        this.onFrameDragLeave = this.onFrameDragLeave.bind(this);
        this.onFrameDragEnter = this.onFrameDragEnter.bind(this);
    }

    async componentDidMount() {
        let response = await messager.getConversation(this.props.match.params.id);
        if (response.ok) {
            this.setState({
                messages: await response.json(),
                holdingFile: false
            });
        }
    }

    async sendMessage(event) {
        event.preventDefault();
        let message = {
            text: this.message.current.value,
            file: null
        };
        let response = await messager.sendMessage(this.props.match.params.id, message);
        if (response.ok) {
            let result = await response.json();
            this.setState({
                messages: this.state.messages.concat(result),
                holdingFile: this.state.holdingFile
            });
            this.message.current.value = "";
        }
    }

    onFrameDragLeave() {
        this.setState({
            messages: this.state.messages,
            holdingFile: false
        });
    }

    onFrameDrop() {
        this.setState({
            messages: this.state.messages,
            holdingFile: false
        });
    }

    onDrop() {
        this.setState({
            messages: this.state.messages,
            holdingFile: false
        });
    }

    onDragLeave() {
        console.log("onDragLeave");
        console.log(arguments);
    }

    onDragOver() {
        console.log("onDragOver");
        console.log(arguments);
    }

    onFrameDragEnter() {
        this.setState({
            messages: this.state.messages,
            holdingFile: true
        });
    }

    render() {
        return this.redirectIfNotLogged() ||
            this.createWithTemplate(
                <div className="preConversationWindow">
                    <div className="conversationWindow">
                        {
                            this.state && this.state.messages.map((message) => {
                                return (
                                    <div className={`message ${message.sender_username === messager.user.username ? "selfMessage" : "otherMessage"}`}>
                                        <div className="messageMain">
                                            <div className="sender">{message.sender_username}:</div>
                                            <div className="messageText">{message.text}</div>
                                        </div>
                                        <div className="messageDate">
                                            {new Date(message.date).toLocaleString()}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                    <div className="messageForm">
                        <div className="inputArea">
                            <textarea ref={this.message} placeholder="Type your text here"/>
                        </div>
                        <div className="submitMessage">
                            <div className="buttonSend" onClick={this.sendMessage}>Send</div>
                        </div>
                    </div>
                    <FileDrop onFrameDragLeave={this.onFrameDragLeave} onFrameDragEnter={this.onFrameDragEnter} onFrameDrop={this.onFrameDrop} onDrop={this.onDrop} onDragLeave={this.onDragLeave} onDragOver={this.onDragOver}>
                        { this.state && this.state.holdingFile && <div>Drop file here</div>}
                    </FileDrop>
                </div>
            )
    }
}