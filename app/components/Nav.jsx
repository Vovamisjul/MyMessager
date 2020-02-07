import React from 'react';
import { Link } from 'react-router-dom'

export default class Nav extends React.Component{
    render(){
        return <nav>
            <Link to="/">Главная</Link>
            <Link to="/about">О сайте</Link>
            <Link to="/products">Товары</Link>
        </nav>;
    }
}