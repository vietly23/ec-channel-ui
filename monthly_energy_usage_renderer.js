// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var d3  = require("d3");
//var data = require('./usageData.csv');

//Width and height
			var w = 500;
			var h = 100;
			var barPadding = 1;

      //index position corresponds to a specific month - Data array size max 12
			//value between 1-15 kW
			var dataset = [1, 5, 10, 8, 2, 13, 12, 3, 6, 10, 11, 9 ];

			//Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w)
						.attr("height", h);

			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
			   .attr("x", function(d, i) {
			   		return i * (w / dataset.length);
			   })
			   .attr("y", function(d) {
			   		return h - (d * 4);
			   })
			   .attr("width", w / dataset.length - barPadding)
			   .attr("height", function(d) {
			   		return d * 4;
			   })
				 //change colors of bars based on their value
			   .attr("fill", function(d) {
					 if( d >= 0 && d < 5){
					 	return "blue"
					 }
					 else if( d >= 5 && d < 10)
					 {
						 return "green"
					 }
					 else if ( d >= 10 && d < 15 )
					 {
						 return "orange"
					 }
					 else if ( d>=15)
					 {
						 return "red"
					 }
					 /*else{
						 return "rgb(0, 0, " + (d * 10) + ")";
					 }*/
			   });
/*

var width = 400;
var height = 200;

var chart = d3.select('#chart-references').append('svg')
    .attr('class', 'chart')
    .attr('width', width)
    .attr('height', height);

var x = d3.scale.ordinal()
        .domain(d3.range(data.length))
        .rangeRoundBands([0, width], 0);

// Function to scale each bar relative to the max height of the chart.
var y = d3.scale.linear()
        .domain([0, 100])
        .range([0, chart.style('height')]);

// Add the horizontal lines in the background.
chart.selectAll('line')
        .data(y.ticks(4))
    .enter().append('line')
        .attr('x1', 0)
        .attr('x2', width)
        .attr('y1', y)
        .attr('y2', y)
        .style('stroke', '#999')
        .style('stroke-width', 1);

// Draw the actual bars themselves.
chart.selectAll('rect')
        .data(data)
    .enter().append('rect')
        .attr('x', function(d,i){ return x(d.label); })
        .attr('y', function(d,i){ return (height - parseInt(y(d.count))); })
        .attr('width', x.rangeBand())
        .attr('height', function(d,i){ return y(d.count); });*/




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
