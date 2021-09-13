import React, { Component } from 'react'
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

export default class Detalle extends Component {
    render() {
        const {Poster} = this.props.data
        return (
                <div className="container text-center"  >
                        <div className="card text-white mb-3 tarjeta-peliculas">
                            <div>
                            <img src={Poster} className="tarjeta-peliculas" alt="..." width="100%" height="300px"/>
                            </div>
                        </div>
                </div>
            )
    }
}
