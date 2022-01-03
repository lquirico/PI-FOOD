const axios = require('axios').default;
const { Recipe, Diet } = require('../db.js');
const SITE_KEY = process.env.SITE_KEY

//https://api.spoonacular.com/recipes/information?apiKey=3aff5d187dca4083ae4397f20d594d56
// https://api.spoonacular.com/recipes/complexSearch?apiKey=bd699ae831ca4e068ea7f1c3258f8a54&addRecipeInformation=true&number=100
const getApiInfo = async (req, res) => {
    try {
      const apiURL = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${SITE_KEY}&addRecipeInformation=true&number=100`)
      const apiInfo2 = apiURL.data.results
  
      let paso1 = apiInfo2.map(e =>{
        return{P_Instrucciones: e.analyzedInstructions[0]}
    })
    let paso2 = paso1[0].P_Instrucciones.steps.map(e => {
        return {passos: e.step}
    })
    let yFinal = paso2.map(e=>{
        return{yFinal: Object.values(e)}
    })
    let stepFnal= []
   yFinal.map(e => {stepFnal.push(e.yFinal)})
  
      const apiInfo = apiURL.data.results.map(e => {
        return {
            id: e.id,
            title: e.title,
            image: e.image,
            spoonacularScore: e.spoonacularScore,
            diets: e.diets,
            summary: e.summary,
            healthScore: e.healthScore,
   steps: e.analyzedInstructions.map(item =>{
     return(item.steps.map(item2 =>(item2.step)))
   })
        }
  })
 
   return apiInfo  
    } catch (error) {
      console.log(error)
    }
   //me traigo la info de la api
   }
// Creo funcion - necesito que consulte a la bd 
// guardar la info en una variable - iterar la info para que me retorne algo
// 
const  bdInfo = async () => {
      return await Recipe.findAll({ 
        include: { 
            model: Diet,
            attributes: ["name"], 
            through: {
                attributes:[],
            },
        }
    })
};

const InfoUnida = async () => {
    const totalInfo = await getApiInfo();
    const totalInfo2 = await bdInfo();
    const final = totalInfo.concat(totalInfo2); //

    return final // el json muestra y manda la data. 
}


const findName = async(req, res) => {
    try {
    const { name } = req.query;
    const info = await InfoUnida();
    
    if(name) {
        var filtrados = info.filter(n => n.title.toLowerCase().includes(name.toLowerCase()));
        filtrados.length? res.status(200).json(filtrados) : res.status(404).json({msg:"No se encontro la receta deseada"})
    } else {
        res.status(200).send(info)
        console.log("comidas")
    } } catch (error) {
        console.log(error)
    }
}

const FindID = async(req, res) => {
      try {
          const { id } = req.params
          const info = await InfoUnida();

          if(id) {
            console.log('entro') 
              var receta = info.filter(r => r.id == id); 
              receta.length? res.status(200).json(receta) : res.status(404).json({msg:"No se encontro la receta indicada"});
          }  
      } catch (error) {
          console.log(error)
      }
}

const TiposDeDietas = async (req, res) => {
    try {
         const tipos = ["gluten free", "dairy free", "paleolithic", "ketogenic", "lacto ovo vegetarian", "vegetarian", "vegan", "pescetarian", "primal", "fodmap friendly", "whole 30"]
    
          tipos.forEach(el => {
            try {
              if (el){ Diet.findOrCreate({
                where: { name: el }})}
            } catch (error) {
              console.log(error)
            }
              
          });
          DietBd = await Diet.findAll();
          res.status(200).json(DietBd);
      } catch (error) {
          res.status(404).send('No se tiene respuesta a su solicitud' + error)
      }
 }

 const CrearReceta = async (req, res) => {
         const { title, summary, spoonacularScore, healthScore, steps, img, DietB } = req.body;
         
         const newRecipe = await Recipe.create({title, summary, spoonacularScore, healthScore, steps, img});
         const DietIn = await Diet.findAll({
             where: { name: DietB}
         })
         newRecipe?.addDiet(DietIn);
         res.status(200).send("Has creado la receta con exito!")
 }



module.exports = { findName, FindID, TiposDeDietas, CrearReceta }