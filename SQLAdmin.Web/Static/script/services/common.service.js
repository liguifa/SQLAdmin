(function () {
    function common_service($http, $q) {
        function _getMenus() {
            var deferred = $q.defer();
            $http.get("/Common/GetMenus").then(function (res) {
                deferred.resolve(res.data);
            });
            return deferred.promise;
        }

        return {
            getMenus: _getMenus
        }
    }

    angular.module("admin").factory("common.service", ["$http", "$q", common_service]);
})();