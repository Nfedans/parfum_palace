import React, { Component } from "react";
import '../css/App.css'
import '../css/clipart1087676.png'

export default class Header extends Component
{

    constructor(props)
    {
        super(props);
    }

    render()
    {



        
    
        return(
            <div className="header_main_container">

             

                <div className="logoDiv" onClick={this.props.paragraphHomeHandler}/>

                <div className="gender_links">
                    <div className="indiv_link" onClick={this.props.paragraphManHandler}>Men's Scents</div>
                    <div className="indiv_link" onClick={this.props.paragraphWomanHandler}>Women's Parfum</div>
                    <div className="indiv_link" onClick={this.props.paragraphUnisexHandler}>Unisex Sprays</div>
                    <div className="indiv_link" onClick={this.props.paragraphCatalogueHandler}>Catalogue</div>
                </div>

                <div className="feature_holder">
                <input type="text" placeholder="Search..." className="search_bar"/>
                <div className="img_holder"><img src={require("../css/lookup_glass_white.png")} className="search_bar_img"/></div>
                </div>

            </div>

        )

    }
}


