import React from 'react';
import ContentTemplate from "./ContentTemplate.jsx"
import messager from "../model/Messager";
import "./style/Friends.css"

export default class Friends extends ContentTemplate {

    constructor(props) {
        super(props);
        this.userSearch = React.createRef();
        this.findUser = this.findUser.bind(this);
        this.showUser = this.showUser.bind(this);
    }

    async findUser() {
        if (this.userSearch.current.value === "") {
            this.setState({
                foundUsers: null,
            });
            return;
        }
        try {
            let users = await messager.findUsers(this.userSearch.current.value);
            this.setState({
                foundUsers: users
            });
        } catch (e) {
            console.log(e);
        }
    }

    async componentDidMount() {
        try {
            let friends = await messager.getFriends();
            this.setState({
                friends: friends
            });
        } catch (e) {
            console.log(e);
        }
    }

    showUser(username) {
        this.props.history.push(`user/${username}`);
    }

    async sendFriendReq(event, friendUsername) {
        event.stopPropagation();
        try {
            await messager.sendFriendRequest(friendUsername);
            this.setState({
                foundUsers: this.state.foundUsers.filter(user => user.username !== friendUsername)
            })
        } catch (e) {
            console.log(e);
        }
    }

    render() {
        return this.redirectIfNotLogged() ||
            this.createWithTemplate(
                <div className={"preComponent"}>
                    <div className="addFriend">
                        <input onChange={this.findUser} placeholder="Enter user's name to add friend"
                               ref={this.userSearch}/>
                    </div>
                    {
                        this.state && this.state.foundUsers ?
                            <div className="searchResults">
                                {
                                    this.state.foundUsers.length > 0 ?
                                        <div className="list">
                                            {this.state.foundUsers.map(user => {
                                                return (
                                                    <div className="listElement"
                                                         onClick={() => this.showUser(user.username)}>
                                                        <div className="findUserName">{user.username}</div>
                                                        <div className="addFriendReq"
                                                             onClick={(e) => this.sendFriendReq(e, user.username)}>
                                                            Add friend
                                                        </div>
                                                    </div>)
                                            })}
                                        </div> :
                                        <div className="noResult"> No users with this username</div>
                                }
                            </div> :
                            <div className="list">
                                {
                                    this.state && this.state.friends.map((friend) => {
                                        return <div className="listElement"
                                                    onClick={() => this.showUser(friend.username)}>
                                            <div className="friendName">{friend.username}</div>
                                        </div>
                                    })
                                }
                            </div>
                    }
                </div>);
    }
}