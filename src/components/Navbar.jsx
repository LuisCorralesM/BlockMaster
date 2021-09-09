import React from 'react'
import { Link } from 'react-router-dom'


export const Navbar = (props) => {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" id="NavBar">                        <div className="container-fluid">
                <Link className="navbar-brand" to="/"><img src="https://res.cloudinary.com/academia-geek/image/upload/v1630969083/Block-master/logo-blockBuster_mhppij.png  " alt="" /></Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="/navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/todas">
                                Todas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Mas">
                                Más valoradas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/Menos">
                                Menos valoradas
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/crud">
                                CRUD
                            </Link>
                        </li>
                    </ul>
                </div>
                <div>{props.form}</div>
            </div>
            </nav>
        </div>

    )
}
