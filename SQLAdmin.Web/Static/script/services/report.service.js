(function () {
    function report_service($http,$q) {
        function _getCPUInfos() {
            var deferred = $q.defer();
            $http.post("/Report/GetCPUInfos", { tableName: name }).then(function (data) {
                console.log(data);
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        function _getConnectedSummary() {
            var deferred = $q.defer();
            $http.post("/Report/GetConnectedSummary", { tableName: name }).then(function (data) {
                console.log(data);
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        return {
            getCPUInfos: _getCPUInfos,
            getConnectedSummary: _getConnectedSummary
        }
    }

    angular.module("admin").factory("report.service", ["$http","$q", report_service]);
})();