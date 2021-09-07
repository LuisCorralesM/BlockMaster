import React, { Component } from 'react'
import Card from '../components/Card'
import { Navbar } from '../components/Navbar'

const url = 'https://www.omdbapi.com/?i=tt3896198&apikey=3c86e97'


export default class ListContainer extends Component {
    constructor() {
        super()
        this.state = {
            peli: [],
            searchTerm: 'deadpool',
            error: ''
        }
    }

    async componentDidMount() {
        const res = await fetch(`${url}&s=${this.state.searchTerm}`)
        const { Search } = await res.json()
        this.setState({ peli: Search })
        console.log('Las pelis que dejamos por defecto');
        console.log(this.state.peli)
    }

    render() {
        const handleSubmit = async (e) => {
            e.preventDefault()
            const res = await fetch(`${url}&s=${this.state.searchTerm}`)
            const { Search } = await res.json()
            this.setState({ peli: Search })
            console.log('Lo que metemos en el buscador');
            console.log(this.state.peli)
        }

        const formu = (
            <form className="d-flex">

            <input className="contenedor-icono-buscar"
                type="text"
                name="searchTerm"
                className="form-control"
                placeholder="Busca tu película favorita"
                onChange={(e) => this.setState({ searchTerm: e.target.value })}
                value={this.state.searchTerm}

            >
            </input>
            <img src="https://res.cloudinary.com/academia-geek/image/upload/v1630970228/Block-master/lupa_nxhcbr.png" alt="" onClick={handleSubmit} />
        </form>

        )

        return (
            <div className="contenedor-nav-bar">

            <Navbar form = {formu}/>
            
                <div className="container row row-cols-1 row-cols-md-4 g-4 py-5 text-center ms-5">
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
    }
}
