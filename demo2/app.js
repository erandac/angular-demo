'use strict';

var myApp = angular.module('myApp', []).config([function(){}]);

myApp.controller('TestDigestCtl', ['$scope','$interval', function(scope, ngInterval)
{
    scope.myCounter = 0;

    setInterval(function(){
        scope.$apply(function(){
            scope.myCounter ++;
            console.log(scope.myCounter);
        });
    }, 1000);

   scope.$watch('myCounter', function(){
        console.log(scope.myCounter);
    });


}]);

