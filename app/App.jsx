import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/notfound.jsx';
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Conversations from "./components/Conversations.jsx";
import messager from "./model/Messager";
import Conversation from "./components/Conversation.jsx";
import Friends from "./components/Friends.jsx";
import FriendRequests from "./components/FriendRequests.jsx";

export default class App extends React.Component {

    render() {
        messager.restoreUser();
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/(|login)" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/friends" component={Friends} />
                        <Route path="/friendRequests" component={FriendRequests} />
                        <Route path="/conversations" component={Conversations} />
                        <Route path="/conversation/:id" component={Conversation} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}