import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/notfound.jsx';
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Messages from "./components/Messages.jsx";
import messager from "./model/Messager";

export default class App extends React.Component {

    render() {
        messager.restoreUser();
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/(|login)" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route path="/messages" component={Messages} />
                        <Route component={NotFound} />
                    </Switch>
                </div>
            </Router>
        );
    }
}