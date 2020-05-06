const Sequelize = require("sequelize");
const Sequelize = require("sequelize");

//Connect to a SQLite database.
/**
 * The variable sequelize now holds a Sequelize instance you can interact with.
 * You initialize the database connection by passing the Sequelize() constructor an object with connection parameters.
 */
const sequelize = new Sequelize();

//The dialect parameter specifies the specific version of SQL you're using (the SQL dialect of the database), which in this case it's sqlite
/**
 * Since SQLite is a file-based database that doesn't require credentials or a host, you use the storage key to specify the file path or the storage engine for SQLite.
 * The value 'movies.db' will create a database in your project named 'movies'.
 */
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "movies.db",
});

// async IIFE
(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();
