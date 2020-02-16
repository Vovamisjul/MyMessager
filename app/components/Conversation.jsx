import React from 'react';
import ContentTemplate from "./ContentTemplate.jsx"
import messager from "../model/Messager";
import "./style/Conversation.css"
import FileDrop from "react-file-drop";
import { animateScroll } from "react-scroll";
import ReactTooltip from "react-tooltip";

export default class Conversations extends ContentTemplate {

    constructor(props) {
        super(props);
        this.message = React.createRef();
        this.messagesEnd = React.createRef();
        this.sendMessage = this.sendMessage.bind(this);
        this.onFrameDragEnter = this.onFrameDragEnter.bind(this);
        this.onFrameDragLeave = this.onFrameDragLeave.bind(this);
        this.onFrameDrop = this.onFrameDrop.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
    }

    getInitialState() {
        return {
            holdingFile: false,
            file: null
        };
    }

    scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "conversationWindow",
            duration: 0,
            delay: 0
        });
    }

    async componentDidMount() {
        try {
            let messages = await messager.getConversation(this.props.match.params.id);
            this.setState({
                messages: messages,
                holdingFile: false
            });
            this.scrollToBottom();
        } catch (e) {
            console.log(e);
        }
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    async sendMessage(event) {
        event.preventDefault();
        try {
            let selfMessage = await messager.sendMessage(this.props.match.params.id, this.message.current.value, this.state.file, (file) => {
                //this.state.messages[this.state.messages.length - 1].file = file;
                //this.setState();
                console.log(file);
            });
            this.setState({
                messages: this.state.messages.concat(selfMessage),
                file: null
            });
            this.message.current.value = "";
        } catch (e) {
            if (e.message === "401") {
                this.setState({
                    redirectToLogin: true
                });
            }
        }
    }

    async downloadFile(messageId) {
        await messager.downloadFile(messageId);
    }

    onFrameDragLeave() {
        this.setState({
            holdingFile: false
        });
    }

    onFrameDrop() {
        this.setState({
            holdingFile: false
        });
    }

    onDrop(fileList) {
        this.setState({
            holdingFile: false,
            file: fileList[0]
        });
    }

    onDragLeave() {
    }

    onDragOver() {
    }

    onFrameDragEnter() {
        this.setState({
            holdingFile: true
        });
    }

    render() {
        return this.redirectIfNotLogged() ||
            this.createWithTemplate(
                <div className="preComponent">
                    <div className="conversationWindow" id="conversationWindow">
                        {
                            this.state && this.state.messages.map((message) => {
                                return (
                                    <div
                                        className={`message ${message.sender_username === messager.user.username ? "selfMessage" : "otherMessage"}`}>
                                        <div className="messageMain">
                                            <div className="senderText">
                                                <div className="sender">{message.sender_username}:</div>
                                                <div className="messageText">{message.text}</div>
                                            </div>
                                            {
                                                message.file_name && <div className="messageFile" data-tip="Download">
                                                    <a href={`/api/getFile?messageId=${message.id}&token=${messager.jwt.token}`} download={message.file_name}>{message.file_name}</a>
                                                </div>
                                            }
                                            <ReactTooltip/>
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
                    <FileDrop
                        className={this.state && this.state.holdingFile ? "file-drop file-drop-visible" : "file-drop file-drop-invisible"}
                        onFrameDragLeave={this.onFrameDragLeave} onFrameDragEnter={this.onFrameDragEnter}
                        onFrameDrop={this.onFrameDrop} onDrop={this.onDrop} onDragLeave={this.onDragLeave}
                        onDragOver={this.onDragOver}>
                        {this.state && this.state.holdingFile && "Drop file here"}
                    </FileDrop>
                    {
                        this.state && this.state.file &&
                        <div className="selectedFile">
                            {this.state && this.state.file && this.state.file.name}
                        </div>
                    }
                </div>
            )
    }
}