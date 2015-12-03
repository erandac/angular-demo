'use strict';

var myApp = angular.module('myApp', [])
    .config(['reminderProvider',
        function(reminderProvider){

    reminderProvider.setMinutesToRemind(5);

}]);

myApp.factory('taskList', [function(){

    var factory = {tasks:[]};

    factory.add = function(task){
        factory.tasks.push(task);
    };

    factory.removeByName = function(taskName)
    {
        var index = _.findIndex(factory.tasks, function(task){ return task.name == taskName; });
        if(index != -1)
        {
            factory.tasks.splice(index, 1);
        }
    };

    factory.remove = function(task)
    {
        var index = _.indexOf(factory.tasks, task);
        if(index != -1)
        {
            factory.tasks.splice(index, 1);
        }
    };

    factory.getTasks = function(){
        return factory.tasks;
    };

    return factory
}]);


myApp.service('reminderService', ['$interval', 'taskList', function(interval, taskList)
{
    this.remindBefore = 10;
    var self = this;

    this.runReminder = function(callBack)
    {
        interval(function()
        {
            _.each(taskList.getTasks(),function(task)
            {
                task.minutesToStart --;
                if(task.minutesToStart <= self.remindBefore && task.reminded !== true)
                {
                    callBack(task);
                    task.reminded = true;
                }
            });
        },60000);
    };
}]);


myApp.provider('reminder',[function(){

    var minutesToRemind = 10;

    this.setMinutesToRemind = function(val){
        minutesToRemind = val;
    };

    this.$get = ['reminderService', function(reminderService)
    {
        reminderService.remindBefore = minutesToRemind;
        return reminderService.runReminder;
    }];
}]);


myApp.controller("TaskCtl", ['$scope','taskList','reminder', function(scope, taskList, reminder)
{
    scope.tasks = taskList.getTasks();
    scope.taskToAdd = {minutesToStart:30, name: ""};

    function onRemind(task)
    {
        console.log("run onRemind",task);
    }

    reminder(onRemind);

    this.addTask = function()
    {
        taskList.add({name: scope.taskToAdd.name == "" ? "Undefined Task" : scope.taskToAdd.name,
            minutesToStart:scope.taskToAdd.minutesToStart,
            reminded:false, completed:false });

        scope.taskToAdd.name = ""
    };

    this.removeTask = function(task)
    {
        taskList.remove(task);
    }

}]);