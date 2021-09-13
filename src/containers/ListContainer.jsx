import React, { Component } from 'react'
import Card from '../components/Card'
import { Navbar } from '../components/Navbar'

const url = 'https://www.omdbapi.com/?i=tt3896198&apikey=3c86e97'
const url2 = 'https://api-sprint-block-master.herokuapp.com'


export default class ListContainer extends Component {
    constructor() {
        super()
        this.state = {
            peli: {},
            nuevaPeli: [],
            searchTerm: '',
            error: '',
            scroll: false
        }
    }


    async componentDidMount() {
        const res = await fetch(`${url2}/peliculas${1}`)
        const data = await res.json()
        this.setState({
            nuevaPeli: data
        })
    }

    render() {
        // Scroll infinito ---------------------------------------------------------------------------------
        let contador = 1

        // pintar mas data
        const scrollInfinito = async () => {
            contador++
            if (contador <= 5) {
                // alert(contador);
                const res = await fetch(`${url2}/peliculas${contador}/`)
                const data = await res.json()

                let acu = this.state.nuevaPeli
                for (let i = 0; i < data.length; i++) {
                    acu.push(data[i])
                }

                console.log(acu);

                this.setState({
                    scroll: true
                })
                this.setState({
                    nuevaPeli: acu
                })

            }
        }
        
        window.addEventListener('scroll', (e) => {
            e.preventDefault()
            e.stopPropagation()

            const { scrollTop, clientHeight, scrollHeight } = document.documentElement

                // console.log(scrollTop, clientHeight, scrollHeight);

            if ((scrollTop + clientHeight) === scrollHeight) {
                
                 scrollInfinito()
            }
        })

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

        } if (this.state.scroll) {
            return (
                <div className="contenedor m-0 p-0" width="100%">

                    <Navbar form={formu} />

                    <div className="container row row-cols-1 row-cols-md-5 offset-md-1 mt-2 g-4">
                        {
                            this.state.nuevaPeli.map((movie, index) => {
                                return (
                                        <Card className="Cards"
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
            return (
                <div className="contenedor m-0 p-0" width="100%">

                    <Navbar form={formu} />

                    <div className="container row row-cols-1 row-cols-md-5 offset-md-1 mt-2 g-4">
                        {
                            this.state.nuevaPeli.map((movie, index) => {
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
