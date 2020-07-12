import React from 'react';
import {Link} from 'react-router-dom';

import '../assets/css/bootstrap.min.css';
import '../assets/css/styles.css';
import './css/header.css';

const Header = () => {
    return (
        <header>
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className="logo">
                            <Link to="/" className="fas fa-hamburger icon-logo"></Link>
                            <span>VFOOD</span>
                        </h1>
                        <nav className="menu">
                            <ul>
                                <li>
                                    <Link className="link" to="/">Home</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/create-categories">Categorias</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/create-categories">Categorias</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/create-categories">Categorias</Link>
                                </li>
                                <li>
                                    <Link className="link" to="/create-categories">Categorias</Link>
                                </li>
                            </ul>
                        </nav>    
                    </div>                        
                </div>
            </div>
        </header>
    );
}

export default Header;