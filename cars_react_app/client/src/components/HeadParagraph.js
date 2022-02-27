import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"
import { ACCESS_LEVEL_ADMIN } from "../config/global_constants";

import "../css/App.css"




export default class HeadParagraph extends Component
{

    constructor(props)
    {
        super(props);
    }
    

    render()
    {

        let boldMsg = "Fragrance For Him"
        let underText = "Explore our vast and effervescent collection of Parfum Pour Homme"


        if(localStorage.accessLevel == ACCESS_LEVEL_ADMIN)
        {
            boldMsg = "ADMINISTRATOR ACCESS"
            underText = ""
        }
        else if(this.props.msg === "Women")
        {
            boldMsg = "Fragrance For Her"
            underText = "Explore our vast and effervescent collection of Parfum Pour Femme"
        }
        else if(this.props.msg === "Men")
        {
            boldMsg = "Fragrance For Him"
            underText = "Explore our vast and effervescent collection of Parfum Pour Homme"
        }
        else if(this.props.msg === "Unisex")
        {
            boldMsg = "Fragrance For All"
            underText = "Explore our vast and effervescent collection of Parfum"
        }
        else if(this.props.msg === "Catalogue")
        {
            boldMsg = "Our Catalogue"
            underText = "All of our beautiful scents, gathered in one place"
        }
        else if(this.props.msg === "Home")
        {
            boldMsg = "Parfum Palace"
            underText = "The Purveyors of Good Smell"
        }






        return (
            <div className="HeadParagraph">
                <div className="text_holder">
                <div className="bold_para">{boldMsg}</div>
                <div className="text_para">{underText}</div>
                </div>
            </div>
        )
    }
}