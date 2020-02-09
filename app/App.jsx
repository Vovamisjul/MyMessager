import ReactDOM from 'react-dom';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NotFound from './components/notfound.jsx';
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Messages from "./components/Messages.jsx";
import messager from "./model/Messager";
import Redirect from "react-router-dom/es/Redirect";

function redirectToLogin() {
    messager.restoreUser();
    if (!messager.isLogged()) {
        return <Redirect to="/login" />;
    }
}

ReactDOM.render(
    <Router>
        <div>
            {redirectToLogin()}
            <Switch>
                <Route exact path="/(|login)" component={Login} />
                <Route path="/register" component={Register} />
                <Route path="/messages" component={Messages} />
                <Route component={NotFound} />
            </Switch>
        </div>
    </Router>,
    document.getElementById("app")
);