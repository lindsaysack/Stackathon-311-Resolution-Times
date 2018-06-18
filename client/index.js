const mapboxgl = require("mapbox-gl");
const api = require("./api");
const buildMarker = require("./marker.js");

// api.fetchJson().then(jsonObj => {
//   console.log(jsonObj);
// });


// //code to use when ready to parse actual data. this calculates the time to resolve each issue in a row in the dataset and sets the time to the 'value for that date'
var svg = d3.select("svg"),
width = +svg.attr("width"),
height = +svg.attr("height");
var div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);
var format = d3.format(",d");
var color = d3.scaleOrdinal(d3.schemeCategory10);
var pack = d3.pack()
.size([width, height])
.padding(1.5);
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
        // if ((Borough = d.data["Borough"])) {
          d.borough = d.data["Borough"];
        // }
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
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)

    node
      .append("circle")
      .attr("borough", function(d) {
        return d.borough;
      })
      .attr("data-legend",function(d) { return d.borough})
      .attr("r", function(d) {
        return d.r;
      })
      .style("opacity", 1.0)
      .style("fill", function(d) {
        return color(d.borough);
      });

      legend = svg.append("g")
      .attr("class","legend")
      .attr("transform","translate(50,30)")
      .style("font-size","12px")
      .call(d3.legend)


    // node
    //   .append("clipPath")
    //   .attr("id", function(d) {
    //     return "clip-" + d.borough;
    //   })
    //   .append("use")
    //   .attr("href", function(d) {
    //     return "#" + d.borough;
    //   });

    // node
    //   .append("text")
    //   .attr("clip-path", function(d) {
    //     return "url(#clip-" + d.borough + ")";
    //   })
    //   .selectAll("tspan")
    //   .data(function(d) {
    //     return d.borough.split(/(?=[A-Z][^A-Z])/g);
    //   })
    //   .enter()
    //   .append("tspan")
    //   .attr("x", 0)
    //   .attr("y", function(d, i, nodes) {
    //     return 13 + (i - nodes.length / 2 - 0.5) * 10;
    //   })
    //   .text(function(d) {
    //     console.log(d)
    //     return d;
    //   });

    // node
    //   .append("div")
    //   .attr("class", "tooltip")
    //   .text(function(d) {
    //     //adds pop up for duration when hovering over bubble
    //     return d.data["Borough"] + "\n" + d.data.durationText;
    //   })
    //   .style("opacity", .5);
  }
);

function handleMouseOver(d, i) {
  // Add interactivity
  d3.select(this)
  .style("opacity", .25)
  // Use D3 to select element, change color and size
  d3.select(this).select("circle")
  // .style("opacity", 0)
    .attr("r", function() {
      // d.r = d.r * 2
      return d.r * 1.2
    })
    div.transition()		
    .duration(200)		
    .style("opacity", .9);		
    div.text("Complaint Description: " + d.data["Descriptor"] + "\n" + "Time To Close Complaint: " + d.data.durationText)	
    .style("left", (d3.event.pageX) + "px")		
    .style("top", (d3.event.pageY - 28) + "px");	
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

  div.transition()		
  .duration(500)		
  .style("opacity", 0);	
  // Select text by id and then remove
  // d3.select("#t" + d.x + "-" + d.y + "-" + i).remove(); // Remove text location
}
