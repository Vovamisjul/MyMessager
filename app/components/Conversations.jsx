import React from 'react';
import ContentTemplate from "./ContentTemplate.jsx";
import messager from "../model/Messager";
import "./style/Conversations.css"
import MultiSelect from "@kenshooui/react-multi-select";
import "@kenshooui/react-multi-select/dist/style.css"

export default class Conversations extends ContentTemplate {

    constructor(props) {
        super(props);
        this.showCreatingConversation = this.showCreatingConversation.bind(this);
        this.createConversation = this.createConversation.bind(this);
        this.newConversationName = React.createRef();
    }

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

    async showCreatingConversation() {
        let friends = await messager.getFriends();
        let i = 0;
        this.setState({
            showCreate: true,
            friends: friends.map((friend => {
                return {id: i++, label: friend.username}
            })),
            selectedFriends: []
        });
    }

    async createConversation() {
        try {
            let newConversation = await messager.createConversation(this.newConversationName.current.value, this.state.selectedFriends.map(user => user.label));
            this.setState({
                conversations: this.state.conversations.concat(newConversation),
                showCreate: false
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
                    {this.state && this.state.showCreate && <div className="createConversationModal">
                        <input ref={this.newConversationName} placeholder="Conversation name"/>
                        <MultiSelect items={this.state.friends}
                                     onChange={selectedItems => this.setState({selectedFriends: selectedItems})}
                        />
                        <div className="createConversationButton" onClick={this.createConversation}>Create</div>
                        <div className="createConversationButton" onClick={() => this.setState({showCreate: false})}>Cancel</div>
                    </div>}
                    <div className="createConversation">
                        <img src="images/plus.png" alt="add" onClick={this.showCreatingConversation}/>
                        <div className="createConversationText">Create new conversation</div>
                    </div>
                    <div>
                        {
                            this.state && this.state.conversations && this.state.conversations.length > 0 ?
                                <div
                                    className="list">
                                    {
                                        this.state && this.state.conversations.map((conversation) => {
                                            return <div className="listElement"
                                                        onClick={() => this.goToConversation(conversation.id)}>
                                                <div className="conversationName">{conversation.name}</div>
                                            </div>
                                        })
                                    }
                                </div> :
                                <div className="noResult">There are no conversations - create a new one, or wait for the
                                    invite</div>
                        }
                    </div>
                </div>
            )
    }

    goToConversation(id) {
        this.props.history.push(`conversation/${id}`);
    }
}