import React from 'react';
import Nav from "./Nav.jsx";
import messager from "../model/Messager";
import "./Common.css"

let commonBuilder;
export default commonBuilder = {
    createWithTemplate(body) {
        return (
            <div>
                <div className="topBar">
                    <div className="userInfo">Logged as <b>{messager.user.login}</b></div>
                    <div className="logout">Logout</div>
                </div>
                <div>
                    <Nav/>
                </div>
                <div>
                    {body}
                </div>
            </div>
        );
    }
}