import React, {useEffect, useState, useRef} from 'react';
import Header from '../../components/Header';
import {FiEdit, FiTrash2} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import Loading from '../../components/Loading';

import api from '../../services/api';
import './styles.css';

interface Items {
    id: BigInteger,
    name: string,
    description: string
}

const ListCategories = () => {

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState();
    
    useEffect(() => {
        setLoading(true);
        api.get('categories').then(response => {
            let dataCategories = response.data;
            setItems(dataCategories);
            setLoading(false);
        });
    }, []);

    return (
        <>
            {
                loading ? (<Loading text="Aguarde... Carregando categorias" />) : ''
            }
            <Header />
            <div className="container">
                <div className="row">
                    <div className="card">
                        <div className="card-header">
                            <h1>Listagem de Categorias</h1>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>NOME</th>
                                        <th>DESCRIÇÃO</th>
                                        <th>EDITAR</th>
                                        <th>EXCLUIR</th>
                                    </tr>
                                </thead>
                                <tbody id="dataCategories">
                                    {
                                        items.map(item => {
                                            let url_edit = `/edit-categories/${item["id"]}`;
                                            return (<tr>
                                                <td>{item["id"]}</td>
                                                <td>{item["name"]}</td>
                                                <td>{item["description"]}</td>
                                                <td><Link to={url_edit}><FiEdit /></Link></td>
                                                <td><Link to="/remove-categories/"><FiTrash2 /></Link></td>
                                            </tr>)
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default ListCategories;