import React from "react";
import "./Loading.css"
import reload from "../reload.svg";

export default function Loading(){
    return(
        <div className = "d-flex justify-content-center">
            <img src={reload} className="App-logo " alt="logo" />
        </div>
    );
};
