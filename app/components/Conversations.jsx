import React from 'react';
import ContentTemplate from "./ContentTemplate.jsx"
import messager from "../model/Messager";
import "./style/Conversations.css"

export default class Conversations extends ContentTemplate {

    async componentDidMount() {
        try {
            let conversations = await messager.getConversations();
            this.setState({
                conversations: conversations
            });
        } catch (e) {
            if (e.message === "401") {
                this.props.history.push("/");
            }
        }
    }

    render() {
        return this.redirectIfNotLogged() ||
            this.createWithTemplate(
                <div className="preComponent">
                    <div>
                        <div className="list">
                            {
                                this.state && this.state.conversations.map((conversation) => {
                                    return <div className="listElement"
                                                onClick={() => this.goToConversation(conversation.id)}>
                                        <div className="conversationName">{conversation.name}</div>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                </div>
            )
    }

    goToConversation(id) {
        this.props.history.push(`conversation/${id}`);
    }
}