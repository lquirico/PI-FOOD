import React from "react"
import { Link } from 'react-router-dom';
import SearchBar from "./SearchBar";
import style from "../css/NavBAR.module.css";




export default function NavBar() { 

    return (
        <nav className={style.nav} >
            <div className= {style.container}>
                
                <Link to='/recipes'> <button className={style.button} >Create your own recipe</button> </Link>

                 

                 <SearchBar/>

                 </div>
               
                
            
        </nav>
    )
}