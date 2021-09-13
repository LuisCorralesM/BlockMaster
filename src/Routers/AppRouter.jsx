import React, { Component } from 'react'
import 'bootswatch/dist/solar/bootstrap.min.css'

import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";

import ListContainer from '../containers/ListContainer';
import Registro from '../components/Registro';
import Login from '../components/Login';
import CrudPeliculas from '../components/crud/components/CrudPelis';
import Mas from '../components/Mas';
import Menos from '../components/Menos';

export default class AppRouters extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/registro" component={Registro} />
                    <Route exact path="/" component={Login} />
                    <Route exact path="/todas" component={ListContainer} />
                    <Route exact path="/crud" component={CrudPeliculas} />
                    <Route exact path="/mas" component={Mas} />
                    <Route exact path="/menos" component={Menos} />
                </Switch>

            </BrowserRouter>
        )
    }
}
