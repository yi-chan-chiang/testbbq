(function () {
    var app = angular.module('myApp', ['myService', 'myController', 'ngQueue', 'zingchart-angularjs', 'angular-uuid']);
    //var controller = angular.module('myController',[]);
    //var service = anguler.module('myService',[]);


    location.href = "http://www.pchome.com.tw";

    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.timeout = 60000;
    }]);






})();