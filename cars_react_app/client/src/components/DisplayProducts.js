import React, {Component} from "react"
import {Link} from "react-router-dom"

import axios from "axios"



import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"
import IndividualProduct from "./IndividualProduct"





export default class DisplayProducts extends Component
{
    constructor(props)
    {
        super(props)

        
    }





    /* Cross check later with cars example */

    render()
    {

        console.log(this.props.products)

        return (
            <div className="big_div">
            {this.props.products.map((product) => 
            <IndividualProduct key={product._id} product={product}/>)}
            </div>
        )
    }
}