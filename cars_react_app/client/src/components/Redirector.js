import React, {Component} from "react"
import {Redirect, Link} from "react-router-dom"

import LinkInClass from "../components/LinkInClass"
import {ACCESS_LEVEL_ADMIN} from "../config/global_constants"

import axios from "axios"
import {SERVER_HOST} from "../config/global_constants"


//import {ACCESS_LEVEL_GUEST} from "../config/global_constants"


export default class Redirector extends Component
{
    mounted = false;
    mountStatus = false;
    
    constructor(props)
    {
        super(props)

        this.state = {
            products:[]
        }
    }

    forceCompMount()
    {
        this.componentDidMount()
        this.componentWillUnmount()
    }

    componentDidMount()
    {
        this.mounted = true;

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
                    if(this.mounted){
                        //console.log("Records read in ")
                        this.mountStatus = true;
                        console.log(res.data)
                        this.setState({products: res.data})
                        
                        
                    }
                    }
                }
                else
                {
                    console.log("Record not found")
                    console.log("Record not found")
                }
            })

    }

    componentWillUnmount() {
        this.mounted = false;
      }


    render()
    {

        //{localStorage.accessLevel >= ACCESS_LEVEL_ADMIN ? <Redirect to="/Products"/> : <Redirect to="/Home"/>}

        // <Redirect to="/HomeTest"/>

        /*
            <Redirect to={{
                pathname: "/Products",
                state: { products: this.state.products }
                }}/>
        */


            console.log(this.state.products)

        return (
            <div>
               
               {this.mountStatus 
               
               ? <Redirect to={{
                pathname: "/Products",
                state: { products: this.state.products }
                }}/>
               
               
               : null}

            </div>
        )
    }
}