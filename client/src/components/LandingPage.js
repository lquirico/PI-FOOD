import React from "react";
import { Link } from "react-router-dom";
import style from "../css/LandingPage.module.css";


export default function LandingPage () {
    return (
        <div className={style.container}> 
        <h1 className={style.title}> FOOD LIBRARY </h1>
        <Link to = "/home">
            <button className={style.button}> Home </button>
        </Link>
        </div>
    )
}