import React from 'react';
import {Link} from 'react-router-dom';

export default class Nav extends React.Component {
    render() {
        return (
            <nav>
                <div className="navigateLink">
                    <Link to="/profile">Profile</Link>
                </div>
                <br/>
                <div className="navigateLink">
                    <Link to="/messages">Messages</Link>
                </div>
                <br/>
                <div className="navigateLink">
                    <Link to="/friends">Friends</Link>
                </div>
            </nav>
        );
    }
}