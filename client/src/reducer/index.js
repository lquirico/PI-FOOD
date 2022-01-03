const initialState = {
    recipes : [],
    diets: [],
    allRecipes: [],
    detail: [],
}


function rootReducer (state = initialState, action) {
switch (action.type){
    case 'GET_RECIPES':
    return {
        ...state,
        recipes: action.payload,     //en mi estado recipes, manda todo lo que envie la accion getrecipes
        allRecipes: action.payload
    }
    

    case 'GET_DIETS':
        return{
            ...state,
            diets: action.payload
        }

    case 'POST_RECIPE':
        return{
            ...state,
        }
        case 'FILTER_BY_DIET':
            let allRecipes2 = state.allRecipes
            let dietsFiltered = 
             action.payload?.includes("all")
                ? allRecipes2
                : allRecipes2?.filter((el) => el.diets?.includes(action.payload)); 
                console.log(dietsFiltered)
                
      
            return {
              ...state,
              recipes: dietsFiltered, 
            }

 case 'FILTER_BY_NAME':
     let order = [...state.allRecipes]
        const orderName = action.payload === "asc" ?
         order.sort(function(a, b){
            if (a.title > b.title) {
                return 1
               }
            if (b.title > a.title) {
                 return -1
                }
                return 0

        }) :
         order.sort(function(a, b){
            if (a.title > b.title) {
                return -1
               }
            if (b.title > a.title) {
                 return 1
                }
                return 0
        })
          return {
              ...state,
              recipes: action.payload === 'all' ? state.allRecipes : orderName,
          }
case 'FILTER_BY_SCORE':
    let score = [...state.allRecipes] 
    const orderScore = action.payload === "asc" ?
     score.sort(function(a, b){
        if (a.healthScore > b.healthScore) {
            return 1
           }
        if (b.healthScore > a.healthScore) {
             return -1
            }
            return 0

    }) :
     score.sort(function(a, b){
        if (a.healthScore > b.healthScore) {
            return -1
           }
        if (b.healthScore > a.healthScore) {
             return 1
            }
            return 0
    })
      return {
          ...state,
          recipes: action.payload === 'all' ? state.allRecipes : orderScore,
      }

      case 'GET_NAME_RECIPES':
        return{
            ...state,
            recipes: action.payload
        }

        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload
            }

    default: 
    return state
}

}



export default rootReducer;  