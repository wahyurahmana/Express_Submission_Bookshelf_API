'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Book.init({
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate: {
        notNull : {
          args : true,
          msg : 'Gagal menambahkan buku. Mohon isi nama buku'
        },
        notEmpty : {
          args : true,
          msg : 'Gagal menambahkan buku. Mohon isi nama buku'
        }
      }
    },
    year: DataTypes.INTEGER,
    author: DataTypes.STRING,
    summary: DataTypes.STRING,
    publisher: DataTypes.STRING,
    pageCount: DataTypes.INTEGER,
    readPage: DataTypes.INTEGER,
    finished: DataTypes.BOOLEAN,
    reading: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};