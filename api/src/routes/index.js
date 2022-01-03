const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { findName, FindID, TiposDeDietas, CrearReceta } = require("../controller/recetas.controller.js")

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get("/recipes", findName )

router.get("/recipes/:id", FindID )    


router.get("/types", TiposDeDietas)


router.post("/recipe", CrearReceta)



module.exports = router;

