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
      id: {
        type: Sequelize.INTEGER,
        //The ID acts as a 'primary key', or a unique indexable reference for each entry.
        primaryKey: true, // true intructs Sequelize to generate the primary key column using the property name defined in the model (in this case it's id, but it could be anything, like identifier). The ID should be a number, so its data type is INTEGER,
        autoIncrement: true, //true automatically generates an ID that increments by 1 for each new entry
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false, //disallow Null
        validate: {
          notEmpty: {
            // custom error message
            msg: 'Please provide a value for "title"',
          },
          notNull: {
            msg: 'Please provide a value for "title"',
          },
        },
      },
      runtime: {
        type: Sequelize.INTEGER,
        allowNull: false, //disallow Null
        validate: {
          notNull: {
            msg: 'Please provide a value for "runtime"',
          },
          min: {
            /**
             * args represents the value (argument) passed to the validator.
             * The value you specify is used to check if a column value is valid or invalid.
             */
            args: 1,
            msg: `Please provide a value greater than "0" for "runtime" `,
          },
        },
      },
      releaseDate: {
        type: Sequelize.DATEONLY,
        allowNull: false, //disallow Null
        validate: {
          notNull: {
            msg: 'Please provide a value for "releaseDate"',
          },
          isAfter: {
            args: "1895-12-27",
            msg:
              'Please provide a value on or after "1895-12-28" for "releaseDate"',
          },
        },
      }, // yyyy-mm-dd
      isAvailableOnVHS: {
        type: Sequelize.BOOLEAN,
        allowNull: false, //disallow Null
        defaultValue: false, // set default value
      },
    },
    //arg2: model options
    {
      paranoid: true, //enable "soft" deletes
      sequelize, //same as {sequelize: sequelize}
    }
  );

  return Movie;
};
