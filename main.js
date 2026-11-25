var width = 500;
var height = 500;

var width2 = 900;
width = width2;

var svg = d3.select('svg');

var padding = { t: 60, r: 40, b: 30, l: 100 };

var parseYear = d3.timeParse("%Y");

// Compute chart dimensions - from lab 5
var barChartWidth = width2 - padding.l - padding.r;
var chartHeight = height - padding.t - padding.b;

d3.csv("data/tcl_blue_cotton_peach.csv", function(csv) {
    // loop though all of the columns
    for (var i = 0; i < csv.length; ++i) {
        csv[i]["Domain"] = String(csv[i]["Domain"])
        csv[i]["Area"] = String(csv[i]["Area"])
        csv[i]["Element"] = String(csv[i]["Element"])
        csv[i]["Item"] = String(csv[i]["Item"])
        csv[i]["Year"] = parseYear(csv[i]["Year"]);
        csv[i]["Value"] = Number(csv[i]["Value"])
    }

    console.log(csv)
    var yearExtent = d3.extent(csv, function(row) {
        return row["Year"]
    })
    var valueExtent = d3.extent(csv, function(row) {
        return row["Value"]
    })

    var itemNames = csv.map(d => d.Item)

    // Axis setup from Project 5
    var xScale = d3.scaleBand().domain(itemNames).range([0, barChartWidth]);
    var yScale = d3.scaleTime()
        .domain(yearExtent)
        .range([chartHeight, 30]);

    // var xScale2 = d3.scaleLinear().domain([0, proteinExtent[1]]).range([50, 470]);
    // var yScale2 = d3.scaleLinear().domain(carbExtent).range([470, 30]);

    var xAxis = d3.axisBottom().scale(xScale);
    var yAxis = d3.axisLeft()
        .scale(yScale)
        .ticks(d3.timeYear.every(1))
        .tickFormat(d3.timeFormat("%Y"));

    // var xAxis2 = d3.axisBottom().scale(xScale2);
    // var yAxis2 = d3.axisLeft().scale(yScale2);

    var tempChart = d3
        .select("#temp-chart")
        .append("svg:svg")
        .attr("id", "t-svg")
        .attr("width", width)
        .attr("height", height);
    
    d3.select("#t-svg")
        .append("text")
        .attr("x", width / 2)
        .attr("y", height)
        .attr("font-size", "12px")
        .text("Value")
        .style("font-weight", "bold");

    d3.select("#t-svg")
        .append("text")
        .attr("x", -width / 4)
        .attr("y", 20)
        .attr("font-size", "12px")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .text("Year")
        .style("font-weight", "bold");

    tempChart
        .append("g")
        .attr("transform", "translate(50," + (height - 90) + ")")
        .call(xAxis)
        .append("text")
        .attr("class", "label")
        .attr("x", width - 16)
        .attr("y", -6)
        .style("text-anchor", "end")
    
    tempChart
        .append("g")
        .attr("transform", "translate(50, 0)")
        .call(yAxis)
        .append("text")
        .attr("class", "label")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", ".71em")
        .style("text-anchor", "end")

})