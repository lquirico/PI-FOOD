import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import React from "react";
import { getRecipes, getDiets, filterRecipesByDiet, postRecipe, filterByName, filterByScore, getNameRecipes } from "../actions/index.js";
import { Link } from "react-router-dom";
import Card  from "./Card";
import PaginadoPi from "./paginado.js";
// import SearchBar from "./SearchBar.js";
import style from "../css/Principal.module.css";

const divStyle = {
    textDecoration: "none",
    };

export default function Home () {
    const dispatch = useDispatch()
    const recipes = useSelector((state) => state.recipes) //traigo el array del estado del reducer
    const [orden, setOrder] = useState("")
    const [orden2, setOrder2] = useState("")
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage, setRecipesPerPage] = useState(9);
    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipe = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    
    useEffect(() => {    //cada vez que el componente se renderiza, se ejecuta el USEEFFECT
        dispatch(getRecipes())
    }, [dispatch])

    function handleClick(e) {
        e.preventDefault();
        dispatch(getRecipes())
        setCurrentPage(1);
    }

    function handleFilterDiet(e){
        e.preventDefault()
         dispatch(filterRecipesByDiet(e.target.value))
         setCurrentPage(1)
    }

    function handleSortName(e) {
        e.preventDefault();
        dispatch(filterByName(e.target.value))
        setCurrentPage(1);
        setOrder(`Ordenado ${e.target.value}`)

    }

    function handleSort(e) {
        e.preventDefault();
        dispatch(filterByScore(e.target.value))
        setCurrentPage(1);
        setOrder2(`Ordenado ${e.target.value}`)

    }




    return (
        <div className={style.container}>
            
            <button className= {style.select1} onClick={(e)=> handleClick(e)}> 
            Reload all recipes 
            </button>
            <div>
                

                <select className= {style.select1} onChange={(e) => handleSortName(e)}>
                    <option value= "all"> All </option>
                    <option value= "asc"> A - Z </option>
                    <option value= "desc"> Z - A </option>
                </select>

                <select className={style.select1} onChange={(e) => handleSort(e)}>
                    <option value= "all"> All </option>
                    <option value= "asc"> Higher score </option>
                    <option value= "desc"> Lower score </option>
                </select>
                
                <select className= {style.select1} onChange={(e) => handleFilterDiet(e)}>
                <option value= "all"> All </option>
                <option value= "gluten free"> Gluten free </option>
                <option value= "vegetarian"> Vegetarian </option>
                <option value= "paleolithic"> Paleolithic </option>
                <option value= "ketogenic"> ketogenic </option>
                <option value= "lacto ovo vegetarian"> Lacto ovo vegetarian </option>
                <option value= "dairy free"> Dairy free </option>
                <option value= "vegan"> Vegan </option>
                <option value= "pescetarian"> Pescetarian </option>
                <option value= "primal"> Primal </option>
                <option value= "fodmap friendly"> Fodmap friendly </option>
                <option value= "whole 30"> Whole 30 </option>
                 </select>
            </div>


            <PaginadoPi   //props para el componente
                recipesPerPage={recipesPerPage}
                recipes={recipes.length}
                paginado={paginado}
            />

            {/* <SearchBar/> */}

            
            <div className={style.cards}>
                {currentRecipe.map((el) => 
               (<div> 
                      <Link style={divStyle} to={"/Recipes/" + el.id}> 
                        <Card
                            title = {el.title}
                            image = {el.image ? el.image : el.img}
                            diets = {el.diets ? el.diets : el.Diets.map(el => el.name)}
                            key = {el.id}
                           id = {el.id}
                        />
                      </Link>
                 </div> )
                       
                       ) 
                        }
            </div>
        </div>
    )
}


