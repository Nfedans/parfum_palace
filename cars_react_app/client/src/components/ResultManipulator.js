import React, { Component } from "react";
import '../css/App.css'


export default class ResultManipulator extends Component
{
    render()
    {
        return(
            <div className="manipulation_container">
                <div className="manipulation_child">FILTERS</div>
                <div className="manipulation_child">X RESULTS FOUND</div>
                <div className="manipulation_child">SORT BY</div>
            </div>

        )

    }
}