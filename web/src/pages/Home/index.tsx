import React from 'react';
import {Link} from 'react-router-dom';

import '../../assets/css/bootstrap.min.css';
import '../../assets/css/styles.css'; //CSS GERAL
import './styles.css';

const Home = () => {
    return (
        <>
            <header>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <nav className="menu">
                                <ul>
                                    <li>
                                        <Link to="/create-categories">Categorias</Link>
                                    </li>
                                    <li>
                                        <Link to="/create-categories">Categorias</Link>
                                    </li>
                                    <li>
                                        <Link to="/create-categories">Categorias</Link>
                                    </li>
                                    <li>
                                        <Link to="/create-categories">Categorias</Link>
                                    </li>
                                </ul>
                            </nav>    
                        </div>                        
                    </div>
                </div>
            </header>
        </>
    );
}

export default Home;