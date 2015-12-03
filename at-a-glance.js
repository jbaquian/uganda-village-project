d3.json('gho-data.json', function(error, data) {
	var xScale;
	var yScale;

	console.log("data", data)

	//process given data into usable format
	data = [
		data[7]
	]
	var seriesData = data.map(function (line) {
		return {
			values: d3.entries(line).filter(function(d) {
				return d.key != 'description'
			})
		}
	})

	console.log("seriesdata", seriesData)

	var svg = d3.select('#vis')
		.append('svg')
		.attr('height', 800)
		.attr('width', 800)

		//margin
		var margin = {
			left: 100,
			bottom: 100,
			top:50,
			right:50
		}

		//chart height and width
		var height = 800 - margin.bottom - margin.top
		var width = 800 - margin.left - margin.right

		//positions the g element so it doesn't overlap the scales
		var g = svg.append('g')
			.attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')')
			.attr('height', height)
			.attr('width', width)

		//sets the scales
		var setScales = function(seriesData){
			//xScale
			xScale = d3.scale.linear()
				.domain([2002, 2015])
				.range([0, width])

			//yScale
		    yScale = d3.scale.linear()
			    .domain([
			      d3.min(seriesData, function (c) { 
			        return d3.min(c.values, function (d) { return d.value })
			      }),
			      d3.max(seriesData, function (c) { 
			        return d3.max(c.values, function (d) { return d.value })
			      })
			    ])
		    	.range([height, 0])
		}
		setScales(seriesData)

		// Define x axis using d3.svg.axis(), assigning the scale as the xScale
		var xAxis = d3.svg.axis()
					.scale(xScale)
					.orient('bottom')
					.tickFormat(d3.format("d"))

		// Define y axis using d3.svg.axis(), assigning the scale as the yScale
		var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient('left')

		// Append x axis to your SVG, specifying the 'transform' attribute to position it
		svg.append('g').call(xAxis)
			.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
			.attr('class', 'axis')
		
		// Append y axis to your SVG, specifying the 'transform' attribute to position it
		svg.append('g')
			.attr('class', 'axis').call(yAxis)
			.attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')

		// Add a title g for the y axis
		svg.append('text')
			.attr('transform', 'translate(' + (margin.left - 80) + ',' + (margin.top + height - height / 6) + ') rotate(-90)')
			.attr('class', 'title')
			.text(data[0].description)

		//draws the lines on the chart
		var draw = function(seriesData) {
			setScales(seriesData)
			var line = d3.svg.line()
	          .interpolate("cardinal")
	          .x(function (d) { return xScale(d.key) })
	          .y(function (d) { return yScale(d.value) })

			var series = svg.selectAll(".series")
			    .data(seriesData)
			  	.enter().append("g")
			    	.attr("class", "series")
			    	.attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')')
			    	.attr('height', height)
					.attr('width', width)


    		series.append("path")
				.attr("class", "line")
				.attr("d", function (d) { return line(d.values) })
				.style("stroke", "red")
				.style("stroke-width", "4px")
				.style("fill", "none")
		}

		//draw chart
		draw(seriesData)
})