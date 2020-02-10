import React from 'react';
import ContentTemplate from "./ContentTemplate.jsx"
import messager from "../model/Messager";
import "./style/Conversation.css"

export default class Conversations extends ContentTemplate {

    async componentDidMount() {
        let response = await messager.getConversations();
        if (response.ok) {
            this.setState({
                conversations: await response.json()
            });
        }
    }

    render() {
        return this.redirectIfNotLogged() ||
            this.createWithTemplate(
                <div className="conversations">
                    {
                        this.state && this.state.conversations.map((conversation) => {
                            return <div className="conversation" conversationId={conversation.id}>{conversation.name}</div>
                        })
                    }
                </div>
            )
    }
}