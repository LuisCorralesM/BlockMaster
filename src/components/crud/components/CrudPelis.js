import axios from "axios";
import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {fileUpload} from '../helpers/fileUpload';

const url = "https://api-sprint-block-master.herokuapp.com/usuarios/"

export default class CrudPeliculas extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            modalInsertar: false,
            modalEliminar: false,
            form: {
                id: '',
                documento: '',
                nombres: '',
                apellidos: '',
                telefono: '',
                celular: '',
                direccion: '',
                imagen: ''
            },
            tipoModal: ''
        }
    }

    componentDidMount(){
        this.peticionGet();
    }

    modalInsertar = () => {
        this.setState({modalInsertar: !this.state.modalInsertar})
    }

    handlePictureClick = () => {
        document.querySelector('#fileSelector').click();
    }

    handleFileChange = (e) => {
        const file = e.target.files[0];
        fileUpload(file)
        .then(response => {
            document.getElementById('image').value = response;
        }).catch(error => {
            console.log(error.message)
        })
    }

    handleChange = async (e) => {
        e.persist();
        await this.setState({
            form:{
                ...this.state.form,
                [e.target.name]: e.target.value
            }
        })
        console.log(this.state.form)
    }

    SeleccionarEstudiante = (estudiante) => {

         this.setState({
             tipoModal: 'actualizar',
             form: {
                id: estudiante.id,
                documento: estudiante.documento,
                nombres: estudiante.nombres,
                apellidos: estudiante.apellidos,
                telefono: estudiante.telefono,
                celular: estudiante.celular,
                direccion: estudiante.direccion,
                imagen: estudiante.imagen
             }
         })
         console.log(estudiante)
    }

    peticionGet= async()=>{
        await axios.get(url)
        .then(response => {
            this.setState({data: response.data})
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    peticionesPost = async () => {
        delete this.state.form.id;
        await axios.post(url,this.state.form)
        .then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
             console.log(error.message);
        })
    }
   
    peticionPut = async () => {
        await axios.put(url+this.state.form.id,this.state.form)
        .then(response => {
            this.modalInsertar();
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    peticionDelete = async () => {
        await axios.delete(url+this.state.form.id)
        .then(response => {
            this.setState({modalEliminar:false});
            this.peticionGet();
        }).catch(error => {
            console.log(error.message);
        })
    }

    render() {
        const {form} = this.state;
        return (
            <div className="container">
                <br />
                <button className="btn btn-dark"
                onClick={() => {this.setState({form: null, tipoModal: 'insertar'});this.modalInsertar()}}
                >Módulo CrudPeliculas</button>
                <br /> <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Documento</th>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Teléfono</th>
                            <th>Celular</th>
                            <th>Dirección</th>
                            <th>Imagen</th>
                            <th>Operaciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(est => {
                                return(
                                    <tr key={est.id}>
                                        <td>{est.id}</td>
                                        <td>{est.documento}</td>
                                        <td>{est.nombres}</td>
                                        <td>{est.apellidos}</td>
                                        <td>{est.telefono}</td>
                                        <td>{est.celular}</td>
                                        <td>{est.direccion}</td>
                                        <td><img src={est.imagen} width="50px" height="70px" alt=""/></td>
                                        <button className="btn btn-primary"
                                         onClick={() => {this.SeleccionarEstudiante(est); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                         <button className="btn btn-danger"
                                         onClick={() => {this.SeleccionarEstudiante(est); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                    </tr>
                                )
                            })
                        }
                      
                    </tbody>
                </table>

                <Modal isOpen={this.state.modalInsertar}>
                    <h1>Crear Estudiante</h1>
                    <ModalHeader style={{display: 'block'}}>
                        <span style={{float: 'right'}}>x</span>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="id">id</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id:''}/>
                            <br/>
                            <label htmlFor="documento">Documento</label>
                            <input className="form-control" type="text" name="documento" id="documento" onChange={this.handleChange} value={form?form.documento:''}/>
                            <br/>
                            <label htmlFor="nombres">Nombres</label>
                            <input className="form-control" type="text" name="nombres" id="nombres" onChange={this.handleChange} value={form?form.nombres:''}/>
                            <br/>
                            <label htmlFor="apellidos">Apellidos</label>
                            <input className="form-control" type="text" name="apellidos" id="apellidos" onChange={this.handleChange} value={form?form.apellidos:''}/>
                            <br/>
                            <label htmlFor="telefono">Teléfono</label>
                            <input className="form-control" type="text" name="telefono" id="telefono" onChange={this.handleChange} value={form?form.telefono:''}/>
                            <br/>
                            <label htmlFor="celular">Celular</label>
                            <input className="form-control" type="text" name="celular" id="celular" onChange={this.handleChange} value={form?form.celular:''}/>
                            <br/>
                            <label htmlFor="direccion">Dirección</label>
                            <input className="form-control" type="text" name="direccion" id="direccion" onChange={this.handleChange} value={form?form.direccion:''}/>
                            <br/>
                            <input 
                            id="fileSelector"
                            type="file"
                            name="file"
                            style={{display: 'none'}}
                            onChange={this.handleFileChange}
                            />

                            <button className="btn btn-success"
                            onClick={() => this.handlePictureClick()}
                            >Imagen</button>

                            <input 
                            type="text"
                            name="imagen"
                            id="image"
                            value={form?form.imagen:''}
                            onBlur={this.handleChange}
                            />

                        </div>

                    </ModalBody>
                    <ModalFooter>
                       {this.state.tipoModal==='insertar'}
                        <button className="btn btn-success"
                        onClick={() => this.peticionesPost()}>
                            Insertar
                        </button>
                        <button className="btn btn-primary"
                        onClick={() => this.peticionPut()}>
                            Actualizar
                        </button>
                        <button className="btn btn-danger"
                         onClick={() => this.modalInsertar()}
                           >
                            Cancelar
                        </button>
                    </ModalFooter>
                </Modal>

                <Modal isOpen={this.state.modalEliminar}>
                    <ModalBody>
                        Está seguro de eliminar el estudiante {form && form.nombres}
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-danger"
                       onClick={() => this.peticionDelete()}>Sí</button>
                        <button className="btn btn-secundary"
                       onClick={() => this.setState({modalEliminar:false})}>No</button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}
