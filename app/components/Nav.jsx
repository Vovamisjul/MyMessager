import React from 'react';
import {Link} from 'react-router-dom';
import "./style/Link.css"

export default class Nav extends React.Component {
    render() {
        return (
            <nav>
                <Link to="/profile">Profile</Link>
                <Link to="/conversations">Conversations</Link>
                <Link to="/friends">Friends</Link>
                <Link to="/friendRequests">Friend requests</Link>
            </nav>
        );
    }
}