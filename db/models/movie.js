const Sequelize = require("sequelize");

/**
 * In JavaScript classes, the extends keyword is used to create a subclass, or a child of another class.
 * In this case we're extending from Sequelize.Model, which is part of Sequelize's API for model definition.
 */

module.exports = (sequelize) => {
  //Movie Model
  class Movie extends Sequelize.Model {}
  /**
   * Movie.init() defines a new table in the database with the name 'Movies'.
   *  Sequelize will look for information in the Movies table.
   */

  /**
   * The init() method takes two arguments
   * 1.) object literal that defines the model's attributes -- each attribute is a column of the table.
   * 2.) object literal that sets the model options
   */
  Movie.init(
    //Arg1: model attributes
    {
      //signifies that title entered will be a string
      title: Sequelize.STRING,
    },
    //arg2: model options
    { sequelize } //same as {sequelize: sequelize}
  );

  return Movie;
};
