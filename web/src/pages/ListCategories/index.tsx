import React, {useEffect, useState, useRef} from 'react';
import Header from '../../components/Header';
import {FiEdit, FiTrash2, FiPlusCircle, FiList} from 'react-icons/fi';
import {Link} from 'react-router-dom';
import Loading from '../../components/Loading';

import api from '../../services/api';
import './styles.css';
import Footer from '../../components/Footer';

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

    function getList() {
        setLoading(true);
        api.get('categories').then(response => {
            let dataCategories = response.data;
            setItems(dataCategories);
            setLoading(false);
        });
    }

    function handleDestroy(id) {
        if(window.confirm("Tem certeza que deseja excluir essa categoria?")) {
            api.delete(`categories/${id}`).then(response => {
                let data = response.data;
                if(data.deleteSuccess) {
                    alert("Categoria excluida com sucesso");
                    getList();
                } else {
                    alert("Erro ao tentar deletar categoria");
                }
            });
        }
    }

    return (
        <>
            {
                loading ? (<Loading text="Aguarde... Carregando categorias" />) : ''
            }
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <Link to="/create-categories" className="btnAdd">
                            <FiPlusCircle className="icon" /> 
                            <span>Adicionar nova categoria</span>
                        </Link>
                    </div>
                    <div className="col-md-12">
                        <div className="card">
                            <h1 className="title"><FiList className="icon" /> Listagem de Categorias</h1>
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>NOME</th>
                                            <th>DESCRIÇÃO</th>
                                            <th className="text-center">EDITAR</th>
                                            <th className="text-center">EXCLUIR</th>
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
                                                    <td className="text-center"><Link to={url_edit}><FiEdit /></Link></td>
                                                    <td className="text-center"><button className="btnRemove" type="button" onClick={() => handleDestroy(item["id"])}><FiTrash2 /></button></td>
                                                </tr>)
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
};

export default ListCategories;