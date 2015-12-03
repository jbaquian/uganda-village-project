d3.json('gho-data.json', function(error, data) {
	var labelVar = 'description'
	var varNames = d3.keys(data[3])
		.filter(function (key) {return key !== labelVar})

		console.log("varnames", varNames)
	//color.domain(varNames)

	var seriesData = data.map(function (line) {
		return {
			values: d3.entries(line)
		}
	})
	// var seriesData = varNames.map(function (name) {
	// 	return {
	// 		name: name,
	// 		values: data.map(function (d) {
	// 			return {name: name, label: d[labelVar], value: +d[name]}
	// 		})
	// 	}
	// })

	console.log("seriesdata", seriesData)



	var svg = d3.select('#vis')
		.append('svg')
		.attr('height', 400)
		.attr('width', 400)

		//margin
		var margin = {
			left: 70,
			bottom: 100,
			top:50,
			right:50
		}

		//chart height and width
		var height = 400 - margin.bottom - margin.top
		var width = 400 - margin.left - margin.right

		//positions the g element so it doesn't overlap the scales
		var g = svg.append('g')
			.attr('transform', 'translate(' +  margin.left + ',' + margin.top + ')')
			.attr('height', height)
			.attr('width', width)

		//sets the scales
		// var setScales = function(seriesData){
			//xScale
			var x = d3.scale.ordinal()
				.rangeRoundBands([0, width], .1)

			//yScale
			// var min = d3.min(seriesData, function (c) { 
		 //      return d3.min(c.values, function (d) { return d.value })
		 //    })
		 //    var max = d3.max(seriesData, function (c) { 
		 //      return d3.max(c.values, function (d) { return d.value })
		 //    })
		    // console.log(min)
		    // console.log(max)

		    var y = d3.scale.linear()
		    	.rangeRound([height, 0])

	    	x.domain(data.map(function (d) { return d.quarter; }));
	        y.domain([
	          d3.min(seriesData, function (c) { 
	            return d3.min(c.values, function (d) { return d.value; });
	          }),
	          d3.max(seriesData, function (c) { 
	            return d3.max(c.values, function (d) { return d.value; });
	          })
	        ]);

			// var yScale = d3.scale.linear()
			// 	.domain([min, max / 1000])
			// 	.range([0, height])
		// }
		// setScales(seriesData)

		var line = d3.svg.line()
          .interpolate("cardinal")
          .x(function (d) { return x(d.label) + x.rangeBand() / 2; })
          .y(function (d) { return y(d.value); })

		var series = svg.selectAll(".series")
		    .data(seriesData)
		  .enter().append("g")
		    .attr("class", "series");

		series.append("path")
		  .attr("class", "line")
		  .attr("d", function (d) { return line(d.values); })
		  .style("stroke", "red")
		  .style("stroke-width", "4px")
		  .style("fill", "none");



		// //positions the lines
		// var setLines = function(line) {
		// 	line.attr("d", function (d) { return d.values })
		// 		.attr("stroke", '#008080')
		// 		.attr("stroke-width", "4px")
		// 		.attr("fill", "none");
		// }

		// //draws the lines on the chart
		// var draw = function(seriesData) {
		// 	setScales(seriesData)

		// 	var lines = g.selectAll('path')
		// 		.data(seriesData)
		// 		.enter()
		// 		.append('path')
		// 		.call(setLines)
		// }
		// draw(seriesData)
})
