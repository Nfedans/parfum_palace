import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"

import LinkInClass from "../components/LinkInClass"
import {ACCESS_LEVEL_ADMIN} from "../config/global_constants"

import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"


//import {ACCESS_LEVEL_GUEST} from "../config/global_constants"


export default class Redirector extends Component
{
    
    constructor(props)
    {
        super(props)

        this.state = {
            products:[]
        }
    }

    componentDidMount()
    {
        axios.get(`${SERVER_HOST}/products`)
            .then(res =>
            {
                if(res.data)
                {
                    if (res.data.errorMessage)
                    {
                        console.log(res.data.errorMessage)
                    }
                    else
                    {
                        console.log("Records read in ")
                        this.setState({products: res.data})
                    }
                }
                else
                {
                    console.log("Record not found")
                }
            })

    }


    render()
    {

        //{localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Redirect to="/Products"/> : <Redirect to="/Home"/>}

        // <Redirect to="/HomeTest"/>

        return (
            <div>
               <Redirect to="/Products"/>
            </div>
        )
    }
}