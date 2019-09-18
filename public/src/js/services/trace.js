'use strict';

angular.module ('insight.trace')
    .factory ('Trace', function ($http, $q, Api) {
      return {
        GetList: function (traceHash) {
            var defer = $q.defer();
            $http({ 
		  url: 'http://52.82.55.8:9095/api/v0/cat?arg=' + traceHash,
              	  method: 'get', 
		  headers: {'Content-Type': 'application/json'}, 
		  params: '', 
	    }).success(function (data, status, headers, config) {
		var res = {
			"data":data,
			"hash":traceHash
		};
                defer.resolve(res);
            }).error(function (msg) {
                defer.reject(msg);
            });
            return defer.promise;
        }
      };
    });

