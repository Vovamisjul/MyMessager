import React from 'react';
import Redirect from "react-router-dom/es/Redirect";
import messager from "../model/Messager";
import {Link} from 'react-router-dom';
import "./style/Common.css";
import "./style/Register.css";

export default class Login extends React.Component {

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.state = {
            incorrectCredentials: false,
        };
        this.login = this.login.bind(this);
    }

    async login(event) {
        event.preventDefault();
        try {
            let user = await messager.login(this.username.current.value, this.password.current.value);
            messager.saveUser(user);
            this.setState({
                incorrectCredentials: false,
            });
            this.props.history.push("conversations");
        } catch (e) {
            alert("Wrong login or password")
        }
    };

    render() {
        if (messager.isLogged()) {
            return <Redirect to="/conversations"/>;
        }

        return (
            <div>
                <div className="topBar">

                </div>
                <div className="registerContent">
                    <h1>Sign in!</h1>
                    <form onSubmit={this.login}>
                        <input
                            placeholder="Username"
                            ref={this.username}
                        />
                        <br/>
                        <input
                            type="password"
                            ref={this.password}
                            placeholder="Password"
                        /><br/>

                        <input className="registerContentSubmit" type='submit'/>
                    </form>
                </div>
                <div className="dontHaveAccount">
                    <p>Do not have an account? <Link to="register">Register now!</Link></p>
                </div>
            </div>
        )
    }
}