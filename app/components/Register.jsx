import React from 'react';
import messager from "../model/Messager";
import "./style/Common.css";
import "./style/Register.css";
import {Link} from "react-router-dom";

export default class Register extends React.Component {

    constructor(props) {
        super(props);
        this.username = React.createRef();
        this.password = React.createRef();
        this.repeatPassword = React.createRef();
        this.state = {
            existingLogin: false,
            differentPasswords: false,
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            let user = await messager.register(this.username.current.value, this.password.current.value, this.repeatPassword.current.value);
            messager.saveUser(user);
            this.setState({
                existingLogin: true,
                differentPasswords: true,
            });
            this.props.history.push("conversations");
        } catch (e) {
            console.log(e.message);
            switch (e.message) {
                case "400":
                    alert("Passwords must be same");
                    break;
                case "403":
                    alert("This login already exists. Choose another");
                    break;
                default:
                    console.log("sad");

            }
        }
    };

    render() {
        const {existingLogin, differentPasswords} = this.state;
        return (
            <div>
                <div className="topBar"></div>
                <div className="registerContent">
                    <form onSubmit={this.handleSubmit}>
                        <h1>Sign up!</h1>
                        <input
                            placeholder='Create username'
                            ref={this.username}
                        /><br/>
                        <input
                            type='password'
                            placeholder='Password'
                            ref={this.password}
                        /><br/>
                        <input
                            type='password'
                            placeholder='Repeat your password'
                            ref={this.repeatPassword}
                        /><br/>
                        <input className="registerContentSubmit" type='submit'/>
                    </form>
                </div>
                <div className="dontHaveAccount">
                    <p>Have an account? <Link to="login">Sign in!</Link></p>
                </div>
            </div>
        )
    }
}