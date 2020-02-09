import React from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends React.Component {
    render() {
        return (
            <nav>
                <Link to="/profile">Profile</Link>
                <br/>
                <Link to="/messages">Messages</Link>
                <br/>
                <Link to="/friends">Friends</Link>
            </nav>
        );
    }
}