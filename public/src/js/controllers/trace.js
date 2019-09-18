'use strict';

angular.module('insight.trace').controller('traceController',
  function($scope, $rootScope, $routeParams, $location, Global, Trace) {
  $scope.global = Global;
  $scope.loading = false;
 
  $scope.itemsExpanded = false; 
  
  $scope.traceInfo = [];
  $scope.myres1 = [];
  $scope.myres2 = [];
  $scope.myres3 = [];
  

  var _findTx = function(traceHash) {
    Trace.GetList(traceHash).then(function(res) {  
      // success函数 
      $scope.myres1.push(res.hash);
      var data = res.data;
      for(var i=0;i<data.length;i++){
	data[i].prevHash = res.hash;
        $scope.traceInfo.push(data[i]);
	if(data[i].hash !== ''){
           _findTx(data[i].hash);
        }
      }
      /*
      $scope.trace = data;
      
      for(var i=0;i<data.length;i++){
　　    for(var key in data[i]){
　　　　  ppp.push(key+':'+data[i][key]);
        }
      } 
         
      $scope.myjson = ppp;
      */
    },function(data){  
      //error函数  
      $scope.trace = 'data';
    });
  };

  $scope.findOne = function(){
    _findTx($routeParams.traceHash);   
  };

  $scope.params = $routeParams;
});
