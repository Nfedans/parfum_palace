import React, { Component } from "react";
import '../css/App.css'
import '../css/clipart1087676.png'

export default class Banner extends Component
{
    render()
    {
        return(
            <div className="top-block-opened">
            
            <div className="textContainer">
                <div className="banner-text-opened">
                {this.props.children}
                </div>
            </div>

            <div onClick={this.props.bannerHandler} className="closerBtn"><img src={require("../css/white_cross.png")} className="exitImg"/></div>
            
            
            
            </div>

        )

    }
}

