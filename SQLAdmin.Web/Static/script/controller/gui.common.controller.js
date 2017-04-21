(function () {
    function gui_common_controller($scope, $http, messager, event) {
        function select(menu) {
            $scope.vm.window = menu.Href;
        }

        $scope.vm = {
            //window: "/Common/Connect",
            select: select,
            menus: [],
            database: [],
            remove: function () {
                messager.alert();
            },
            getTables:function(tableName)
            {
                $http.post("/Database/GetTables", { databaseName: tableName }).then(function (res) {
                    alert(res.data);
                })
            }
        }

        $http.get("/Common/GetMenus").then(function (res) {
            $scope.vm.menus = res.data;
        })
        event.register("connect", function () {
            $http.get("/Database/GetDatabases").then(function (res) {
                $scope.vm.database = res.data;
            })
        })
    }

    angular.module("admin", ['sqladmin']).controller("gui.common.controller", ["$scope", "$http", "messager.service", "event.service", gui_common_controller]);
})();