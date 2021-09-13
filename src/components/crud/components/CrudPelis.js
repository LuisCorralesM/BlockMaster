import axios from "axios";
import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import {fileUpload} from '../helpers/fileUpload';
import { Link } from 'react-router-dom';


const url = "https://api-sprint-block-master.herokuapp.com/peliculas-nuevas/"

export default class CrudPeliculas extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: [],
            modalInsertar: false,
            modalEliminar: false,
            form: {
                id: '',
                pelicula: '',
                calificacion: '',
                genero: '',
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

    seleccionarPelicula = (peliculas) => {

         this.setState({
             tipoModal: 'actualizar',
             form: {
                id: peliculas.id,
                pelicula: peliculas.pelicula,
                calificacion: peliculas.calificacion,
                genero: peliculas.genero,
                imagen: peliculas.imagen
             }

         })
        console.log(peliculas);
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
                <div>
                    <button className="btn btn-dark"
                    onClick={() => {this.setState({form: null, tipoModal: 'insertar'});this.modalInsertar()}}
                    >
                        Subir película
                    </button>
                    <button className="btn btn-secondary"><Link to="/todas" className="text-light">Home</Link></button>
                </div>
                <br /> <br />
                <table className="table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Película</th>
                            <th>Calificacion</th>
                            <th>Género</th>
                            <th>Imagen</th>
                            <th>Editar</th>
                            <th>Borrar</th>

                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.data.map(est => {
                                return(

                                    <tr key={est.id}>
                                        <td>{est.id}</td>
                                        <td>{est.pelicula}</td>
                                        <td>{est.calificacion}</td>
                                        <td>{est.genero}</td>
                                        <td><img src={est.imagen} width="50px" height="70px" alt=""/></td>
                                        <td>
                                            <button className="btn btn-primary"
                                            onClick={() => {this.seleccionarPelicula(est); this.modalInsertar()}}><FontAwesomeIcon icon={faEdit}/></button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                            onClick={() => {this.seleccionarPelicula(est); this.setState({modalEliminar: true})}}><FontAwesomeIcon icon={faTrashAlt}/></button>
                                        </td>
                                    </tr>
                                    
                                )
                            })
                        }
                      
                    </tbody>
                </table>

                <Modal isOpen={this.state.modalInsertar}>
                    <h1>Subir Película</h1>
                    <ModalHeader style={{display: 'block'}}>
                        <button onClick={() => this.modalInsertar()} style={{float: 'right'}} className="bg-danger">X</button>
                    </ModalHeader>
                    <ModalBody>
                        <div className="form-group">

                            <label htmlFor="id">id</label>
                            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={form?form.id:''}/>
                            <br/>
                            <label htmlFor="pelicula">Película</label>
                            <input className="form-control" type="text" name="pelicula" id="pelicula" onChange={this.handleChange} value={form?form.pelicula:''}/>
                            <br/>
                            <label htmlFor="calificacion">Calificacion</label>
                            <input className="form-control" type="text" name="calificacion" id="calificacion" onChange={this.handleChange} value={form?form.calificacion:''}/>
                            <br/>
                            <label htmlFor="genero">Genero</label>
                            <input className="form-control" type="text" name="genero" id="genero" onChange={this.handleChange} value={form?form.genero:''}/>
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
                        Está seguro de eliminar el estudiante {form && form.pelicula}
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
