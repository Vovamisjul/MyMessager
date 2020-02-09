import React from 'react';
import commonBuilder from "./Common.jsx"

export default class Messages extends React.Component {

    render() {
        return commonBuilder.createWithTemplate(
            <u>HI</u>
        )
    }
}