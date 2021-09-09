import React, { Component } from 'react'
import 'bootswatch/dist/solar/bootstrap.min.css'
// import 'bootswatch/dist/solar/bootstrap/.'

import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";

import ListContainer from '../containers/ListContainer';
import Detalle from '../components/Detalle';
import Registro from '../components/Registro';
import Login from '../components/Login';
import CrudPeliculas from '../components/crud/components/CrudPelis';

export default class AppRouters extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/registro" component={Registro} />
                    <Route exact path="/" component={Login} />
                    <Route exact path="/todas" component={ListContainer} />
                    <Route exact path="/detalle" component={Detalle} />
                    <Route exact path="/crud" component={CrudPeliculas} />
                </Switch>

            </BrowserRouter>
        )
    }
}
