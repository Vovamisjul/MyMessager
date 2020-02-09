import React from 'react';
import Redirect from "react-router-dom/es/Redirect";
import messager from "../model/Messager";
import {Link} from 'react-router-dom';
import "./Common.css"

export default class Login extends React.Component{

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.state = {
            incorrectCredentials: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        let response = await messager.login(this.username.current.value, this.password.current.value);
        if (response.ok) {
            let result = await response.json();
            messager.saveUser(result);
            this.setState({
                incorrectCredentials: false,
            });
            this.props.history.push("messages");
        } else {
            this.setState({
                incorrectCredentials: true,
            });
        }
    };

    render() {
        const { incorrectCredentials } = this.state;
        if (messager.isLogged()) {
            return <Redirect to="/messages" />;
        }

        return (
            <div>
                <div className="topBar">

                </div>
                <div className="registerContent">
                    <form onSubmit={this.handleSubmit}>
                        <h1>Username</h1>
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

                        <input type='submit'/>
                    </form>
                </div>
                {incorrectCredentials && <p>Wrong username or password</p>}
                <div>
                    <p>Do not have an account? <Link to="register">Register now!</Link></p>
                </div>
            </div>
        )
    }
}