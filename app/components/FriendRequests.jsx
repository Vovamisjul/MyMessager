import React from 'react';
import ContentTemplate from "./ContentTemplate.jsx"
import messager from "../model/Messager";
import "./style/FriendRequest.css"

export default class FriendRequests extends ContentTemplate {

    async componentDidMount() {
        try {
            let friendRequests = await messager.getFriendRequests();
            this.setState({
                friendRequests: friendRequests
            });
        } catch (e) {
            if (e.message === "401") {
                this.props.history.push("/");
            }
        }
    }

    showUser(username) {
        this.props.history.push(`/user/${username}`)
    }

    async acceptFriendShip(event, username) {
        event.stopPropagation();
        try {
            await messager.acceptFriend(username);
            this.setState({
                friendRequests: this.state.friendRequests.filter(friend => friend.username !== username)
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
                                this.state && this.state.friendRequests.map((friendRequest) => {
                                    return <div className="listElement"
                                                onClick={() => this.showUser(friendRequest.username)}>
                                        <div className="potentialFriendName">{friendRequest.username}</div>
                                        <div className="acceptFriend"
                                             onClick={(event) => this.acceptFriendShip(event, friendRequest.username)}>
                                            Accept friendship
                                        </div>
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