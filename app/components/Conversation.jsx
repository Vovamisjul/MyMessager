import React from 'react';
import ContentTemplate from "./ContentTemplate.jsx"
import messager from "../model/Messager";
import "./style/Conversation.css"

export default class Conversations extends ContentTemplate {

    async componentDidMount() {
        let response = await messager.getConversation(this.props.match.params.id);
        if (response.ok) {
            this.setState({
                messages: await response.json()
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
                                            {message.date}
                                            {console.log(message.date)}
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            )
    }
}