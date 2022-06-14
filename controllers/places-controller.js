const HttpError = require("../models/http-error");

/*a controller file contains all middleware functions */

const Dummy_Places = [
  {
    id: "p1",
    title: "Emp. State Building 111",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
  {
    id: "p1",
    title: "Emp. State Building 222",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
  {
    id: "p3",
    title: "Emp. State Building 333 ",
    description: "One of the most famous sky scrapers in the world!",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u2",
  },
];
const getPlaceById = (req, res, next) => {
  //the id encoded in the url
  const placeId = req.params.pid;
  console.log("GET request in places");
  const place = Dummy_Places.find((p) => {
    return p.id === placeId;
  });

  if (!place) {
    //triger the error handler middleware
    throw new HttpError("Could not find a place for the provided id.", 404);
  }
  //sending a response in a json format
  res.json({ place }); // => {place:place}
};

const getPlacesByUserId = (req, res, next) => {
  const userId = req.params.uid;
  console.log(userId);
  console.log("GET request in places USERID");
  const userPlaces = Dummy_Places.filter((p) => {
    return p.creator === userId;
  });
  if (userPlaces.length === 0) {
    console.log("userPlaces.length === 0");

    next(
      new HttpError("Could not find a place for the provided user id.", 404)
    ); //will reach the next error middleware in line
  } else {
    res.json({ userPlaces });
  }
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
