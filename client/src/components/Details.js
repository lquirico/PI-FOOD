
import React from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import { useEffect } from "react";
import style from "../css/Detail.module.css";
// import { useParams } from "react-router-dom";

export default function Details(props){
    const dispatch = useDispatch();
    const { id } = useParams();


    useEffect(()=> {
        dispatch(getDetail(id));
        debugger
    }, [dispatch, id])


    const myRecipe = useSelector ((state) => state.detail);

    return (
        <div className={style.container} > 
        <div className={style.card} >

       

{
       myRecipe.map(el =>{
         return(
          <div >            
        <h1>{el?.title}</h1>
          <img  src= {el?.image? el?.image : el?.img}/> 
                <h2>Spoonacular Score: {el?.spoonacularScore?el?.spoonacularScore:'baseDatos'} </h2>
                <h2>Health Score: {el?.healthScore} </h2>
                <h3 className={style.diet} >Type of diet: {el?.diets?el?.diets: el?.Diets?.map(el =>el?.name)}</h3>
                <h4>Summary: <div dangerouslySetInnerHTML={{ __html: el?.summary }}/></h4>
      <h4>Steps: <div dangerouslySetInnerHTML={{ __html:( el?.steps ? el?.steps : "Se desconocen los pasos a seguir") }}/></h4>

                </div> 
         )
       }) 
      
            }

            <Link to= "/Home"><button className={style.input} >Back to Home</button></Link>
            </div>
        </div>


    )




}