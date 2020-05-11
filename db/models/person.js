const Sequelize = require("sequelize");

module.exports = (sequelize) => {
  class Person extends Sequelize.Model {}

  Person.init(
    {
      id: {
        type: Sequelize.INTEGER,
        //The ID acts as a 'primary key', or a unique indexable reference for each entry.
        primaryKey: true, // true intructs Sequelize to generate the primary key column using the property name defined in the model (in this case it's id, but it could be anything, like identifier). The ID should be a number, so its data type is INTEGER,
        autoIncrement: true, //true automatically generates an ID that increments by 1 for each new entry
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false, //disallow Null
        validate: {
          notEmpty: {
            // custom error message
            msg: 'Please provide a value for "firstName"',
          },
          notNull: {
            msg: 'Please provide a value for "firstName"',
          },
        },
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false, //disallow Null
        validate: {
          notEmpty: {
            // custom error message
            msg: 'Please provide a value for "lastName"',
          },
          notNull: {
            msg: 'Please provide a value for "lastName"',
          },
        },
      },
    },
    {
      sequelize, //same as {sequelize: sequelize}
    }
  );

  return Person;
};
