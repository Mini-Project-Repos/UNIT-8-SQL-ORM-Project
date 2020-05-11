const Sequelize = require("sequelize");

//Connect to a SQLite database.
/**
 * The variable sequelize now holds a Sequelize instance you can interact with.
 * You initialize the database connection by passing the Sequelize() constructor an object with connection parameters.
 */

//The dialect parameter specifies the specific version of SQL you're using (the SQL dialect of the database), which in this case it's sqlite
/**
 * Since SQLite is a file-based database that doesn't require credentials or a host, you use the storage key to specify the file path or the storage engine for SQLite.
 * The value 'movies.db' will create a database in your project named 'movies'.
 */
const sequelize = new Sequelize({
  dialect: "sqlite", //dialect used
  storage: "movies.db", // database name
  define: {
    timestamps: false,
  },
});

/**
 * The file exports the db object, which holds the Sequelize and database configurations, as well as the models.
 * Exposing the Sequelize package wherever you import models into your code
 * means that you'll have all of Sequelize's methods and functionality to use.
 */
const db = {
  sequelize, //SQL config
  Sequelize, //database config
  models: {}, //models
};

// creates Movie object and gets the model data from movie.js
db.models.Movie = require("./models/movie.js")(sequelize);

db.models.Person = require("./models/person.js")(sequelize);

//exports file
module.exports = db;
