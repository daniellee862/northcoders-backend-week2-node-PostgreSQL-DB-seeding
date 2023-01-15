const { parks, rides, stalls } = require("./data/index.js");

const { selectParks } = require("../models/parks");

const formatRides = require("../utils/format-rides");

const db = require("./connection");

const format = require("pg-format");

function seed() {
  return db
    .query("DROP TABLE IF EXISTS rides;")
    .then(() => {
      return db.query("DROP TABLE IF EXISTS stalls;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS foods;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS stalls_foods;");
    })
    .then(() => {
      return db.query("DROP TABLE IF EXISTS parks;");
    })
    .then(() => {
      return createParks();
    })
    .then(() => {
      return createRides();
    })
    .then(() => {
      return insertParks();
    })
    .then((rows) => {
      console.log(rows);
      const updatedRides = formatRides(rides, rows);
      return insertRides(updatedRides);
    });
}

function createParks() {
  /* Create your parks table in the query below */
  return db.query(
    `CREATE TABLE parks
    (
      park_id SERIAL PRIMARY KEY, 
      park_name VARCHAR(50) NOT NULL, 
      year_opened INT NOT NULL, 
      annual_attendance INT NOT NULL
      );`
  );
}

function createRides() {
  return db.query(
    `CREATE TABLE rides
      (
        ride_id SERIAL PRIMARY KEY, 
        park_id INT REFERENCES parks(park_id),
        ride_name VARCHAR(30),
        year_opened INT,
        votes INT
        );`
  );
}

function insertParks() {
  return selectParks();
}

function insertRides(updatedRides) {
  const ridesData = updatedRides.map((ride) => {
    return [ride.park_id, ride.ride_name, ride.year_opened, ride.votes];
  });

  const sqlString = format(
    `INSERT INTO rides (park_id, ride_name, year_opened, votes) VALUES %L RETURNING *`,
    ridesData
  );

  return db.query(sqlString).then((result) => {
    return result.rows;
  });
}

//RREFACTOR INSERT RIDES TO USE A MODEL.

module.exports = { seed };
