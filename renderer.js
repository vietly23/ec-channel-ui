// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var d3  = require("d3");
var data = require('./mydata.json');

/*var canvas = d3.select("body").append("svg")
  .attr("width", 500)
  .attr("height", 500)

canvas.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("width", function(d){return d.count*10;})
  .attr("height",48)
  .attr("y", function(d, i) {return i*50;})
  .attr("fill", "blue")*/

  var width = 500;
  var height = 500;
  var radius = Math.min(width, height) / 2;
  var donutWidth = 75;                            // NEW
  var color = d3.scaleOrdinal(d3.schemeCategory20b);
  var svg = d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + (width / 2) +
      ',' + (height / 2) + ')');
  var arc = d3.arc()
    .innerRadius(radius - donutWidth)             // UPDATED
    .outerRadius(radius);
  var pie = d3.pie()
    .value(function(d) { return d.count; })
    .sort(null);
  var path = svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d, i) {
      return color(d.data.label);
    });




/*var dataset = [
        { label: 'Abulia', count: 10 },
        { label: 'Betelgeuse', count: 20 },
        { label: 'Cantaloupe', count: 30 },
        { label: 'Dijkstra', count: 40 }
      ];
      var width = 500;
      var height = 500;
      var radius = Math.min(width, height) / 2;
      var donutWidth = 75;                            // NEW
      var color = d3.scaleOrdinal(d3.schemeCategory20b);
      var svg = d3.select('#chart')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' + (width / 2) +
          ',' + (height / 2) + ')');
      var arc = d3.arc()
        .innerRadius(radius - donutWidth)             // UPDATED
        .outerRadius(radius);
      var pie = d3.pie()
        .value(function(d) { return d.count; })
        .sort(null);
      var path = svg.selectAll('path')
        .data(pie(dataset))
        .enter()
        .append('path')
        .attr('d', arc)
        .attr('fill', function(d, i) {
          return color(d.data.label);
        });*/
