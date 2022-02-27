import React, {Component} from "react"
import {BrowserRouter, Switch, Route} from "react-router-dom"





import Banner from "./Banner"
import Header from "./Header"
import HeadParagraph from "./HeadParagraph"
import ResultManipulator from "./ResultManipulator"




export default class HomeTest extends Component
{

    constructor(props)
    {
        super(props);
        this.bannerHandler = this.bannerHandler.bind(this);
        this.paragraphManHandler = this.paragraphManHandler.bind(this);
        this.paragraphWomanHandler = this.paragraphWomanHandler.bind(this);
        this.paragraphUnisexHandler = this.paragraphUnisexHandler.bind(this);
        this.paragraphCatalogueHandler = this.paragraphCatalogueHandler.bind(this);
        this.paragraphAdminHandler = this.paragraphAdminHandler.bind(this);
        this.paragraphHomeHandler = this.paragraphHomeHandler.bind(this);

        this.state = {
            banner:true,
            paragraph: "Home"
        }
    }

    bannerHandler()
    {
        this.setState({banner:false})
    }

    paragraphManHandler()
    {
        this.setState({paragraph:"Men"})
        console.log("Got inside Men")
    } 

    paragraphWomanHandler()
    {
        this.setState({paragraph:"Women"})
        console.log("Got inside Women")
    } 

    paragraphUnisexHandler()
    {
        this.setState({paragraph:"Unisex"})
        console.log("Got inside Unisex")
    } 

    paragraphCatalogueHandler()
    {
        this.setState({paragraph:"Catalogue"})
        console.log("Got inside Catalogue")
    } 

    paragraphAdminHandler()
    {
        this.setState({paragraph:"Admin"})
        console.log("Got inside Admin")
    } 

    paragraphHomeHandler()
    {
        this.setState({paragraph:"Home"})
        console.log("Got inside Home")
    } 




    render()
    {

    console.log(this.state.paragraph)


        return (
            <div className="head">

            {this.state.banner ? <Banner bannerHandler={this.bannerHandler}>The Best Deals On The Inter-Webs!</Banner> : null}
            
            <Header 
            paragraphManHandler={this.paragraphManHandler}
            paragraphWomanHandler={this.paragraphWomanHandler}
            paragraphUnisexHandler={this.paragraphUnisexHandler}
            paragraphCatalogueHandler={this.paragraphCatalogueHandler}
            paragraphAdminHandler={this.paragraphAdminHandler}
            paragraphHomeHandler={this.paragraphHomeHandler}
            />
            <ResultManipulator/>
            <HeadParagraph msg={this.state.paragraph}/>

            </div>
        )
    }
}