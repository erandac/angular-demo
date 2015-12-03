'use strict';

var myApp = angular.module('myApp', []).config([function(){}]);

myApp.controller('AppCtl', ['$scope',function(scope){
    scope.data = {name: "JKCS", 'color': 'red'};
    scope.list = ["Java", "Python", "C#", "PHP", "JavaScript"]
    scope.myEmail = 'erandac@gmail.com'
}]);


myApp.directive('inheritDirective', [function(){
    return {
        'scope':true,
        'template':'<div style="color: {{data.color}}"> ' +
        'Hello {{data.name}}</div>'
    }
}]);


myApp.directive('isolatedDirective', [function(){
    return {
        'scope':{
            'name':'@',
            'color':'='
        },
        'template':'<div style="color: {{color}}"> Hello {{name}}</div>'
    }
}]);

myApp.directive('myForEach', function(){
  return {
    transclude : 'element',
    compile : function(element, attr, transclude){

      return function($scope, $element, $attr){
        var myLoop = $attr.myForEach,

            match = myLoop.match(/^\s*(.+)\s+as\s+(.*?)?$/),
            collectionString = match[1],
            parent = $element.parent(),
            indexString = match[2],
            elements = [];

        $scope.$watchCollection(collectionString, function(collection){
          var i, tmpBag, childScope;
            //When the dom already renderd remove elements and scopes
          if(elements.length > 0){
            for (i = 0; i < elements.length; i++) {
              elements[i].el.remove();
              elements[i].scope.$destroy();
            };
            elements = [];
          }

          for (i = 0; i < collection.length; i++) {
            childScope = $scope.$new();
            childScope[indexString] = collection[i];

            transclude(childScope, function(clone){
              parent.append(clone); // add to DOM
              tmpBag = {};
              tmpBag.el = clone;
              tmpBag.scope = childScope;
              elements.push(tmpBag);
            });
          };
        });
      }
    }
  }
});

myApp.directive('gravatar', function () {

  function createGravatarUrl(email, size) {
      if(!size) size = 200;
    return 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(email) + ".jpg?s="+ size;
  }

  function linker(scope) {
    scope.url = createGravatarUrl(scope.email);
    scope.$watch('email', function (newVal, oldVal)
    {
      if (newVal !== oldVal) {
        scope.url = createGravatarUrl(scope.email);
      }
    });
  }

  return {
    template: '<img ng-src="{{url}}"/>',
    restrict: 'EA',
    replace: true,
    scope: {
      email: '=',
        size: '='
    },
    link: linker
  };

});


