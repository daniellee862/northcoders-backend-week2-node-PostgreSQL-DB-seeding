const formatRides = (rides, parks) => {
  const updatedRides = rides.map((ride) => {
    const updatedRide = {
      ...ride,
    };
    parks.forEach((park) => {
      if (park.park_name === ride.park_name) {
        updatedRide.park_id = park.park_id;
      }
    });

    delete updatedRide.park_name;
    return updatedRide;
  });

  return rides.length === 0 ? [] : updatedRides;
};

module.exports = formatRides;
