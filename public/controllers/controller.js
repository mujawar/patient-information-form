/**
 * Created by arif on 12/5/16.
 */

var mainApp = angular.module('mainApp',['ngRoute']);

mainApp.config(['$routeProvider',function($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'info.html',
            controller: 'myCtrl'
        })
        .when('/profile', {
            templateUrl: 'patient-list.html',
            controller: 'myCtrl'
        })
        .otherwise({
            redirectTo: '/home'
        });
}]);




mainApp.controller('myCtrl',function ($scope,$http) {
    console.log('hello world from controller')

    var refresh = function() {
        $http.get('/patient').success(function(res) {
            //console.log('i recieved data what i reqiusted' +JSON.stringify(res));
            $scope.patient = res;
        });
    }
    refresh();
    $scope.AddDetails = function(){
        //console.log('data' +JSON.stringify($scope.patient));
        $http.post('/patient',$scope.patient).success(function(result){
            console.log('result' +JSON.stringify(result));
            $scope.patient = ''
            refresh();
        })
        $scope.message = 'Data submitted sussessfully'
    }

    $scope.remove = function(patient){
        console.log('patient' +JSON.stringify(patient._id));
        $http.delete('/patient/' + patient._id).success(function(data){
           // console.log('data removed' +JSON.stringify(data));
            refresh();
        })
    }

    $scope.Edit = function(id){
        //console.log(' edit id========' +JSON.stringify(id))
        $http.get('/patient/' + id).success(function(data1){
            console.log('edit data' +JSON.stringify(data1));
            $scope.patient = data1;
        })
    }

    $scope.update = function(){
        //console.log('update data' +JSON.stringify($scope.patient));
        //console.log('$scope.patient._id' +JSON.stringify($scope.patient._id,$scope.patient))
        $http.put('/patient/' +$scope.patient._id,$scope.patient).success(function(tttt){
            refresh();
        })
        $scope.patient = ''
    }

    $scope.clear = function(){
        $scope.patient = ''
    }


})
