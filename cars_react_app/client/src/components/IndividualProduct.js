import React, { Component } from 'react';
import {Link} from "react-router-dom";

import axios from "axios"

import {ACCESS_LEVEL_GUEST, ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"

export default class IndividualProduct extends Component 
{
    constructor(props)
    {
        super(props);
    }
 
// Check that photos => images change was successful later on

componentDidMount()
    {


        console.log(this.props.product)
        //console.log(this.props.product.images[0])

        this.props.product.images.map(image =>
 
        {
       
            return axios.get(`${SERVER_HOST}/products/image/${image.filename}`)
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
                        //this.setState({products: res.data})
                        document.getElementById(image._id).src = `data:;base64,${res.data.image}`

                    }
                }
                else
                {
                    console.log("Record not found")
                }
            })

    })




}

// Decide whether to map out all images in group view and allow scrolling, or just have one image, and allow scrolling when going into the single product view 

/*
                    <div>
                        {this.props.product.photos.map(photo => <img key={photo._id} id={photo._id} alt=""/>)}
                    </div>



                      <div>
                            {this.props.product.images[0]}
                        </div>


                        <div>{this.props.product.brand}</div>
                        <div>{this.props.product.name}</div>
                        <div>
                                {this.props.product.map(size => <div key={size} id={size}>{size}</div>)}
                        </div>


*/
    render() 
    {

       console.log(this.props.product.brand)

        return (
                <div>
                      <div>{this.props.product.brand}</div>
                        <div>{this.props.product.name}</div>
                       
                        <div>
                        {this.props.product.images.map(image => <img key={image._id} id={image._id} alt=""/>)}
                    </div>
                       
                </div>
               );
    }
}