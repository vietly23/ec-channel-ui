// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const d3  = require("d3");
var data = require('./mydata.json');
const exec = require('child_process').exec;
const execSync = require('child_process').execSync;


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


//comparison donut graph - curerntly there is an issue of how to move it
//to the right side
    var cWidth = 500;
    var cHeight = 500;
    var cRadius = Math.min(cWidth, cHeight) / 2;
    var cDonutWidth = 75;                            // NEW
    var cColor = d3.scaleOrdinal(d3.schemeCategory20b);
    var cSvg = d3.select('#chart')
      .append('svg')
      .attr('width', cWidth)
      .attr('height', cHeight)
      .append('g')
      .attr('transform', 'translate(' + (cWidth*4/1.75) +
        ',' + (cHeight*4 / 8) + ')');
    var cArc = d3.arc()
      .innerRadius(cRadius - cDonutWidth)             // UPDATED
      .outerRadius(cRadius);
    var cPie = d3.pie()
      .value(function(d) { return d.count; })
      .sort(null);
    var cPath = cSvg.selectAll('path')
      .data(cPie(data))
      .enter()
      .append('path')
      .attr('d', cArc)
      .attr('fill', function(d, i) {
        return cColor(d.data.label);
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

var HttpClient = function() {
	this.get = function(aUrl, aCallback) {
		var anHttpRequest = new XMLHttpRequest();
		anHttpRequest.onreadystatechange = function() {
			if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
				aCallback(anHttpRequest.responseText);
		}
		anHttpRequest.open( "GET", aUrl, true );
		anHttpRequest.send( null );
	}
}

function updateClock() {
    var now = new Date();
    var time_options = {hour: 'numeric', minute: 'numeric'};
    var time_format = new Intl.DateTimeFormat('en-US', time_options)
    var date_options = {month: 'short', day: 'numeric', weekday: 'short'};
    var date_format = new Intl.DateTimeFormat('en-US', date_options);
    // set the content of the element with the ID time to the formatted string
    document.getElementById('clock').innerHTML = time_format.format(now);
    document.getElementById('date').innerHTML = date_format.format(now).replace(",","");
}

function getWeather() {
	var WEATHER_URL = 'http://api.wunderground.com/api/';
	var WEATHER_KEY = '845b12ce9e363cea';
	var url = `${WEATHER_URL}/${WEATHER_KEY}/conditions/q/autoip.json`;
	var weather_client = new HttpClient();
	weather_client.get(url, changeWeather);
}

function changeWeather(text) {
	var json_response = JSON.parse(text);
	document.getElementById('temp').innerHTML = json_response.current_observation.temp_f;
	document.getElementById('weather_icon').src = json_response.current_observation.icon_url;
	//document.getElementById('location').innerHTML = json_response['location'].city;
	document.getElementById('city').innerHTML = json_response.current_observation.display_location.city;
}

function getDemand() {
	exec('python python/get_data.py', (error, stdout, stderr) => { 
		if (error) {
			console.log(error);
			return;
		}
		document.getElementById('power_demand_value').innerHTML = stdout;
	});
}

function connectWifi(wifi_name, password) {
	var template = fs.readFileSync("wifi-template.xml",encoding="utf-8");
    var hex = "";
    for (var i = 0; i < wifi_name.length; i++)
         hex += wifi_name.charCodeAt(i).toString(16);
    template = template.replace("{hex}", hex);
		template = template.replace("{network}", wifi_name);
		template = template.replace("{password}", password);
		fs.writeFileSync("EC-Profile.xml", template);
    execSync("netsh wlan add profile EC-Profile.xml");
    execSync("netsh wlan connect " + wifi_name);
    return true;
}

function getWifi() {
	/* Parses Powershell output to produce an array of objects.
	 * Contains attributes such as ssid, signal_strength, etc.
	*/
	var wifi_list = execSync("netsh wlan show networks mode=bssid").toString('utf-8').split('\r\n\r\n');
	wifi_list.shift();
    wifi_list.pop();
    var wifi_objects = [];
    for (j = 0; j < wifi_list.length; j++) {
        try {
            wifi_objects.push(wifi_parse(wifi_list[j]));
        }
        catch (e) {
            continue;
        }
    }
    return wifi_objects;
}

function wifiParse(wifi_string) {
	var wifi_attr = wifi_string.split('\r\n');
	var wifi_object = {ssid:wifi_attr[0].split(':')[1].trim()};
	for (i = 1; i < wifi_attr.length; i++) {
		var pair = wifi_attr[i].split(':');
        var key = pair[0].trim().toLowerCase().replace(' ','_');
        var value = pair[1].trim();
        if (key === 'signal')
            value = parseInt(value.substr(0,3));
        if (key === 'channel')
            value = parseInt(value.substr(0,3));
		wifi_object[key] = value;
	}
	return wifi_object;
}

setInterval(updateClock,1000); //1 second update interval
getWeather();
setInterval(getWeather, 5 * 60 * 1000); //5 minute update interval
getDemand();
setInterval(getDemand,5000);
