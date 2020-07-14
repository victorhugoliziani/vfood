import React, {useState, ChangeEvent, FormEvent, useEffect} from 'react';
import axios from 'axios';
import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';
import api from '../../services/api';

import './styles.css';

const CreateCategories = () => {

    const [selectedFile, setSelectedFile] = useState<File>();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        parent_id: ''
    });
    const [selectedParent, setSelectedParent] = useState({
        parent_id: ''
    });

    const [parents, setParents] = useState([{
        id: '',
        name: ''
    }])

    useEffect(() => {
        api.get('/categories').then(response => {
            setParents(response.data);
        });
    }, []);

    function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
        const {name, value} = event.target;
        setFormData({...formData, [name]:value});
    }

    function handleSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const {name, value} = event.target;
        setSelectedParent({...selectedParent, [name]:value});
    }

    function handleSubmit(event: FormEvent) {
        event.preventDefault();
        const {name, description} = formData;
        const {parent_id} = selectedParent;

        const data =new FormData();
        data.append(`name`, name);
        data.append(`description`, description);
        data.append(`parent_id`, parent_id);

        if(selectedFile) {
            data.append(`image`, selectedFile);
        }

        api.post('categories', data);
        alert("Categoria criada com sucesso");
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
                                <form onSubmit={handleSubmit} className="formCategories" id="formCategories">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <label htmlFor="name">Nome</label>
                                            <input type="text" name="name" id="name" onChange={handleInputChange} className="name"/>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="description">Description</label>
                                            <input type="textarea" name="description" id="description" onChange={handleInputChange} className="description"/>
                                        </div>
                                        <div className="col-md-12">
                                            <label htmlFor="parent_id">Sub-categoria</label>
                                            <select name="parent_id" className="parent_id" id="parent_id" onChange={handleSelectChange}>
                                                <option>Selecione uma opção</option>
                                                {
                                                    parents.map(parent => {
                                                        return (
                                                            <option value={parent.id}>{parent.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                        <div className="col-md-12">
                                            <Dropzone onFileUploaded={setSelectedFile} />
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

export default CreateCategories;