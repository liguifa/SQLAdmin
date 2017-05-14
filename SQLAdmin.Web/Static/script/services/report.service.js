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

        function _getConnectedInfos() {
            var deferred = $q.defer();
            $http.get("/Report/GetConnectedInfos").then(function (data) {
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        function _getExceptionInfos() {
            var deferred = $q.defer();
            $http.get("/Report/GetExceptionInfos").then(function (data) {
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        function _getQueryHistories(page) {
            var deferred = $q.defer();
            $http.post("/Report/GetQueryHistories", { TableName: null, SortColumn: null, IsAsc: true, PageIndex: page.pageIndex, PageSize: page.pageSize }).then(function (data) {
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        function _getAllQueryProportionInfo() {
            var deferred = $q.defer();
            $http.post("/Report/getAllQueryProportionInfo", { tableName: name }).then(function (data) {
                console.log(data);
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        return {
            getCPUInfos: _getCPUInfos,
            getConnectedSummary: _getConnectedSummary,
            getConnectedInfos: _getConnectedInfos,
            getExceptionInfos: _getExceptionInfos,
            getQueryHistories: _getQueryHistories,
            getAllQueryProportionInfo: _getAllQueryProportionInfo
        }
    }

    angular.module("admin").factory("report.service", ["$http","$q", report_service]);
})();