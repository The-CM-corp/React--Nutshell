import { Route, Redirect } from 'react-router-dom'
import React, { Component } from "react"
import Navbar from "./nav/Navbar"
import ApplicationViews from "./ApplicationViews"
import Login from './authentication/Login'

// import "./Nutshell.css"
import "bootstrap/dist/css/bootstrap.min.css"


export default class Nutshell extends Component {

    isAuthenticated = () => (sessionStorage.getItem("credentials") !== null || localStorage.getItem("credentials") !== null)

    render() {
        return (
            // <React.Fragment>
            //     <Route exact path="/messages" render={(props) => {
            //         if (this.isAuthenticated()) {

            //             return (
                            <React.Fragment>
                      
                                <Navbar />
                                <ApplicationViews />
                            </React.Fragment>
            //             )

            //         } else {
            //             return <Redirect to="/login" />
            //         }
            //     }} />
            //     <Route path="/login" component={Login} />
            // </React.Fragment>
        )
    }
}
