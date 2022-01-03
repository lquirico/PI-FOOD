const apiInfo = async(req, res)=>{
    try {
    const urlApi = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=bd699ae831ca4e068ea7f1c3258f8a54&addRecipeInformation=true&number=100`)
    const infoApi = await urlApi.data.results
    
    return infoApi.map(i=>{
        return {
            id: i.id,
            title: i.title,
            summary: i.summary,
            spoonacularScore: i.spoonacularScore,
            healthScore: i.healthScore,
            steps: analyzedInstructions[0].steps,
            diets: i.diets,
            image: i.image,
        }
    })
    
    
} catch (error) {
    console.log("comidas no tengo")
}
}