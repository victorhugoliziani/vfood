import React from 'react';
import Header from '../../components/Header';
import Dropzone from '../../components/Dropzone';

import './styles.css';

const CreateCategories = () => {
    return (
        <>
            <Header />
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                Cadastro de categorias
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-12">
                                        <label htmlFor="name">Nome</label>
                                        <input type="text" name="name" id="name" className="name"/>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="description">Description</label>
                                        <input type="textarea" name="description" id="description" className="description"/>
                                    </div>
                                    <div className="col-md-12">
                                        <label htmlFor="parent_id">Sub-categoria</label>
                                        <select name="parent_id" className="parent_id" id="parent_id">
                                            <option>Selecione uma opção</option>
                                        </select>
                                    </div>
                                    <div className="col-md-12">
                                        <Dropzone />
                                    </div>
                                    <div className="col-md-12">
                                        <button type="button" className="btnSave" name="btnSave" id="btnSave">Salvar</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateCategories;