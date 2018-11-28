import React, { Component } from "react"
import Navbar from "./nav/Navbar"
import ApplicationViews from "./ApplicationViews"

// import "./Nutshell.css"
import "bootstrap/dist/css/bootstrap.min.css"


class Nutshell extends Component {

    render() {
        return (
            <React.Fragment>
                <Navbar />
                <ApplicationViews />
            </React.Fragment>
        )
    }
}

export default Nutshell