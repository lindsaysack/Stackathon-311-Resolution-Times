var width = 500;
var height = 75;
var svgw = 20;
var svgh = 20;

d3.tsv("nyc.stats.tsv", function(data) {
        legendVals = d3.set(data.map( function(d) { return d.borough } ) ).values()
        
        console.log(legendVals)
        
        var legendVals1 = d3.scale.ordinal()
            .domain(legendVals)
            .range(["#1F77B4", "#FF7F0E", "#2CA02C"]);
        
        var legendVals2 = ["Brooklyn", "Queens", "Manhattan", "Staten Island","Bronx"]
        var color = d3.scale.category10()
        
        var svgLegned3 = d3.select(".legend3").append("svg")
            .attr("width", width).attr("height", height)
            
        //D3 Vertical Legend//////////////////////////
        var legend3 = svgLegned3.selectAll('.legend3')
            .data(legendVals1.domain())
            .enter().append('g')
            .attr("class", "legends3")
            .attr("transform", function (d, i) {
            {
                return "translate(0," + i * 20 + ")"
            }
        })
        
        legend3.append('rect')
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", 10)
            .attr("height", 10)
            .style("fill", function (d, i) {
            return color(i)
        })
        
        legend3.append('text')
            .attr("x", 20)
            .attr("y", 10)
        //.attr("dy", ".35em")
        .text(function (d, i) {
            return d
        })
            .attr("class", "textselected")
            .style("text-anchor", "start")
            .style("font-size", 15)
        

var rlegend = d3.edge.reuselegend()
//.datum must be used and not data...data will only return the first item
d3.select(".legend7").datum(legendVals).call(rlegend)

})


// // d3.legend.js 
// // (C) 2012 ziggy.jonsson.nyc@gmail.com
// // MIT licence

// function() {
//     d3.legend = function(g) {
//       g.each(function() {
//         var g= d3.select(this),
//             items = {},
//             svg = d3.select(g.property("nearestViewportElement")),
//             legendPadding = g.attr("data-style-padding") || 5,
//             lb = g.selectAll(".legend-box").data([true]),
//             li = g.selectAll(".legend-items").data([true])
    
//         lb.enter().append("rect").classed("legend-box",true)
//         li.enter().append("g").classed("legend-items",true)
    
//         svg.selectAll("[data-legend]").each(function() {
//             var self = d3.select(this)
//             items[self.attr("data-legend")] = {
//               pos : self.attr("data-legend-pos") || this.getBBox().y,
//               color : self.attr("data-legend-color") != undefined ? self.attr("data-legend-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke") 
//             }
//           })
    
//         items = d3.entries(items).sort(function(a,b) { return a.value.pos-b.value.pos})
    
        
//         li.selectAll("text")
//             .data(items,function(d) { return d.key})
//             .call(function(d) { d.enter().append("text")})
//             .call(function(d) { d.exit().remove()})
//             .attr("y",function(d,i) { return i+"em"})
//             .attr("x","1em")
//             .text(function(d) { ;return d.key})
        
//         li.selectAll("circle")
//             .data(items,function(d) { return d.key})
//             .call(function(d) { d.enter().append("circle")})
//             .call(function(d) { d.exit().remove()})
//             .attr("cy",function(d,i) { return i-0.25+"em"})
//             .attr("cx",0)
//             .attr("r","0.4em")
//             .style("fill",function(d) { console.log(d.value.color);return d.value.color})  
        
//         // Reposition and resize the box
//         var lbbox = li[0][0].getBBox()  
//         lb.attr("x",(lbbox.x-legendPadding))
//             .attr("y",(lbbox.y-legendPadding))
//             .attr("height",(lbbox.height+2*legendPadding))
//             .attr("width",(lbbox.width+2*legendPadding))
//       })
//       return g
//     }
//     }
    