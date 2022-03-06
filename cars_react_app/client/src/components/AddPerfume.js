import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Form from "react-bootstrap/Form"

import axios from "axios";

import LinkInClass from "./LinkInClass";

import {ACCESS_LEVEL_ADMIN, SERVER_HOST} from "../config/global_constants"



export default class AddPerfume extends Component
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
                topNotes : [""],
                heartNotes : [""],
                baseNotes : [""]
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



        handleNoteChange = (id, noteType) => e => {

            let newNotes = null;

            if (noteType == "top")
                {
                    newNotes = this.state.notes.topNotes.map((note, sid) => {
                        if (id !== sid) return note;
                        return {note : e.target.value };
                    });
                }
            else if(noteType == "heart")
                {
                    newNotes = this.state.notes.heartNotes.map((note, sid) => {
                        if (id !== sid) return note;
                        return {note: e.target.value };
                    });
                }
            else  if(noteType == "base")
                {
                    newNotes = this.state.notes.baseNotes.map((note, sid) => {
                        if (id !== sid) return note;
                        return {note: e.target.value };
                    });
                }
                else
                {
                    alert("something went wrong")
                }
         
          

          if (noteType == "top")
          {  
                if(this.state.notes.topNotes[id] != "")
                    {

                        console.log("IF")
                        
                        let newArr = [];
                        let watcher1 = 0;
                        let watcher2 = id + 1;

                            while(watcher1 < id)
                            {
                                newArr.push(this.state.notes.topNotes[watcher1]);
                                ++watcher1;
                            }

                            

                            newArr.push(newNotes[id].note)

                            while(watcher2 <= this.state.notes.topNotes.length - 1)
                            {
                                newArr.push(this.state.notes.topNotes[watcher2]);
                                ++watcher2;
                            }

                            console.log("Our new ARR")
                            console.log(newArr)


                        this.setState( previousState => ({
                            ...previousState,
                            notes:{...previousState.notes, topNotes: newArr} 
                        }));
                    }
                    else if(this.state.notes.topNotes[this.state.notes.topNotes.length - 1] === "")
                    {
                        console.log("ELSE IF")

                        let oper = this.state.notes.topNotes.pop();
            

                    this.setState( previousState => ({
                        ...previousState,
                        notes:{...previousState.notes, topNotes: this.state.notes.topNotes.concat([newNotes[id].note])} 
                    }));
                    }
                    else
                    {
                        console.log("ELSE")

                        this.setState( previousState => ({
                            ...previousState,
                            notes:{...previousState.notes, topNotes: this.state.notes.topNotes.concat([newNotes[id].note])} 
                        }));
                    }
        }
        else if (noteType == "heart")
          {  
                if(this.state.notes.heartNotes[id] != "")
                    {

                        console.log("IF")
                        
                        let newArr = [];
                        let watcher1 = 0;
                        let watcher2 = id + 1;

                            while(watcher1 < id)
                            {
                                newArr.push(this.state.notes.heartNotes[watcher1]);
                                ++watcher1;
                            }

                            

                            newArr.push(newNotes[id].note)

                            while(watcher2 <= this.state.notes.heartNotes.length - 1)
                            {
                                newArr.push(this.state.notes.heartNotes[watcher2]);
                                ++watcher2;
                            }

                            console.log("Our new ARR")
                            console.log(newArr)


                        this.setState( previousState => ({
                            ...previousState,
                            notes:{...previousState.notes, heartNotes: newArr} 
                        }));
                    }
                    else if(this.state.notes.heartNotes[this.state.notes.heartNotes.length - 1] === "")
                    {
                        console.log("ELSE IF")

                        let oper = this.state.notes.heartNotes.pop();
            

                    this.setState( previousState => ({
                        ...previousState,
                        notes:{...previousState.notes, heartNotes: this.state.notes.heartNotes.concat([newNotes[id].note])} 
                    }));
                    }
                    else
                    {
                        console.log("ELSE")

                        this.setState( previousState => ({
                            ...previousState,
                            notes:{...previousState.notes, heartNotes: this.state.notes.heartNotes.concat([newNotes[id].note])} 
                        }));
                    }
        }
        else if(noteType == "base")
        {
            if(this.state.notes.baseNotes[id] != "")
            {

                console.log("IF")
                
                let newArr = [];
                let watcher1 = 0;
                let watcher2 = id + 1;

                    while(watcher1 < id)
                    {
                        newArr.push(this.state.notes.baseNotes[watcher1]);
                        ++watcher1;
                    }

                    

                    newArr.push(newNotes[id].note)

                    while(watcher2 <= this.state.notes.baseNotes.length - 1)
                    {
                        newArr.push(this.state.notes.baseNotes[watcher2]);
                        ++watcher2;
                    }

                    console.log("Our new ARR")
                    console.log(newArr)


                this.setState( previousState => ({
                    ...previousState,
                    notes:{...previousState.notes, baseNotes: newArr} 
                }));
            }
            else if(this.state.notes.baseNotes[this.state.notes.baseNotes.length - 1] === "")
            {
                console.log("ELSE IF")

                let oper = this.state.notes.baseNotes.pop();
    

            this.setState( previousState => ({
                ...previousState,
                notes:{...previousState.notes, baseNotes: this.state.notes.baseNotes.concat([newNotes[id].note])} 
            }));
            }
            else
            {
                console.log("ELSE")

                this.setState( previousState => ({
                    ...previousState,
                    notes:{...previousState.notes, baseNotes: this.state.notes.baseNotes.concat([newNotes[id].note])} 
                }));
            }
        }
        else
        {
            alert("Something went wrong")
        }
            

        }

        handleAddTopNote = () => {
            this.setState( previousState => ({
                ...previousState,
                notes:{...previousState.notes, topNotes: this.state.notes.topNotes.concat([""])} 
              }));
          };

        handleRemoveTopNote = id => () => {
            this.setState( previousState => ({
                ...previousState,
                notes:{...previousState.notes, topNotes: this.state.notes.topNotes.filter((s, sid) => id !== sid)}
            }));
          };

          handleAddHeartNote = () => {
            this.setState( previousState => ({
                ...previousState,
                notes:{...previousState.notes, heartNotes: this.state.notes.heartNotes.concat([""])} 
              }));
          };

        handleRemoveHeartNote = id => () => {
            this.setState( previousState => ({
                ...previousState,
                notes:{...previousState.notes, heartNotes: this.state.notes.heartNotes.filter((s, sid) => id !== sid)}
            }));
          };

          handleAddBaseNote = () => {
            this.setState( previousState => ({
                ...previousState,
                notes:{...previousState.notes, baseNotes: this.state.notes.baseNotes.concat([""])} 
              }));
          };

        handleRemoveBaseNote = id => () => {
            this.setState( previousState => ({
                ...previousState,
                notes:{...previousState.notes, baseNotes: this.state.notes.baseNotes.filter((s, sid) => id !== sid)}
            }));
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

                formData.append("notes", JSON.stringify(this.state.notes));


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

        console.log(this.state.notes)

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
                    >Add Product
                    </button>


                    {this.state.notes.topNotes.map((topNote, id) => (
                        <div className="topNote"  key={"topNoteID_" + id}>

                        <Form.Group>
                        <Form.Label>Top Note {id}</Form.Label>
                        <Form.Control type="text" name="topNote" value={this.state.notes.topNotes[id]} onChange={this.handleNoteChange(id, "top")} />
                        </Form.Group>

                        <button
                        type="button"
                        onClick={this.handleRemoveTopNote(id)}
                        >Del Top Note</button>
                        </div>
                    ))}

                    <button
                    type="button"
                    onClick={this.handleAddTopNote}
                    className="small"
                    >Add Top Note
                    </button>


                    {this.state.notes.heartNotes.map((heartNote, id) => (
                        <div className="heartNote"  key={"heartNoteID_" + id}>

                        <Form.Group>
                        <Form.Label>Heart Note {id}</Form.Label>
                        <Form.Control type="text" name="heartNote" value={this.state.notes.heartNotes[id]} onChange={this.handleNoteChange(id, "heart")} />
                        </Form.Group>

                        <button
                        type="button"
                        onClick={this.handleRemoveHeartNote(id)}
                        >Del Heart Note</button>
                        </div>
                    ))}

                    <button
                    type="button"
                    onClick={this.handleAddHeartNote}
                    className="small"
                    >Add Heart Note
                    </button>


                    {this.state.notes.baseNotes.map((baseNote, id) => (
                        <div className="baseNote"  key={"baseNoteID_" + id}>

                        <Form.Group>
                        <Form.Label>Base Note {id}</Form.Label>
                        <Form.Control type="text" name="baseNote" value={this.state.notes.baseNotes[id]} onChange={this.handleNoteChange(id, "base")} />
                        </Form.Group>

                        <button
                        type="button"
                        onClick={this.handleRemoveBaseNote(id)}
                        >Del Base Note
                        </button>
                        </div>
                    ))}

                    <button
                    type="button"
                    onClick={this.handleAddBaseNote}
                    className="small"
                    >Add base Note
                    </button>



    <ul>
        {this.state.products.map((value, index) => <li key={index}>{value.size} {value.price} {value.stockLevel}</li>) }
    </ul>


    <ul>
        {this.state.notes.topNotes.map((value, index) => <li key={index}>{value}</li>) }
        {this.state.notes.heartNotes.map((value, index) => <li key={index}>{value}</li>) }
        {this.state.notes.baseNotes.map((value, index) => <li key={index}>{value}</li>) }
    </ul>




                        <br/><br/>


                    <LinkInClass value="Add" className="green-button" onClick={this.handleSubmit}/>

                    
                </Form>
            </div>
        )

    }
}