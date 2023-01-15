/* make sure you write your tests for your utils functions in here :eyes: */
const formatRides = require("../utils/format-rides");

const rides = [
  {
    ride_name: "KOBRA",
    year_opened: 2010,
    park_name: "Chessington World of Adventures",
    votes: 1,
  },
  {
    ride_name: "Tiny Truckers",
    year_opened: 1994,
    park_name: "Chessington World of Adventures",
    votes: 2,
  },
  {
    ride_name: "The Demon",
    year_opened: 2004,
    park_name: "Tivoli Gardens",
    votes: 8,
  },
  {
    ride_name: "The Caravan",
    year_opened: 1974,
    park_name: "Tivoli Gardens",
    votes: 1,
  },
];

const rows = [
  {
    park_id: 1,
    park_name: "Thorpe Park",
    year_opened: 1979,
    annual_attendance: 1700000,
  },
  {
    park_id: 2,
    park_name: "Alton Towers",
    year_opened: 1980,
    annual_attendance: 2520000,
  },
  {
    park_id: 3,
    park_name: "Chessington World of Adventures",
    year_opened: 1987,
    annual_attendance: 1400000,
  },
  {
    park_id: 4,
    park_name: "Tivoli Gardens",
    year_opened: 1843,
    annual_attendance: 3972000,
  },
];

describe.only("formatRides()", () => {
  test("RETURN EMPTY ARRAY WHEN PASSED EMPTY ARRAY", () => {
    expect(formatRides([])).toEqual([]);
  });

  test("TEST INPUT ARRAY IS NOT MUTATED", () => {
    formatRides(rides, rows);
    expect(rides).toEqual([
      {
        ride_name: "KOBRA",
        year_opened: 2010,
        park_name: "Chessington World of Adventures",
        votes: 1,
      },
      {
        ride_name: "Tiny Truckers",
        year_opened: 1994,
        park_name: "Chessington World of Adventures",
        votes: 2,
      },
      {
        ride_name: "The Demon",
        year_opened: 2004,
        park_name: "Tivoli Gardens",
        votes: 8,
      },
      {
        ride_name: "The Caravan",
        year_opened: 1974,
        park_name: "Tivoli Gardens",
        votes: 1,
      },
    ]);
  });

  test("RETURN RIDES ARRAY IS SAME LENGTH AS INPUT RIDES ARRAY", () => {
    expect(formatRides(rides, rows).length).toBe(rides.length);
  });

  test("RETURN UPDATED OBJECT WHEN PASSED ARRAY WITH SINGLE OBJECT", () => {
    expect(
      formatRides(
        [
          {
            ride_name: "KOBRA",
            year_opened: 2010,
            park_name: "Chessington World of Adventures",
            votes: 1,
          },
        ],
        rows
      )
    ).toEqual([
      {
        ride_name: "KOBRA",
        year_opened: 2010,
        park_id: 3,
        votes: 1,
      },
    ]);
  });

  test("RETURN UPDATED OBJECT WHEN PASSED ARRAY WITH MAY OBJECTS", () => {
    expect(formatRides(rides, rows)).toEqual([
      {
        ride_name: "KOBRA",
        year_opened: 2010,
        park_id: 3,
        votes: 1,
      },
      {
        ride_name: "Tiny Truckers",
        year_opened: 1994,
        park_id: 3,
        votes: 2,
      },
      {
        ride_name: "The Demon",
        year_opened: 2004,
        park_id: 4,
        votes: 8,
      },
      {
        ride_name: "The Caravan",
        year_opened: 1974,
        park_id: 4,
        votes: 1,
      },
    ]);
  });
});
