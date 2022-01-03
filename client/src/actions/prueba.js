import axios from "axios";

export function getRecipe () {
    return async function (dispatch) // despacha la info
     { const info = await axios.get("http://localhost:3001/recipes")
     console.log(info)  //traigo el back 
       return dispatch ({
           type: "GET_RECIPES",
           payload: info.data
       })
    }
}

export function filterByDiet (payload) {
     return {
         type: "FILTER_BY_DIET",
         payload
     }
}

export function orderAsc (payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function getNameRecipe (name){
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/recipes?name=" + name);
            return dispatch ({
                type: "GET_NAME_RECIPE",
                payload: json.data
            })
        }
        catch(error) {
            console.log(error)
        }
    }
}

export function getDiets(){
    return async function (dispatch) {
        var infodiet = await axios("http://localhost:3001/types", {});

        return dispatch({type: "GET_DIETS", payload: infodiet.data});
    }
}

export function postRecipe(payload){
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/recipe", payload);
        console.log(response)
        return response;
    }
}