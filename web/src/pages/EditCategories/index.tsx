import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';
import api from '../../services/api';

import './styles.css';

const EditCategories = (props) => {

    const [formData, setFormData] = useState({
        id: '',
        name: '',
        description: '',
        parent_id: ''
    });

    const [selectedParent, setSelectedParent] = useState([{
        id: '',
        name: '',
        parent_id: ''
    }]);

    useEffect(() => {
        api.get(`/categories/${props.match.params.id}`)
            .then(response => {
                setFormData(response.data);
            });
    }, []);

    useEffect(() => {
        api.get('/categories').then(response => {
            setSelectedParent(response.data);
        });
    }, []);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setFormData({...formData, [name]:value});
    }
    
    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <h1>Cadastro de categorias</h1>
                            </div>
                            <div className="card-body">
                                <form  className="formCategories" id="formCategories">
                                    <input type="hidden" name="id" id="id" value={formData.id}/>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="name">Nome</label>
                                            <input type="text" name="name" id="name" onChange={handleInputChange} value={formData.name}  className="name"/>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="description">Description</label>
                                            <input type="textarea" name="description" id="description" onChange={handleInputChange} value={formData.description}  className="description"/>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="parent_id">Sub-categoria</label>
                                            <select name="parent_id" className="parent_id" id="parent_id">
                                                <option>Selecione uma opção</option>
                                                {
                                                    selectedParent.map(category => {
                                                        let selected = formData.parent_id === category.id ? 'selected' : '';
                                                        return (
                                                            <option value={category.id} {...selected}>
                                                                {category.name}
                                                            </option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-12">
                                            
                                        </div>
                                        <div className="col-md-12">
                                            <button type="submit" className="btnSave" name="btnSave" id="btnSave">Cadastrar</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default EditCategories;