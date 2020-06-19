import React from 'react';

import '../../assets/css/bootstrap.min.css';
import './styles.css';

const Home = () => {
    return (
        <>
            <div className="navbar-nav navbar-inverse navbar-fixed-top">
                <div className="container">
                    <div className="navbar-header">
                        <a className="navbar-brand">V-FOOD</a>
                    </div>
                    <div className="navbar-collapse collapse">
                        <ul className="nav navbar-nav">
                            <li className="active">
                                <a href="/">HOME</a>
                            </li>
                            <li>
                                <a href="/create-categories">CATEGORIAS</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-sm-3 col-lg-3">
                        <div className="dash-unit">
                            <span>Perfil do usuário</span>
                            <hr/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Home;