//initiate firebase
var fire = new Firebase("https://ugandavillageproject.firebaseio.com/")

var uvpApp = angular.module('uvpApp', ['ui.router', 'firebase'])

//configure states and controllers
uvpApp.config(function($stateProvider) {
	$stateProvider
		.state('home', {
			url:'/',
			templateUrl: 'templates/home.html',
			controller: 'HomeController'
		})
		.state('about-us', {
			url: '/about-us',
			templateUrl: 'templates/about-us.html',
			controller: 'AboutController'
		})
		.state('our-mission', {
			url: '/our-mission',
			templateUrl: 'templates/our-mission.html',
			controller: 'MissionController'
		})
		.state('support-us', {
			url: '/support-us',
			templateUrl: 'templates/support-us.html',
			controller: 'SupportController'
		})
})

//instantiate controllers
uvpApp.controller('HomeController', function($scope) {

})

uvpApp.controller('AboutController', function($scope) {

})

uvpApp.controller('MissionController', function($scope) {

})

uvpApp.controller('SupportController', function($scope) {

})

//controller for d3 visualization
uvpApp.controller('d3', function($scope, $firebaseArray, $firebaseObject) {
	var ref = fire.child('gho-data')
	$scope.data = $firebaseArray(ref)
})

//line chart directive for d3 chart
.directive('lineChart', function($filter) {
	return {
		restrict:'E',

		//define scope variables
		scope:{
			data:'='
		},

		link:function(scope,elem,attrs){
			console.log('scope', scope.data)
			var xScale;
			var yScale;

			//process given data into usable format
			data = [
				scope.data
			]
			var seriesData = data.map(function (line) {
				return {
					values: d3.entries(line).filter(function(d) {
						return d.key != 'description'
					})
				}
			})

			//get wrapper element and append svg for chart
			var wrapper = d3.select(elem[0])
			var svg = wrapper
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
		}
	}
})

//directive for a leaflet map
// .directive('leafletMap', function() {
// 	return {
// 		restrict: 'E',

// 		link:function(element,attrs) {
// 			//make map div
// 			var mapDiv = $('<div></div>')
// 			mapDiv.css('height', 180)
// 			$(element).append(mapDiv)

// 			//initialize map
// 			var map = L.map('mapDiv').setView([51.505, -0.09], 13)


// 		}
// 	}
// })

//set the default state to 'home' so the site loads correctly
uvpApp.run(['$state', function ($state) {
	$state.go('home')
}])