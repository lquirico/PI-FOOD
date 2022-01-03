const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.


module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {

    id: {
      type: DataTypes.UUID,   // para que no choque con los ID de la api
      allowNull: false,
      unique: true,
      primaryKey: true, // indica que el ID es la PK
      defaultValue: DataTypes.UUIDV4
    },

    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    summary: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    spoonacularScore: {
      type: DataTypes.FLOAT,
      
    },

    healthScore: {
      type: DataTypes.FLOAT,
      
    },

    steps: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    img: {
      type: DataTypes.STRING,
      
      defaultValue: "https://img.freepik.com/foto-gratis/vista-superior-papel-menu-blanco-plato-cubiertos-hojas_23-2148493288.jpg?size=626&ext=jpg",
    },

    
    

   

    
    
 },
    {          // para no tener que agregar todos estos datos cuando mando un post
      timestamps: false,
      createdAt: false,
      updatedAt: false
  
  });

  
};
