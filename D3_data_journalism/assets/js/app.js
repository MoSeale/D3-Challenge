
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from data.csv
d3.csv("assets/data/data.csv").then(function(healthData) {

  // Print the healthData
  console.log(healthData);

  // Cast the hours value to a number for each piece of healthData
  healthData.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
    //console.log(data.poverty)
    //console.log(data.healthcare)
  });

    //scale functions
    var xLinearScale = d3.scaleLinear()
    .domain([8, d3.max(healthData, d => d.poverty)])
    .range([0, chartWidth]);

    var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(healthData, d => d.healthcare)+2])
    .range([chartHeight, 0]);

    //create axis functions
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
    //append axes to the chart
    chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);

    chartGroup.append("g")
    .call(leftAxis);



  
//   var barSpacing = 10; // desired space between each bar
//   var scaleY = 10; // 10x scale on rect height

//   // Create a 'scatterWidth' variable so that the bar chart spans the entire chartWidth.
//   var barWidth = (chartWidth - (barSpacing * (healthData.length - 1))) / healthData.length;


//  Create code to build the scatter chart using the healthData.
  chartGroup.selectAll("circle")
    .data(healthData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.healthcare))
    .attr("r", 20)
    .attr("fill", "lightblue")
    .attr("opacity", ".75")


   // event listener for onclick event
    .on("click", function(d) {
        alert(`(${d.poverty}, ${d.healthcare})`);
      })
      // event listener for mouseover
      .on("mouseover", function() {
        d3.select(this)
              .attr("fill", "red");
      })
      // event listener for mouseout
      .on("mouseout", function() {
        d3.select(this)
              .attr("fill", "lightblue");
      });

          //append state abbreviation to circle
    chartGroup.selectAll(".stateText")
    .data(healthData)
    .enter()
    .append('text')
    .attr("x", d => xLinearScale(d.poverty) - 4)
    .attr("y", d => yLinearScale(d.healthcare) + 2)
    .attr("fill", "black")
    .attr("font-size", "10")
    .text(d => d.abbr)

      
      



}).catch(function(error) {
  
    console.log(error);
})
