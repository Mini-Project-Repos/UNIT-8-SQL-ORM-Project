/**
 * The db/index.js file exposes the Sequelize package whenever you import
 * ./db into your application code. This means that wherever you use require('./db'),
 * you have access to all of Sequelize's methods and functionality.
 *
 */

const db = require("./db");

//destructure models
const { Movie, Person } = db.models;

//Sequelize method called "operators" destructured from Sequelize library
const { Op } = db.Sequelize;

//Reusable Function
const mapFunction = (array, model) => {
  array.map(
    //maps through each object in the array, then destructures it
    (object) => {
      model.create({ ...object });
      //   console.log({ ...object });
    }
  );
};

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
    const movies = [
      {
        title: "Toy Story",
        runtime: 81,
        releaseDate: "1995-11-22",
        isAvailableOnVHS: true,
      },
      {
        title: "The Incredibles",
        runtime: 115,
        releaseDate: "2004-04-14",
        isAvailableOnVHS: true,
      },
      {
        title: "Toy Story 2",
        runtime: 92,
        releaseDate: "1999-11-13",
        isAvailableOnVHS: true,
      },
      {
        title: "Toy Story 3",
        runtime: 103,
        releaseDate: "2010-6-18",
        isAvailableOnVHS: false,
      },
    ];

    const people = [
      { firstName: "Tom", lastName: "Hanks" },
      { firstName: "Tim", lastName: "Allen" },
      { firstName: "Brad", lastName: "Bird" },
      { firstName: "Holly", lastName: "Hunter" },
    ];

    /**
     * Movie.create() builds a new model instance, which represents a database row, and automatically stores the instance's data.
     * It returns a Promise object, which resolves or rejects based on the successful or failed interaction with your database.
     */
    // Instance of the Movie class represents a database row
    //create movies
    const movieCreations = mapFunction(movies, Movie);
    //create Person
    const peopleCreations = mapFunction(people, Person);

    await Promise.all([movieCreations, peopleCreations]);

    //Find by primary key method

    // const movieById = await Movie.findByPk(1);
    // console.log(movieById.toJSON());

    //findOne() method
    /**
     * The where object is used to filter a query using the property / value pairs passed to it.
     * As you'll soon learn, the property values can be primitives for equality matches or objects
     * for creating more complex comparisons, using Sequelize's operators
     */

    // const movieByRuntime = await Movie.findOne({ where: { runtime: 115 } });
    // console.log(movieByRuntime.toJSON());

    //findAll() Method
    // const allMovies = await Movie.findAll();
    // console.log(allMovies.map((movie) => movie.toJSON()));

    //Filter Results
    /**
     * The findAll() method also take an options object.
     * Within the object you can add any number of criteria to filter the results.
     * For example, the following query uses the where object to find all people with the last name 'Hanks':
     */

    // const allPeople = await Person.findAll({
    //   where: {
    //     lastName: "Hanks",
    //   },
    // });
    // // SELECT * FROM People WHERE lastName = 'Hanks';
    // console.log(allPeople.map((person) => person.toJSON()));

    /**
     * You can also use where for more complex AND conditions by nesting two or more properties.
     * For example, the following returns all movies where runtime is 92 and isAvailableOnVHS is true:
     */

    // const someMovies = await Movie.findAll({
    //   where: {
    //     runtime: 92,
    //     isAvailableOnVHS: true,
    //   },
    // });
    // // SELECT * FROM Movies WHERE runtime = 92 AND isAvailableOnVHS = true;
    // //Returns NULL
    // console.log(someMovies.map((movie) => movie.toJSON()));

    //FindAll w/ same attributes

    // const allMoviesOnVHS = await Movie.findAll({
    //   attributes: ["id", "title"], // return only id and title
    //   where: {
    //     isAvailableOnVHS: true,
    //   },
    // });
    // console.log(allMoviesOnVHS.map((movie) => movie.toJSON()));

    //Operators
    // const moviesAfterJan2004 = await Movie.findAll({
    //   attributes: ["id", "title"],
    //   where: {
    //     releaseDate: {
    //       [Op.gte]: "2004-01-01", // greater than or equal to the date
    //     },
    //     runtime: {
    //       [Op.gt]: 95, // greater than 95
    //     },
    //   },
    // });

    // console.log(moviesAfterJan2004.map((movie) => movie.toJSON()));

    //Ordering
    // const ascendingMovieDate = await Movie.findAll({
    //   attributes: ["id", "title", "releaseDate"],
    //   where: {
    //     releaseDate: {
    //       [Op.gte]: "1995-01-01",
    //     },
    //   },
    //   order: [["releaseDate", "ASC"]], // dates in Ascending order
    // });
    // console.log(ascendingMovieDate.map((movie) => movie.toJSON()));

    //Update a Record with save()
    // const toyStory3 = await Movie.findByPk(4);
    // toyStory3.isAvailableOnVHS = true;
    // await toyStory3.save();

    // /**
    //  * Note: When converting an instance or collection of instances to JSON,
    //  * calling get({ plain: true}) returns the same as calling .toJSON()
    //  * – a plain object with just the model attributes and values.
    //  */
    // console.log(toyStory3.get({ plain: true }));

    // //Update a Record w/ update()
    // const toyStory3 = await Movie.findByPk(3);
    // await toyStory3.update({
    //   isAvailableOnVHS: true,
    // });

    //   /**
    //  * Note: When converting an instance or collection of instances to JSON,
    //  * calling get({ plain: true}) returns the same as calling .toJSON()
    //  * – a plain object with just the model attributes and values.
    //  */
    // console.log( toyStory3.get({ plain: true }) );

    //Define Which Attributes to Save
    // const toyStory3 = await Movie.findByPk(4);
    // await toyStory3.update(
    //   {
    //     title: "Trinket Tale 3", //will be ignored because not listed in the fields property to be updated
    //     isAvailableOnVHS: true,
    //   },
    //   { fields: ["isAvailableOnVHS"] }
    // );

    // database connection testing

    // await sequelize.authenticate();
    // console.log("Connection to the database successful!");
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      console.error("Validation errors: ", errors);
    } else {
      throw error;
    }
  }
})();
