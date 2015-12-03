var myApp = angular.module('myApp', ['ui.router', 'ngResource']);

myApp.config(['$stateProvider','$urlRouterProvider', function (stateProvider, urlRouterProvider) {

    stateProvider
        .state('app_root', {
            abstract: true,
            templateUrl: "tpl/main-container-type1.html"
        })
        .state('app_root.home', {
            abstract: true,
            views: {
                "main": {
                    templateUrl: "tpl/home.html"
                },
                "header": {
                    templateUrl: "tpl/home-breadcrumb.html"
                }
            }
        })
        .state('app_root.home.index', {
            url: "/",
            views: {
                "view1": {
                    templateUrl: "tpl/home-view1.html"
                },
                "view2": {
                    templateUrl: "tpl/home-view2.html"
                }
            }
        })
        .state('app_root.profile', {
            url: "/profile",
            abstract: true,
            views: {
                "main": {
                    templateUrl: "tpl/profile.html"
                },
                "header": {
                    templateUrl: "tpl/home-breadcrumb.html"
                }
            }
        })
        .state('app_root.profile.basic_info', {
            url: "/basic-info",
            views: {
                "tab_content": {
                    templateUrl: "tpl/profile-basic-info.html"
                }
            }
        })
        .state('app_root.profile.occupations', {
            url: "/occupational-history",
            views: {
                "tab_content": {
                    templateUrl: "tpl/profile-occupational-history.html"
                }
            }
        })
        .state('app_root.profile.events', {
            url: "/event",
            views: {
                "tab_content": {
                    templateUrl: "tpl/profile-events.html"
                }
            }
        })
        .state('app_root.messages', {
            url: "/messages",
            resolve:{
                messages:['$resource', function(resource)
                {
                    return resource('data/messages.json').get().$promise;
                }]
            },
            views: {
                "main": {
                    templateUrl: "tpl/messages.html",
                    controller:['$scope','messages',function(scope, messages)
                    {
                        scope.messages = messages.messages;
                    }]
                },
                "header": {
                    templateUrl: "tpl/home-breadcrumb.html"
                }
            }
        })
        .state('app_root.messages.detail', {
            url: "/detail?id",
            resolve:{
                message:['$stateParams','messages', function(stateParams, messages)
                {
                   return _.find(messages.messages, function(item){ return item.id == parseInt(stateParams.id) });
                }]
            },
            controller:['$scope','message','$state',function(scope,message,state)
            {
                scope.message = message;
                scope.close = function(){
                    state.go('^');
                };
            }],
            //templateUrl: "tpl/message-detail.html"
            templateUrl: "tpl/message-detail-popup.html "
        })
    ;

    urlRouterProvider.when('','/');
    urlRouterProvider.when('/profile','/profile/basic-info');

}]);



