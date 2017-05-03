(function () {
    function query_service($http, $q) {
        function _filter(name,page) {
            var deferred = $q.defer();
            $http.post("/Manage/Get", { TableName: name, SortColumn: "Id", IsAsc: true,PageIndex:page.pageIndex,PageSize:page.pageSize }).then(function (data) {
                console.log(data);
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        function _getTableFields(name) {
            var deferred = $q.defer();
            $http.post("/Database/GetTableFields", { tableName: name}).then(function (data) {
                console.log(data);
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        function _remove(tableName, selected) {
            var deferred = $q.defer();
            $http.post("/Manage/Delete", { tableName: tableName, selected: selected }).then(function (data) {
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        return {
            filter: _filter,
            remove: _remove,
            getTableFields: _getTableFields
        }
    }

    angular.module("admin").factory("query.service", ["$http", "$q", query_service]);
})();