import React from "react";
import { useState, useEffect } from "react";
import {Link, useHistory} from "react-router-dom";
import { getDiets, postRecipe } from "../actions";
import {useDispatch, useSelector} from "react-redux";
import style from "../css/RecipeCreate.module.css";


function validate(input){
    let errors = {}
    if(!input.title){
        errors.title = 'Se requiere un nombre';
    } else {
        errors.title = ''
    }
    if(!input.summary){
        errors.summary = 'Se requiere un resumen';
    } else {
        errors.summary = ''
    }
    if(!input.healthScore){
        errors.healthScore = 'Se requiere un nivel de comida saludable'
    } else {
        errors.healthScore = ''
    }
    if(!input.spoonacularScore){
        errors.spoonacularScore = 'Se requiere una puntuacion'
    } else {
        errors.spoonacularScore = ''
    }
    if(!input.steps){
        errors.steps = 'Se requiere un paso a paso'
    } else {
        errors.status = ''
    }
    if(input.diets.length <= 0){
        errors.diets = 'Se requiere un tipo de dieta'
    } else {
        errors.diets = ''
    }
    return errors
}

export default function RecipeCreated() {
    const dispatch = useDispatch();
    const traerDietas = useSelector((state) => state.diets)
    const history= useHistory();

    const [errors, setErrors] = useState({})


    const [input, setInput] = useState({

        title: "",
        summary: "",
        healthScore: "",
        steps:"",
        spoonacularScore: "",
        image: "",
        diets:[],
    })
    function handleDelete(el){
        setInput({
            ...input,
            diets: input.diets.filter(d => d !== el)
        })
    }

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
        console.log(input)
    }

    function handleSelect(e){
        setInput({
            ...input,
            diets: [...input.diets,e.target.value] 
        })
    }

    // function handleCheck(e){
    //     if(e.target.checked){
    //         debugger
    //         setInput({
    //             ...input,
    //             state: e.target.value,
    //         })
    //     }
    // }


    // const ErroresValidacion=()=>{
    //     debugger
    //         if(!input.title) {alert("FALTA EL CAMPO DEL TITULO"); return false;}
    //         if(!input.summary) {alert("FALTA EL CAMPO DEL SUMMARY"); return false;}
    //         if(!input.healthScore) {alert("FALTA EL CAMPO DEL HEALTHSCORE"); return false;}
    //         if(!input.spoonacularScore) {alert("FALTA EL CAMPO DEL SPOONACULARSCORE"); return false;}
    //         if(!input.steps) {alert("FALTA EL CAMPO DEL STEPS"); return false;}
    //         if(!input.diets) {alert("FALTA EL CAMPO DEL DIETS"); return false;}
    //         return true;
    //       }


    function handleSubmit(e){
        e.preventDefault()
        if(Object.keys(errors).length >0) {
            alert("Complete tje required fields");
        } else { 
            dispatch(postRecipe(input))
            alert("Receta creada!")
            setInput({
            title: "",
            summary: "",
            healthScore: "",
            steps:"",
            spoonacularScore: "",
            diets:[],
            })
            history.push('/home')
        }
        
    }

    useEffect(() => {
        dispatch(getDiets());
    }, [dispatch])

    useEffect(() => {
        setErrors(validate(input))
    }, [])

    return (

        <div className={style.container}>
        <h1> ¡CREATE YOUR OWN RECIPE! </h1>
        <Link to= "/Home"><button className={style.button} >Back to home</button></Link>
        <form onSubmit={(e)=>handleSubmit(e)}> 
          <div>
             <label className={style.title}>Title:</label>
                <input
            className= {style.input}
            type= "text"
            value={input.title}
            name="title"
            onChange={handleChange}
            />
            {errors.title && (
                        <p className='error'>{errors.title}</p>
                    )}
          </div>
                   
          <div>
          <label className={style.title}>Summary:</label>
          <input
              className= {style.input}
              type="text"
              value={input.summary}
              name="summary"
              onChange={handleChange}
          />
          {errors.summary && (
                        <p className='error'>{errors.summary}</p>
                    )}
          </div>
          <div>
              <label className={style.title}>SpoonacularScore:</label>
              <input
                  className= {style.input}
                  type="number"
                  value={input.spoonacularScore}
                  name="spoonacularScore"
                  onChange={handleChange}
              />
              {errors.spoonacularScore && (
                        <p className='error'>{errors.spoonacularScore}</p>
                    )}
          </div>
          <div>
              <label className={style.title}>Health Score:</label>
              <input
                  className= {style.input}
                  type="number"
                  value={input.healthScore}
                  name="healthScore"
                  onChange={handleChange}
              />
              {errors.healthScore && (
                        <p className='error'>{errors.healthScore}</p>
                    )}
          </div>
          <div>
              <label className={style.title}>Steps:</label>
              <input
                  className= {style.input}
                  type="text"
                  value={input.steps}
                  name="steps"
                  onChange={handleChange}
              />
              {errors.steps && (
                        <p className='error'>{errors.steps}</p>
                    )}
          </div>
           
                  <div className= {style.diets}>   <select className={style.select1} onChange={(e) => handleSelect(e)}  name="Diets">
                    {traerDietas.map((e) => (
                        <option value={e.name}>{e.name}</option>
                    ))}
                    </select>
                
                <ul>{input.diets.map(el => <li onClick={()=> handleDelete(el)}>{el}</li>)}</ul>
                {/* {input.diets.map(el =>
                <div>
                    <p onClick={()=> handleDelete(el)}>{el}</p>
                    
                    </div>
                    )} */}
                </div>

                <div>
              <label className={style.title}>Image:</label>
              <input
                  className= {style.input}
                  type="text"
                  value={input.image}
                  defaultValue={"https://img.freepik.com/foto-gratis/vista-superior-papel-menu-blanco-plato-cubiertos-hojas_23-2148493288.jpg?size=626&ext=jpg"}
                  name="image"
                  onChange={handleChange}
              />
              
          </div>

            {
                    !errors.title && !errors.summary && !errors.spoonacularScore && !errors.healthScore && !errors.steps && !errors.diets
                    ? <button  className= {style.button} type='Submit'>Create recipe</button>
                    
                    :  (<p className={style.p}>Todos los campos deben ser completados para poder crear la Receta</p> )
                    
                }
          
        </form>

        
        </div>
    )
}