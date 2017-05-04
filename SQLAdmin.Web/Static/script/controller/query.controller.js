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
                for (var i in data.Datas)
                {
                    var d = {
                        isSelected: false,
                        rows:data.Datas[i]
                    }
                    $scope.vm.datas.push(d);
                }
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
            //if ($scope.vm.selected.length == 0)
            //{

            //}
            //else
            //{
            var selected = [];
            for (var i in $scope.vm.datas)
            {
                if($scope.vm.datas[i].isSelected)
                {

                }
            }
                query.remove("[RP_UAT_Li].[dbo].[Common_LearningObject]", ["3A19D3C5-39B5-E611-80BA-00155D430A74", "D3634E4B-44B5-E611-80BA-00155D430A74"]).then(function (data) {
                    alert(data);
                });
            //}
        }
    }

    angular.module("admin").controller("query.controller", ["$scope", "query.service", query_controller]);
})();