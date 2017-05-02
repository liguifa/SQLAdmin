(function () {
    function query_controller($scope, query) {
        $scope.vm = {
            datas: [],
            fields: [],
            page: {
                pageIndex: 1,
                pageSize: 50,
                totle: 0,
                pageCount: 0
            }
        }

        $scope.$watch("vm.tableName", function () {
            query.filter($scope.vm.tableName,$scope.vm.page).then(function (data) {
                $scope.vm.datas = data.Datas;
                $scope.vm.page = {
                    pageIndex: data.PageIndex,
                    pageSize: data.PageSize,
                    pageCount: data.PageCount,
                    totle:data.Totle
                }
            });

            query.getTableFields($scope.vm.tableName).then(function (data) {
                $scope.vm.fields = data;
            })
        });
    }

    angular.module("admin").controller("query.controller", ["$scope", "query.service", query_controller]);
})();