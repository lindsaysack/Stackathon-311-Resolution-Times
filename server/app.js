const express = require("express");
const volleyball = require("volleyball");
const bodyParser = require("body-parser");
const path = require("path");

const db = require("./models").db;

const app = express();
const csvFilePath = './public/311_Service_Requests_from_2010_to_Present.csv'
const csv = require('csvtojson');
csv()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    function groupBy(objectArray, property) {
      return objectArray.reduce(function(acc, obj) {
        let key = obj[property];
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(obj)
        return acc
      }, {})
    }
    let groupsByBorough = groupBy(jsonObj, 'Borough');
    let queensComplaints = groupsByBorough.QUEENS
    let brooklynComplaints = groupsByBorough.BROOKLYN
    let statenIslandComplaints = groupsByBorough["STATEN ISLAND"]
    let bronxComplaints = groupsByBorough.BRONX
    let manhattanComplaints = groupsByBorough.MANHATTAN
    
    


    // let groupsByComplaint = groupBy(groupsByBorough, 'Descriptor')
    /**
     * [
     * 	{a:"1", b:"2", c:"3"},
     * 	{a:"4", b:"5". c:"6"}
     * ]
     */
  });

// logging and body-parsing
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// serve dynamic routes
app.use("/api", require("./routes"));

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")));

// failed to catch req above means 404, forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// handle any errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err.message);
});

// listen on a port
const port = 3000;
app.listen(port, function() {
  console.log("The server is listening closely on port", port);
  db.sync()
    .then(function() {
      console.log("Synchronated the database");
    })
    .catch(function(err) {
      console.error("Trouble right here in River City", err, err.stack);
    });
});
