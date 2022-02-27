import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"

import "bootstrap/dist/css/bootstrap.css"
import "./css/App.css"
import "./css/login_registration.css"



import Banner from "./components/Banner"
import HomeTest from "./components/HomeTest"
import ResultManipulator from "./components/ResultManipulator"
import HeadParagraph from "./components/HeadParagraph"
import Redirector from "./components/Redirector"
import AddPerfumeReal from "./components/AddPerfumeReal"

import {ACCESS_LEVEL_GUEST} from "./config/global_constants"



if (typeof localStorage.accessLevel === "undefined")
{
    localStorage.name = "GUEST"
    localStorage.accessLevel = ACCESS_LEVEL_GUEST
    localStorage.token = null
    localStorage.profilePhoto = null
}

export default class App extends Component
{
    render()
    {
        return (
            <BrowserRouter>
                <Switch>
                    <Route exact path="/Banner" component={Banner} />
                    <Route exact path="/" component={Redirector} />
                    <Route exact path="/Products" component={HomeTest} />
                    <Route exact path="/AddProducts" component={AddPerfumeReal} />
                    <Route exact path="/ResultManipulator" component={ResultManipulator} />
                    <Route exact path="/HeadParagraph" component={HeadParagraph} />
                </Switch>
            </BrowserRouter>
        )
    }
}