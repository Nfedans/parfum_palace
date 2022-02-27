import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"

import CarTable from "./CarTable"

import Logout from "./Logout"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"

//import Banner from 'react-js-banner'
import Banner from "./Banner"





export default class DisplayProducts extends Component
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
                        console.log("Records read")
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

        

        return (
            <div>
                <Banner 
                    title="This is an example banner with CSS" 
                    css={this.state.topBanner} 
                    visibleTime={3000}
                />



            </div>
        )
    }
}