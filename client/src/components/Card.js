import React from "react";
import style from "../css/Card.module.css";

export default function Card ({title, image, diets}) {
    return (
        <div className={style.container}>
        <div className= {style.card}>
            <h3>{title}</h3>
            <img src={image} alt="Img not found" witdh="200px" height="200px"/>
           <div className={style.diet}>{diets?.map(el => <h5>{el}</h5>)}</div>
            

            </div>
        </div>
    )

}

