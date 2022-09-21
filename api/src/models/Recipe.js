const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull:false,
      primaryKey : true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    summary:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    healthScore:{
      type: DataTypes.FLOAT
    },
    image: {
      type: DataTypes.STRING,
    },
    steps: {
      type: DataTypes.TEXT
    },
    dishType:{
      type: DataTypes.TEXT
    },
    createdINBd: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });
};
