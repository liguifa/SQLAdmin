(function () {
    function query_controller($scope, query, messager, event) {
        $scope.vm = {
            datas: [],
            fields: [],
            filter:{
                page: {
                    pageIndex: 1,
                    pageSize: 50,
                    totle: 0,
                    pageCount: 0,
                },
                searchKey: {}
            },
            indexs:[]
        }

        function getDatas() {
            query.filter($scope.vm.tableName, $scope.vm.filter).then(function (data) {
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
            $scope.vm.filter.page.pageIndex = pageIndex;
            getDatas();
        }

        $scope.vm.remove = function () {
            var selectDatas = $scope.vm.datas.filter(function (item) {
                return item.isSelected
            });
            if (selectDatas.length == 0) {
                messager.alert("请先选择删除的对象！");
            }
            else {
                var selected = [];
                //var key = $scope.vm.indexs.find(function (index) {
                //    return index.Id == 1;
                //});
                var key = $scope.vm.indexs.filter(function (index) {
                    return index.Id == 1;
                })[0];
                selected = selectDatas.map(function (item) {
                    return item.rows[key.ColumnName];
                });
                query.remove($scope.vm.tableName, selected).then(function (data) {
                    messager.confirm("删除成功！", function () {
                        getDatas();
                    });

                });
            }
        }

        $scope.vm.search = function (searchKey) {
            $scope.vm.filter.searchKey = searchKey;
            getDatas();
        }
    }

    angular.module("admin").controller("query.controller", ["$scope", "query.service", "messager.service","event.service",query_controller]);
})();