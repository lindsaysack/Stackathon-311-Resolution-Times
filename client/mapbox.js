// const mapboxgl = require("mapbox-gl");

// mapboxgl.accessToken = 'pk.eyJ1IjoibGluZHNheXNhY2siLCJhIjoiY2ppaGg5M2d4MTk2ZDNrcG4wZ3oxeDR5NiJ9.4m8msM6Dtuu3VV6kQ4V4YQ';

// /*
//   * Instantiate the Map
//   */

// const map = new mapboxgl.Map({
//   container: "map",
//   center: [-74.009, 40.705], // FullStack NY coordinates; alternatively, use [-87.6354, 41.8885] for Chicago
//   zoom: 12, // starting zoom
//   style: 'mapbox://styles/mapbox/light-v9' // mapbox has lots of different map styles available.
// });


/*
 * App State
 */

// const state = {
//   attractions: {},
//   selectedAttractions: []
// };

mapboxgl.accessToken = 'pk.eyJ1IjoibGluZHNheXNhY2siLCJhIjoiY2ppaGg5M2d4MTk2ZDNrcG4wZ3oxeDR5NiJ9.4m8msM6Dtuu3VV6kQ4V4YQ';

/*
  * Instantiate the Map
  */

const map = new mapboxgl.Map({
  container: "map",
  center: [-74.009, 40.705], // FullStack NY coordinates; alternatively, use [-87.6354, 41.8885] for Chicago
  zoom: 12, // starting zoom
  style: 'mapbox://styles/mapbox/light-v9' // mapbox has lots of different map styles available.
});





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

// var svg = d3.select("svg"),
//   width = +svg.attr("width"),
//   height = +svg.attr("height");

// var format = d3.format(",d");

// var color = d3.scaleOrdinal(d3.schemeCategory20c);

// var pack = d3
//   .pack()
//   .size([width, height])
//   .padding(1.5);

