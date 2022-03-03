import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Form from "react-bootstrap/Form"

import axios from "axios";

import LinkInClass from "../components/LinkInClass";

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"



export default class AddPerfumeReal extends Component
{
    constructor(props)
    {
        super(props)

        this.state = {
            brand:"",
            name:"",
            description:"",
            gender:"",
            selectedFiles: null,
            products: [{
                size : "",
                price : "",
                stockLevel : ""
                }],
            notes: {
                topNotes : ["pepper", "yuzu", "nutmeg"],
                heartNotes : ["amber", "geranium"],
                stockLevel : ["Oud"]
                },
            redirectToredirectToProducts: false,
        
        }
    }



    componentDidMount()
    {
        this.inputToFocus.focus()
    }


    handleChange = (e) =>
    {
        this.setState({[e.target.name]: e.target.value})


        

    }

    handleFileChange = (e) =>
    {
        this.setState({selectedFiles: e.target.files})
    } 



        handleProductChangeMult = id => e => {
            const newProducts = this.state.products.map((product, sid) => {
              if (id !== sid) return product;

              if(e.target.name === "size")
              {
                    return { ...product, size: e.target.value };
              }
              else if(e.target.name === "price")
              {
                    return { ...product, price: e.target.value };
              }
              else
              {
                    return { ...product, stockLevel: e.target.value };
              }

            });
        
            this.setState({products: newProducts});
            console.log(newProducts)
          }

          handleAddProduct = () => {
            this.setState({
              products: this.state.products.concat([{
                size : "",
                price : "",
                stockLevel : ""
                }])
            });
          };
        
          handleRemoveProduct = id => () => {
            this.setState({
                products: this.state.products.filter((s, sid) => id !== sid)
            });
          };





    handleSubmit = (e) =>
    {
        e.preventDefault()


        let formData = new FormData()


        formData.append("brand", this.state.brand)
        formData.append("name", this.state.name)
        formData.append("description", this.state.description)
        formData.append("gender", this.state.gender)
    
       
         

        if(this.state.selectedFiles)
        {
            for(let i = 0; i < this.state.selectedFiles.length; i++)
            {
                formData.append("productsImages", this.state.selectedFiles[i])
            }
        }


                formData.append("products", [JSON.stringify(this.state.products)])


        const valuez = [...formData.entries()]
  
        console.log(valuez)
        

        axios.post(`${SERVER_HOST}/products`, formData, {headers:{"Content-type": "multipart/form-data"}})
            .then(res =>
            {

                console.log("111111111111111")

                if(res.data)
                {

                    

                    if (res.data.errorMessage)
                    {

                        console.log("IN HERE")
                        console.log(res.data.errorMessage)
                    }
                    else
                    {
                        console.log("Record added")
                        this.setState({redirectToProducts:true})
                    }
                }
                else
                {
                    console.log("Record not added")
                }
            }).catch(error => {
                console.log("Error caught in catch block")
                console.log(error)
                }
              )



    }
    render()
    {
        return (
            <div className="form-container">
                {this.state.redirectToProducts ? <Redirect to="/"/> : null}

                <Form>
                    <Form.Group controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control type="text" name="brand" value={this.state.brand} onChange={this.handleChange} />
                    </Form.Group>

                   <Form.Group controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control ref = {(input) => { this.inputToFocus = input }} type="text" name="name" value={this.state.name} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="gender">
                        <Form.Label>Gender</Form.Label>
                        <Form.Control type="text" name="gender" value={this.state.gender} onChange={this.handleChange} />
                    </Form.Group>

                    <Form.Group controlId="productsPhotos">
                        <Form.Label>Product Photos</Form.Label>
                        <Form.Control
                            type = "file" multiple onChange = {this.handleFileChange}
                        /></Form.Group> 
            

                    

                    
                    {this.state.products.map((product, id) => (
          <div className="product"  key={"Obj_" + id}>

                        <Form.Group>
                        <Form.Label>Size {id}</Form.Label>
                        <Form.Control type="text" name="size" value={product.size} onChange={this.handleProductChangeMult(id)} />
                
                        <Form.Label>Price {id}</Form.Label>
                        <Form.Control type="text" name="price" value={product.price} onChange={this.handleProductChangeMult(id)} />
                       
                        <Form.Label>Stock Available {id}</Form.Label>
                        <Form.Control type="text" name="stockLevel" value={product.stockLevel} onChange={this.handleProductChangeMult(id)} />
                        </Form.Group>

                        <button
                        type="button"
                        onClick={this.handleRemoveProduct(id)}
                        >Del </button>

            
          </div>
        ))}

                    <button
                    type="button"
                    onClick={this.handleAddProduct}
                    className="small"
                    >
                    Add Product
                    </button>


    <ul>
        {this.state.products.map((value, index) => <li key={index}>{value.size} {value.price} {value.stockLevel}</li>) }
    </ul>





                        <br/><br/>


                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>

                    
                </Form>
            </div>
        )

    }
}