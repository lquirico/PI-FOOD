import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameRecipes } from "../actions";
import style from "../css/SearchBar.module.css";

export default function SearchBar (){
    const dispatch = useDispatch();
    const [name, setName] = useState("")

function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value)
}
function handleSubmit(e){
    e.preventDefault();
    dispatch(getNameRecipes(name))
}
    return (

        <div>
            <input
            className= {style.input}
               type = "text"
               placeholder="What you need?"
               onChange={(e) => handleInputChange(e)}

               />
       <button className={style.button} type="submit" onClick={(e) => handleSubmit(e)}> Search </button>

            
        </div>
    )
}