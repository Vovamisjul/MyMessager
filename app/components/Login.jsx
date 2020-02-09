import React from 'react';
import Redirect from "react-router-dom/es/Redirect";
import messager from "../model/Messager";

export default class Login extends React.Component{

    constructor(props) {
        super(props);
        this.login = React.createRef();
        this.password = React.createRef();
        this.state = {
            incorrectCredentials: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        let response = await messager.login(this.login.current.value, this.password.current.value);
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
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                        <input
                            placeholder="Login"
                            name="login"
                            ref={this.login}
                        />
                        <br/>
                    <input
                        type="password"
                        ref={this.password}
                        placeholder="Password"
                    /><br/>

                    <input type='submit'/>
                </form>
                {incorrectCredentials && <p>Wrong login or password</p>}
            </div>
        )
    }
}