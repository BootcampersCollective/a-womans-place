angular.module('awp', ['ngRoute', 'checklist-model'])
  .config(myRouter);

myRouter.$inject = ['$routeProvider'];

function myRouter($routeProvider){

  $routeProvider
    .when('/', {
      templateUrl: '../templates/home.html'
    })
    .when('/about', {
      templateUrl: '../templates/about.html'
    })
    .when('/events', {
      templateUrl: '../templates/events.html'
    })
    .when('/services', {
      templateUrl: '../templates/services.html'
    })
    .when('/getHelp', {
      templateUrl: '../templates/getHelp.html'
    })
    .when('/giveHelp', {
      templateUrl: '../templates/giveHelp.html'
    })
    .when('/dv', {
      templateUrl: '../templates/dv.html'
    })
    .when('/volunteer', {
      templateUrl: '../templates/volunteer.html'
    })
    .when('/volunteerApp', {
      templateUrl: '../templates/volunteerApp.html'
    })
    .when('/wishlist', {
      templateUrl: '../templates/wishlist.html'
    })
    .when('/resources', {
      templateUrl: '../templates/resources.html'
    })
    .otherwise({
      redirectTo: '/'
    })

}
