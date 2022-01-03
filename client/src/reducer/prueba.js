const initialState = {
    recipes: [],
    allRecipes: [],
    getDiets: [],

}


function rootReducer (state=initialState, action) {
switch(action.type) {
    case "GET_RECIPES":
    return {
        ...state,
        recipes: action.payload,
        allRecipes: action.payload,
    }
    

    case "FILTER_BY_DIET":
            const recipes = state.recipes 
            let dietsFiltered = 
                action.payload === "all" 
                ? recipes
                : recipes.filter((el) => el.recipes.includes(action.payload)) 
                
      
            return {
              ...state,
              recipes: dietsFiltered, 
            }

    case "ORDER_BY_NAME":
        let sortedArr = action.payload === "asc" ?
        state.recipes.sort(function (a, b){
            if (a.name > b.name) {
                return 1
            }
            if (b.name > a.name) {
                return -1
            }
            return 0
        }) :
        state.recipes.sort(function (a, b) {
            if (a.name > b.name) {
                return -1
            }
            if (b.name > a.name) {
                return 1
            }
            return 0
        })
        return {
            ...state,
            recipes: sortedArr
        }
        case "GET_NAME_RECIPE":
            return {
                ...state,
                recipes: action.payload

            }

            case "POST_RECIPE":
                return {
                    ...state,
                }
            
            case "GET_DIET":
                return {
                    ...state,
                    getDiets: action.payload,

                }


  default:
      return state;
  }       
}


export default rootReducer;