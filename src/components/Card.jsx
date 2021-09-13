import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import Detalle from './Detalle'

export default class Card extends Component {
    render() {
        const { Poster, Rating} = this.props.data
        if(Rating){
            return (
                <div className="container text-center"  >
                    <div className="card text-white mb-3 tarjeta-peliculas">
                        <div>
                            <Link
                                to="/detalle"
                            >
                                <img src={Poster} className="tarjeta-peliculas" alt="..." width="100%" height="300px" />
                            </Link>
                        </div>
                        <div className="calificacion">
                            <img src="https://res.cloudinary.com/academia-geek/image/upload/v1631476593/Block-master/estrellita_wei1zw.png" alt="" /> {Rating}
                        </div>
                    </div>
                    {/* <Detalle data={this.props.data}/> */}
                </div>
            )
    
        }else{
            return (
                <div className="container text-center"  >
                    <div className="card text-white mb-3 tarjeta-peliculas">
                        <div>
                            <Link
                                to="/detalle"
                            >
                                <img src={Poster} className="tarjeta-peliculas" alt="..." width="100%" height="300px" />
                            </Link>
                        </div>
                    </div>
                </div>
            )
        }
    }
}
