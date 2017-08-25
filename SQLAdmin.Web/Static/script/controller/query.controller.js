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
                searchKey: {},
                selected: [],
                sort: "",
                isAsc:true,
            },
            indexs: [],
            showFields: [],
            isNeedSave: false,
            execResult: "",
        }

        function getDatas() {
            query.filter($scope.vm.tableName, $scope.vm.filter).then(function (data) {
                var datas = [];
                for (var i in data.Datas)
                {
                    var d = {
                        isSelected: false,
                        model: "readonly",
                        rows:data.Datas[i]
                    }
                    datas.push(d);
                }
                $scope.vm.datas = datas;
                $scope.vm.page = {
                    pageIndex: data.PageIndex,
                    pageSize: data.PageSize,
                    pageCount: data.PageCount,
                    total: data.Total
                }
            });
        }

        $scope.$watch("vm.tableName", function () {
            getDatas();
            query.getTableFields($scope.vm.tableName).then(function (data) {
                $scope.vm.fields = data.map(function (item) { item.name = item.Name; return item;});
                $scope.vm.showFields = data;
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

        $scope.vm.select = function (selected) {
            $scope.vm.filter.selected = selected.map(function (field) {
                return field.Name;
            });
            getDatas();
            var showFieldIds = selected.map(function(field){
                return field.Name;
            });
            $scope.vm.showFields = $scope.vm.fields.filter(function (field) {
                return showFieldIds.includes(field.Name);
            }); 
        }

        $scope.vm.sort = function (name, isAsc) {
            $scope.vm.filter.sort = name;
            $scope.vm.filter.isAsc = isAsc;
            getDatas();
        }

        $scope.vm.edit = function () {
            var selectDatas = $scope.vm.datas.filter(function (item) {
                return item.isSelected
            });
            var selectDatas = $scope.vm.datas.forEach(function (item) {
                if (item.isSelected) {
                    item.model = "edit";
                }
            });
            $scope.vm.isNeedSave = true;
        }

        $scope.vm.save = function () {
            var selectDatas = $scope.vm.datas.filter(function (item) {
                return item.isSelected
            });
            var datas = selectDatas.map(function (item) {
                var temp = {};
                for(var i in item.rows)
                {
                    temp[i] = item.rows[i].Value;
                }
                return temp;
            });
            query.update($scope.vm.tableName, datas).then(function ()
            {
                messager.confirm("更新成功！", function () {
                    getDatas();
                });
            });
            $scope.vm.isNeedSave = false;
        }

        $scope.vm.exec = function (code, language) {
            query.exec(code, language).then(function (data) {
                if (data.ResultType == 0) {
                    let dataTemp = JSON.parse(data.Result);
                    data.Result = dataTemp.map(function (item) {
                        item.rows = [];
                        for (var keyValue in item) {
                            item.rows.push(item[keyValue]);
                        }
                        return item;
                    });
                }
                $scope.vm.execResult = data;
            })
        }
    }

    angular.module("admin").controller("query.controller", ["$scope", "query.service", "messager.service","event.service",query_controller]);
})();