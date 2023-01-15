/**
 * Create your connection to the DB in this file
 * and remember to export it
 */

const { Pool } = require("pg");

if (process.env.PGDATABASE === undefined) {
  throw new Error("no PGDATABASE set");
}

const connection = new Pool({
  database: process.env.PGDATABASE,
});

module.exports = connection;
