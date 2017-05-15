(function () {
	function monitor_service($http,$q) {
		function _getMonitorTypes() {
			var deferred = $q.defer();
			$http.get("/Monitor/GetMonitorTypes").then(function (data) {
				deferred.resolve(data.data);
			});
			return deferred.promise;
		}

		function _addMonitor(monitor) {
			var deferred = $q.defer();
			$http.post("/Monitor/AddMonitors", {DisplayName:monitor.name,StartTime:Date.parse(monitor.start_time),EndTime:Date.parse(monitor.end_time),IntervalType:monitor.interval_type,Interval:monitor.interval,MonitorType:monitor.type,Threshold:monitor.threshold,ToEmail:monitor.mail}).then(function(data){
			    deferred.resolve(data.data);
			});
			return deferred.promise;
		}

		function _getMonitors() {
		    var deferred = $q.defer();
		    $http.get("/Monitor/GetMonitors").then(function (data) {
		        deferred.resolve(data.data);
		    });
		    return deferred.promise;
		}

		return {
			getMonitorTypes: _getMonitorTypes,
			addMonitor: _addMonitor,
			getMonitors: _getMonitors
		}
	}

	angular.module("admin").factory("monitor.service",["$http","$q", monitor_service]);
})();