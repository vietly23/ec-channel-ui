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

function connect_wifi(wifi_name, password) {
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

function get_wifi() {
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

function wifi_parse(wifi_string) {
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

