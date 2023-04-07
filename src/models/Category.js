// src/models/Category.js

/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

const CategoryModel = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: DataTypes.STRING,
    }, {
      timestamps: false,
      tableName: 'categories',
      underscored: true
    });
  
    return Category;
  };
  
  module.exports = CategoryModel;