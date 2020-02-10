import React from 'react';
import {Link} from 'react-router-dom';
import "./style/Link.css"

export default class Nav extends React.Component {
    render() {
        return (
            <nav>
                <div className="navigateLink">
                    <Link to="/profile">Profile</Link>
                </div>
                <div className="navigateLink">
                    <Link to="/conversations">Conversations</Link>
                </div>
                <div className="navigateLink">
                    <Link to="/friends">Friends</Link>
                </div>
            </nav>
        );
    }
}