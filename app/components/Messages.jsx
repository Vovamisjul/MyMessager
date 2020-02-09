import React from 'react';
import ContentTemplate from "./ContentTemplate.jsx"

export default class Messages extends ContentTemplate {

    render() {
        return this.redirectIfNotLogged() ||
        this.createWithTemplate(
            <u>HI</u>
        )
    }
}