'use strict';

var myApp = angular.module('myApp', []).config([function(){}]);

myApp.controller('Level1Ctl', ['$scope', function(scope)
{
    scope.myObject = {name:""}
}]);


myApp.controller('Level2Ctl', ['$scope', function(scope)
{
    scope.$watch('data.name', function(val){
        console.log(val);
    });

}]);


myApp.controller('Level3Ctl', ['$scope', function(scope)
{

}]);

