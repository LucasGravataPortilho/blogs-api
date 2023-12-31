// src/models/User.js

/**
 * 
 * @param {import('sequelize').Sequelize} sequelize 
 * @param {import('sequelize').DataTypes} DataTypes 
 */

const UserModel = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING
    }, {
      timestamps: false,
      tableName: 'users',
      underscored: true
    });

    User.associate = (models) => {
      User.hasMany(models.BlogPost, {
        foreignKey: 'userId',
        as: 'blog_posts'
      })
    }
  
    return User;
  };
  
  module.exports = UserModel;