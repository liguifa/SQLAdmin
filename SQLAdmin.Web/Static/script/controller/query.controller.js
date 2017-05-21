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
            },
            indexs:[]
        }

        function getDatas() {
            query.filter($scope.vm.tableName, $scope.vm.page).then(function (data) {
                var datas = [];
                for (var i in data.Datas)
                {
                    var d = {
                        isSelected: false,
                        rows:data.Datas[i]
                    }
                    datas.push(d);
                }
                $scope.vm.datas = datas;
                $scope.vm.page = {
                    pageIndex: data.PageIndex,
                    pageSize: data.PageSize,
                    pageCount: data.PageCount,
                    totle: data.Totle
                }
            });
        }

        $scope.$watch("vm.tableName", function () {
            getDatas();
            query.getTableFields($scope.vm.tableName).then(function (data) {
                $scope.vm.fields = data;
                query.getTableIndexs($scope.vm.tableName).then(function (data) {
                    $scope.vm.indexs = data;
                });
            });
           
        });

        //$scope.$watch("vm.page", function () {
        //    getDatas();
        //}, true)

        $scope.vm.jump = function (pageIndex) {
            $scope.vm.page.pageIndex = pageIndex;
            getDatas();
        }

        $scope.vm.remove = function () {
            var selectDatas = $scope.vm.datas.filter(function (item) {
                return item.isSelected
            });
            if (selectDatas.length == 0) {

            }
            else {
                var selected = [];
                var key = $scope.vm.indexs.find(function (index) {
                    return index.Id == 1;
                });
                selected = selectDatas.map(function (item) {
                    return item.rows[key.ColumnName];
                });
                query.remove($scope.vm.tableName, selected).then(function (data) {
                    alert(data);
                });
            }
        }
    }

    angular.module("admin").controller("query.controller", ["$scope", "query.service", query_controller]);
})();