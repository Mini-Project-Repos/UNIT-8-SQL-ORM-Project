const db = require("./db");
const { Movie } = db.models;

// async IIFE
(async () => {
  /**
   * Sequelize provides the sync() method, which automatically creates or updates your database tables (according to your model definition)
   * we want to create the actual 'Movies' table.
   * We’ve only defined the model in JavaScript. We need to sync those changes.
   */

  //Sync all tables
  /**
   * the sync() method accepts an object with a force parameter
   * that lets you control the database synchronization.
   */
  await db.sequelize.sync({ force: true });
  try {
    //Array of movie data
    const movies = [{ title: "Toy Story" }, { title: "The Incredibles" }];
    /**
     * Movie.create() builds a new model instance, which represents a database row, and automatically stores the instance's data.
     * It returns a Promise object, which resolves or rejects based on the successful or failed interaction with your database.
     */
    // Instance of the Movie class represents a database row
    //create movies
    const movieCreations = movies.map(({ title }) => Movie.create({ title }));
    await Promise.all(movieCreations);
    // database connection testing

    // await sequelize.authenticate();
    // console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }
})();
