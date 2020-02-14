import React from 'react';
import Nav from "./Nav.jsx";
import messager from "../model/Messager";
import "./style/ContentTemplate.css"
import "./style/Common.css"
import Redirect from "react-router-dom/es/Redirect";

export default class ContentTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    createWithTemplate(body) {
        return (
            <div>
                <div className="topBar">
                    <div className="userInfo">Logged as <b>{messager.user.username}</b></div>
                    <div className="logout" onClick={this.logout}>Logout</div>
                </div>
                <div className="content">
                    <div className="leftPart">
                        <div className="links">
                            <Nav/>
                        </div>
                    </div>
                    <div className="rightPart">
                        {body}
                    </div>
                </div>
            </div>
        );
    }

    logout() {
        messager.logout();
        this.props.history.push("/");
    }

    redirectIfNotLogged() {
        if (!messager.isLogged()) {
            return <Redirect to="/"/>;
        }
    }
}