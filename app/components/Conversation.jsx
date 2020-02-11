import React from 'react';
import ContentTemplate from "./ContentTemplate.jsx"
import messager from "../model/Messager";
import "./style/Conversation.css"

export default class Conversations extends ContentTemplate {

    constructor(props) {
        super(props);
        this.message = React.createRef();
        this.sendMessage = this.sendMessage.bind(this);
    }

    async componentDidMount() {
        let response = await messager.getConversation(this.props.match.params.id);
        if (response.ok) {
            this.setState({
                messages: await response.json()
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
                messages: this.state.messages.concat(result)
            });
        }
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
                        <form onSubmit={this.sendMessage}>
                            <textarea ref={this.message} placeholder="Type your text here"/>
                            <input type='submit'/>
                        </form>
                    </div>
                </div>
            )
    }
}