import React from 'react';

export default class Register extends React.Component {

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Sign Up For An Account</h1>

                <label>Username</label>
                <input
                    name='username'
                    placeholder='Username'
                    onChange={this.handleChange}
                /><br/>

                <label>Password</label>
                <input
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={this.handleChange}
                /><br/>

                <label>Repeat your password</label>
                <input
                    type='repeat_password'
                    name='repeat_password'
                    placeholder='Repeat your password'
                    onChange={this.handleChange}
                /><br/>

                <input type='submit'/>
            </form>
        )
    }
}