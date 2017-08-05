(function () {
    function query_service($http, $q) {
        function _filter(name,filter) {
            var deferred = $q.defer();
            $http.post("/Manage/Get", { TableName: name, SortColumn: filter.sort, IsAsc: filter.isAsc, PageIndex: filter.page.pageIndex, PageSize: filter.page.pageSize, Search: { Key: filter.searchKey.key, Value: filter.searchKey.value }, Selected: filter.selected }).then(function (data) {
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
            $http.post("/Manage/Delete", { TableName: tableName, Selected: selected }).then(function (data) {
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        function _getTableIndexs(name) {
            var deferred = $q.defer();
            $http.post("/Database/GetTableIndexs", { tableName: name }).then(function (data) {
                console.log(data);
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        function _update(tableName, datas) {
            var deferred = $q.defer();
            $http.post("/Manage/Update", { TableName: tableName, Datas: datas }).then(function (data) {
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        function _exec(code, language) {
            var deferred = $q.defer();
            $http.post("/Manage/Exec", { Code: code, Language: language }).then(function (data) {
                deferred.resolve(data.data);
            });
            return deferred.promise;
        }

        return {
            filter: _filter,
            remove: _remove,
            getTableFields: _getTableFields,
            getTableIndexs: _getTableIndexs,
            update: _update,
            exec: _exec
        }
    }

    angular.module("admin").factory("query.service", ["$http", "$q", query_service]);
})();