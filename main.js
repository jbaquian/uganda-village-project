var uvpApp = angular.module('uvpApp', ['ui.router'])

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
uvpApp.controller('d3', function($scope) {
	$scope.data = data
})

//'at-a-glance' directive for d3 chart
.directive('at-a-glance', function($filter, $scope) {
	return {
		restrict:'E',

		//define scope variables
		scope:{
			data:'='
		},

		link:function(scope,elem,attrs){
			//wrapper element the chart will go in
			wrapper = d3.select(elem[0])

			var xScale;
			var yScale;
			var svg = wrapper.append('svg')
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
				var width = 400 - margin-left - margin.right

				//sets the scales
				var setScales = function(){
					//xScale

					//yScale

				}

				//initiate scale variables
				setScales()

				//positions paths
				var setPaths = function(path) {

				}

			// Define x axis
			var xAxis = d3.svg.axis()
						.scale(xScale)
						.orient('bottom')

			// Define y axis
			var yAxis = d3.svg.axis()
						.scale(yScale)
						.orient('left')

			// Append x axis
			svg.append(svg).call(xAxis)
				.attr('transform', 'translate(' + margin.left + ',' + (height + margin.top) + ')')
				.attr('class', 'axis')
			
			svg.append(svg)
				.attr('class', 'axis').call(yAxis)
				.attr('transform', 'translate(' + margin.left + ',' + (margin.top) + ')')

			// Write a reusable drawing function for circles
			var draw = function() {
				// Filter down your data based on your search
				//scope.filteredData = $filter('filter')(scope.data, scope.search);
				
				// Set Scales
				setScales()
				
				// Use the .enter() method to get your entering elements, and then position them using your positioning function
				circles.enter().append('circle').call(setPaths)
				  
				// Use the .exit() and .remove() methods to remove elements that are no longer in the data
				circles.exit().remove()
			  
				// Select all circle elements within your g and transition their position using your positioning function
				g.selectAll('circle').transition().duration(1500).call(circleFunc)     
			
			}
			draw()
		}
	}
})

//set the default state to 'home' so the site loads correctly
uvpApp.run(['$state', function ($state) {
	$state.go('home')
}])