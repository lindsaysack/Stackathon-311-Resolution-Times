const mapboxgl = require("mapbox-gl");
const api = require("./api");
const buildMarker = require("./marker.js");

api.fetchJson().then(jsonObj => {
  console.log(jsonObj);
});

/*
 * App State
 */

// const state = {
//   attractions: {},
//   selectedAttractions: []
// };

/*
  * Instantiate the Map
  */

// mapboxgl.accessToken = "YOUR API TOKEN HERE";

// const fullstackCoords = [-74.009, 40.705] // NY
// // const fullstackCoords = [-87.6320523, 41.8881084] // CHI

// const map = new mapboxgl.Map({
//   container: "map",
//   center: fullstackCoords,
//   zoom: 12, // starting zoom
//   style: "mapbox://styles/mapbox/streets-v10" // mapbox has lots of different map styles available.
// });

/*
  * Populate the list of attractions
  */

// api.fetchAttractions().then(attractions => {
//   state.attractions = attractions;
//   const { hotels, restaurants, activities } = attractions;
//   hotels.forEach(hotel => makeOption(hotel, "hotels-choices"));
//   restaurants.forEach(restaurant => makeOption(restaurant, "restaurants-choices"));
//   activities.forEach(activity => makeOption(activity, "activities-choices"));
// });

// const makeOption = (attraction, selector) => {
//   const option = new Option(attraction.name, attraction.id); // makes a new option tag
//   const select = document.getElementById(selector);
//   select.add(option);
// };

/*
  * Attach Event Listeners
  */

// what to do when the `+` button next to a `select` is clicked
// ["hotels", "restaurants", "activities"].forEach(attractionType => {
//   document
//     .getElementById(`${attractionType}-add`)
//     .addEventListener("click", () => handleAddAttraction(attractionType));
// });

// // Create attraction assets (itinerary item, delete button & marker)
// const handleAddAttraction = attractionType => {
//   const select = document.getElementById(`${attractionType}-choices`);
//   const selectedId = select.value;

//   // Find the correct attraction given the category and ID
//   const selectedAttraction = state.attractions[attractionType].find(
//     attraction => +attraction.id === +selectedId
//   );

//   // If this attraction is already on state, return
//   if (state.selectedAttractions.find(attraction => attraction.id === +selectedId && attraction.category === attractionType))
//     return;

//   //Build and add attraction
//   buildAttractionAssets(attractionType, selectedAttraction);
// };

// const buildAttractionAssets = (category, attraction) => {
//   // Create the Elements that will be inserted in the dom
//   const removeButton = document.createElement("button");
//   removeButton.className = "remove-btn";
//   removeButton.append("x");

//   const itineraryItem = document.createElement("li");
//   itineraryItem.className = "itinerary-item";
//   itineraryItem.append(attraction.name, removeButton);

//   // Create the marker
//   const marker = buildMarker(category, attraction.place.location);

//   // Adds the attraction to the application state
//   state.selectedAttractions.push({ id: attraction.id, category });

//   //ADD TO DOM
//   document.getElementById(`${category}-list`).append(itineraryItem);
//   marker.addTo(map);

//   // Animate the map
//   map.flyTo({ center: attraction.place.location, zoom: 15 });

//   removeButton.addEventListener("click", function remove() {
//     // Stop listening for the event
//     removeButton.removeEventListener("click", remove);

//     // Remove the current attrction from the application state
//     state.selectedAttractions = state.selectedAttractions.filter(
//       selected => selected.id !== attraction.id || selected.category !== category
//     );

//     // Remove attraction's elements from the dom & Map
//     itineraryItem.remove();
//     marker.remove();

//     console.log(state);

//     // Animate map to default position & zoom.
//     map.flyTo({ center: fullstackCoords, zoom: 12.3 });
//   });
// };
// function groupBy(objectArray, property) {
//   return objectArray.reduce(function(acc, obj) {
//     let key = obj[property];
//     if (!acc[key]) {
//       acc[key] = [];
//     }
//     acc[key].push(obj)
//     return acc
//   }, {})
// }

// let groupsByBorough = groupBy(jsonObj, 'Borough');
// let queensComplaints = groupsByBorough.QUEENS
// let brooklynComplaints = groupsByBorough.BROOKLYN
// let statenIslandComplaints = groupsByBorough["STATEN ISLAND"]
// let bronxComplaints = groupsByBorough.BRONX
// let manhattanComplaints = groupsByBorough.MANHATTAN
// console.log(manhattanComplaints)
// let groupsByComplaint = groupBy(groupsByBorough, 'Descriptor')
/**
 * [
 * 	{a:"1", b:"2", c:"3"},
 * 	{a:"4", b:"5". c:"6"}
 * ]
 */

var svg = d3.select("svg"),
  width = +svg.attr("width"),
  height = +svg.attr("height");

var format = d3.format(",d");

var color = d3.scaleOrdinal(d3.schemeCategory20c);

var pack = d3
  .pack()
  .size([width, height])
  .padding(1.5);

//code to use when ready to parse actual data. this calculates the time to resolve each issue in a row in the dataset and sets the time to the 'value for that date'
d3.csv(
  "311_Service_Requests_from_2010_to_Present.csv",
  function(d) {
    let createdDate = new Date(d["Created Date"]);
    let closedDate = new Date(d["Closed Date"]);
    let resolutionTime = closedDate - createdDate;

    d.value = resolutionTime;
    //convert the milliseconds elapsed between issue open/close into string with days and minutes
    function msToTime(duration) {
      var minutes = parseInt((duration / (1000 * 60)) % 60),
        hours = parseInt((duration / (1000 * 60 * 60)) % 24);

      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      return hours + " hour(s) " + minutes + " minutes";
    }

    d.durationText = msToTime(resolutionTime);

    if (d.value) return d;
  },
  function(error, classes) {
    if (error) throw error;

    var root = d3
      .hierarchy({ children: classes })
      .sum(function(d) {
        return d.value;
      })
      .each(function(d) {
        if ((Descriptor = d.data["Descriptor"])) {
          d.descriptor = d.data["Descriptor"];
        }
      });

    var node = svg
      .selectAll(".node")
      .data(pack(root).leaves())
      .enter()
      .append("g")
      .attr("class", "node inactive")
      .attr("transform", function(d) {
        return "translate(" + d.x + "," + d.y + ")";
      })
      .on("mouseover", handleMouseOver 
        // function() {
        // console.log("DATA", d3.select(this));
        // d3.select(this).attr("class", "active");}
    )
      .on("mouseout", handleMouseOut 
      // function() {
        // d3.select(this).attr("class", "inactive");}
      );

    node
      .append("circle")
      .attr("descriptor", function(d) {
        return d.descriptor;
      })
      .attr("r", function(d) {
        return d.r;
      })
      .style("opacity", 1.0)
      //d.descriptor is the description of the type of complaint, all complaints with the same descriptor will have the same color
      .style("fill", function(d) {
        return color(d.descriptor);
      });

    node
      .append("clipPath")
      .attr("id", function(d) {
        return "clip-" + d.descriptor;
      })
      .append("use")
      .attr("href", function(d) {
        return "#" + d.descriptor;
      });

    node
      .append("text")
      .attr("clip-path", function(d) {
        return "url(#clip-" + d.descriptor + ")";
      })
      .selectAll("tspan")
      .data(function(d) {
        return d.descriptor.split(/(?=[A-Z][^A-Z])/g);
      })
      .enter()
      .append("tspan")
      .attr("x", 0)
      .attr("y", function(d, i, nodes) {
        return 13 + (i - nodes.length / 2 - 0.5) * 10;
      })
      .text(function(d) {
        return d;
      });

    node
      .append("div")
      .attr("class", "tooltip")
      .text(function(d) {
        //adds pop up for duration when hovering over bubble
        return d.data["Borough"] + "\n" + d.data.durationText;
      })
      .style("opacity", 0);
  }
);

function handleMouseOver(d, i) {
  // Add interactivity
  d3.select(this)
  .style("opacity", 0)
  // Use D3 to select element, change color and size
  d3.select(this).select("circle")
  // .style("opacity", 0)
    .attr("r", function() {
      // d.r = d.r * 2
      return d.r * 1.2
    })

  // Specify where to put label of text
  // svg
  //   .append("text")
  //   .attr({
  //     id: "t" + d.x + "-" + d.y + "-" + i, // Create an id for text so we can select it later for removing on mouseout
  //     x: function() {
  //       return xScale(d.x) - 30;
  //     },
  //     y: function() {
  //       return yScale(d.y) - 15;
  //     }
  //   })
  //   .text(function() {
  //     return d.data["Borough"] + "\n" + d.data.durationText; // Value of the text
  //   });
}

function handleMouseOut(d, i) {
  // Use D3 to select element, change color back to normal
  d3.select(this)
  .style("opacity", 1)

  d3.select(this).select("circle")
  // .style("opacity", 1)
  .attr("fill", "black")
  .attr("r", function() {
    return d.r  
  })
  // Select text by id and then remove
  // d3.select("#t" + d.x + "-" + d.y + "-" + i).remove(); // Remove text location
}
