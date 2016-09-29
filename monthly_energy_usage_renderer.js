// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var d3  = require("d3");
//var data = require('./usageData.csv');
//var dataset = require('./monthlyEnergyUsage.csv');
var dataset = require('./monthlyEnergyUsage.json');
//Width and height
			var w = window.outerWidth/1.5;
			var h = window.outerHeight/1.25;
			var barPadding = 25;

      //index position corresponds to a specific month - Data array size max 12
			//value between 1-15 kW
			//var dataset = [1, 5, 10, 8, 2, 13, 12, 3, 6, 10, 11, 9 ];

			//d3.csv("monthlyEnergyUsage.csv", function(error, dataset){
				//if(error) throw error;


			console.log(dataset)

			var x = d3.scaleBand()
				.range([0,w])
				.padding(.1); //padding between data bars and the y axis

			x.domain(dataset.map(function(d) {return d.month;}));

			var yScale = d3.scaleLinear()
									.domain([0,15])
									.range([h , 100]);


			//Create SVG element
			var svg = d3.select("body")
						.append("svg")
						.attr("width", w+150)
						.attr("height", h+150)
						.append("g")
							.attr("transform", "translate(" + 25 + "," + 0 + ")");

			svg.selectAll("rect")
			   .data(dataset)
			   .enter()
			   .append("rect")
				 		//.attr("rx", 100)
						.attr("ry", 35)
			   .attr("x", function(d) {return x(d.month);})

			   .attr("y", function(d) {
			   		return yScale(d.value);
			   })

			   .attr("width", w / dataset.length - barPadding)
			   .attr("height", function(d) {
			   		return h-yScale(d.value); })

				 //change colors of bars based on their value
			   .attr("fill", function(d) {
					 if( d.value >= 0 && d.value < 5){
					 	return "blue"
					 }
					 else if( d.value >= 5 && d.value < 10)
					 {
						 return "green"
					 }
					 else if ( d.value >= 10 && d.value < 15 )
					 {
						 return "orange"
					 }
					 else if ( d.value>=15)
					 {
						 return "red"
					 }
					 /*else{
						 return "rgb(0, 0, " + (d * 10) + ")";
					 }*/
			   });

				 svg.selectAll("rect2")
						.data(dataset)
						.enter()
						.append("rect")
							 //.attr("rx", 100)

						.attr("x", function(d) {return x(d.month);})

						.attr("y", function(d) {
								console.log(d.value);
							 return d.value > 0 ? yScale(d.value/2) : 0;
						})

						.attr("width", w / dataset.length - barPadding)
						.attr("height", function(d) {
							console.log(d.value);
							 return d.value > 0 ? h-yScale(d.value/2) : 0 })

						//change colors of bars based on their value
						.attr("fill", function(d) {
							if( d.value >= 0 && d.value < 5){
							 return "blue"
							}
							else if( d.value >= 5 && d.value < 10)
							{
								return "green"
							}
							else if ( d.value >= 10 && d.value < 15 )
							{
								return "orange"
							}
							else if ( d.value>=15)
							{
								return "red"
							}

						});

				 svg.append("g")
				 	//.attr("transform", "translate(" + w +"," + h + ")")
				 	.call(d3.axisLeft(yScale));

					svg.append("g")
						.attr("transform", "translate(0," + h + ")")
						.call(d3.axisBottom(x));





//});

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
