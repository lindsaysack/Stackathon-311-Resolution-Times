/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// //code to use when ready to parse actual data. this calculates the time to resolve each issue in a row in the dataset and sets the time to the 'value for that date'
var svg = d3.select("#chart"),
  width = +svg.attr("width"),
  height = +svg.attr("height");
var div = d3
  .select("body")
  .append("div")
  .attr("class", "tooltip")
  .style("opacity", 0);
// var format = d3.format(",d");
var color = d3.scaleOrdinal(d3.schemeCategory10);

var pack = d3
  .pack()
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
      .on("mouseout", handleMouseOut);
      
    node
      .append("circle")
      .attr("borough", function(d) {
        return d.borough;
      })
      .transition()
      .delay(100)
      .attr("r", function(d) {
        return d.r;
      })
      .style("opacity", 1.0)
      .style("fill", function(d) {
        return color(d.borough);
      });

    node
      .append("clipPath")
      .attr("id", function(d) {
        return "clip-" + d.data["Descriptor"];
      })
      .append("use")
      .attr("href", function(d) {
        return "#" + d.data["Descriptor"];
      });

    node
    .append("text")
    .attr("clip-path", function(d) {
      return "url(#clip-" + d.data["Descriptor"] + ")";
    })
    .selectAll("tspan")
      .data(function(d) {
        return d.data["Descriptor"].split(/(?=[A-Z][^A-Z])/g);
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
  }
);

function handleMouseOver(d, i) {
  // Add interactivity
  d3.select(this).style("opacity", 0.25);
  // Use D3 to select element, change color and size
  d3.select(this)
    .select("circle")
    // .style("opacity", 0)
    .attr("r", function() {
      // d.r = d.r * 2
      return d.r * 1.2;
    });
  div
    .transition()
    .duration(200)
    .style("opacity", 0.9);
  div
    .text("Complaint Resolution Time: " + d.data.durationText)
    .style("left", d3.event.pageX + "px")
    .style("top", d3.event.pageY - 28 + "px");
}

function handleMouseOut(d, i) {
  // Use D3 to select element, change color back to normal
  d3.select(this).style("opacity", 1);

  d3.select(this)
    .select("circle")
    // .style("opacity", 1)
    .attr("fill", "black")
    .attr("r", function() {
      return d.r;
    });

  div
    .transition()
    .duration(500)
    .style("opacity", 0);
  // Select text by id and then remove
  // d3.select("#t" + d.x + "-" + d.y + "-" + i).remove(); // Remove text location
}


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map