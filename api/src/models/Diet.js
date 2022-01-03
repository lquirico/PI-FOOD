const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Diet', {
    
    id: {
      type: DataTypes.UUID,   // para que no choque con los ID de la api
      unique: true,
      primaryKey: true, // indica que el ID es la PK
      defaultValue: DataTypes.UUIDV4
    },

    name: {
      type: DataTypes.STRING,
      
    },
},
   {          // para no tener que agregar todos estos datos cuando mando un post
     timestamps: false,
     createdAt: false,
     updatedAt: false
 
 });
};