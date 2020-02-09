import React from 'react';
import messager from "../model/Messager";

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
        let response = await messager.register(this.username.current.value, this.password.current.value, this.repeatPassword.current.value);
        if (response.ok) {
            let result = await response.json();
            messager.saveUser(result);
            this.setState({
                existingLogin: true,
                differentPasswords: true,
            });
            this.props.history.push("messages");
        } else {
            console.log(response);
            switch (response.status) {
                case 400:
                    this.setState({
                        existingLogin: false,
                        differentPasswords: true,
                    });
                    break;
                case 403:
                    this.setState({
                        existingLogin: true,
                        differentPasswords: false,
                    });
                    break;
            }
        }
    };

    render() {
        const {existingLogin, differentPasswords} = this.state;
        return (
            <div>
                <div className="topBar"></div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Create an account</h1>

                    <label>Create a username</label>
                    <input
                        placeholder='Username'
                        ref={this.username}
                    /><br/>
                    {existingLogin && <p>A user with this name exists. Come up with another</p>}
                    <label>Create a password</label>
                    <input
                        type='password'
                        placeholder='Password'
                        ref={this.password}
                    /><br/>

                    <label>Repeat your password</label>
                    <input
                        type='password'
                        placeholder='Repeat your password'
                        ref={this.repeatPassword}
                    /><br/>
                    {differentPasswords && <p>Passwords should be same</p>}
                    <input type='submit'/>
                </form>
            </div>
        )
    }
}