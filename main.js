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

//set the default state to 'home' so the site loads correctly
uvpApp.run(['$state', function ($state) {
	$state.go('home')
}])