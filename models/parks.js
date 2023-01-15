const { parks } = require("../db/data/index");
const db = require("../db/connection");
const format = require("pg-format");

exports.selectParks = () => {
  const parksData = parks.map((park) => {
    return [park.park_name, park.year_opened, park.annual_attendance];
  });

  const sqlString = format(
    `INSERT INTO parks (park_name, year_opened, annual_attendance) VALUES %L RETURNING *`,
    parksData
  );

  return db.query(sqlString).then((result) => {
    return result.rows;
  });
};

exports.removeParkById = () => {};

exports.updateParkById = () => {};
