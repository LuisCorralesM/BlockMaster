import React, { Component } from 'react'
import { Navbar } from './Navbar'
import Card from './Card'

const url = 'https://www.omdbapi.com/?i=tt3896198&apikey=3c86e97'
const url2 = 'https://api-sprint-block-master.herokuapp.com'


export default class Mas extends Component {
    constructor() {
        super()
        this.state = {
            nuevaPeli: [],
            searchTerm: '',
            error: '',
        }
    }

    async componentDidMount() {
        const res = await fetch(`${url2}/todas`)
        const data = await res.json()
        this.setState({
            nuevaPeli: data
        })
    }


    render() {
        // Cuando hay una busqueda ------------------------------------------------------------------
        const handleSubmit = async (e) => {
            e.preventDefault()
            if (this.state.searchTerm) {
                const res = await fetch(`${url}&s=${this.state.searchTerm}`)
                const { Search } = await res.json()

                if (!Search) {
                    alert('ingresa un dato valido')
                    document.querySelector('#buscar').value = ''
                    this.state.searchTerm = ''

                    const res = await fetch(`${url2}/peliculas${1}`)
                    const data = await res.json()
                    this.setState({ peli: data })

                    return this.setState({ error: 'no se encontró' })
                }

                this.setState({ peli: Search })
            }

        }

        const dispararBusqueda = (e) => {
            e.preventDefault()
            const inputBuscar = document.querySelector('#buscar').value
            this.state.searchTerm = inputBuscar
            handleSubmit(e)
        }

        const formu = (
            <form className="d-flex">

                <input className="contenedor-icono-buscar"
                    type="text"
                    name="searchTerm"
                    className="form-control"
                    placeholder="Busca tu película favorita"
                    id="buscar"
                >
                </input>
                <img src="https://res.cloudinary.com/academia-geek/image/upload/v1630970228/Block-master/lupa_nxhcbr.png" alt="" onClick={dispararBusqueda} />
            </form>

        )

        const masValoradas = []


    if (this.state.searchTerm !== '') {

            return (
                <div className="contenedor m-0 p-0" width="100%">

                    <Navbar form={formu} />

                    <div className="container row row-cols-1 row-cols-md-5 offset-md-1 mt-2 g-4">
                        {
                            this.state.peli.map((movie, index) => {
                                return (
                                    <Card
                                        key={index}
                                        data={movie}
                                    />
                                )
                            })
                        }

                    </div>
                </div>

            )

        } else {

            this.state.nuevaPeli.map((movie) => {
                if (movie.Rating >= 6) {
                    masValoradas.push(movie)
                }
            })    

            return (
                <div className="contenedor m-0 p-0" width="100%">

                    <Navbar form={formu} />

                    <div className="container row row-cols-1 row-cols-md-5 offset-md-1 mt-2 g-4">
                        {
                            masValoradas.map((movie, index) => {
                                return (
                                    <Card className="Cards-pelis"
                                        key={index}
                                        data={movie}
                                    />
                                )
                            })
                        }

                    </div>
                </div>

            )

        }

    }
}


