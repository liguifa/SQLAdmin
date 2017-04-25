(function () {
    function gui_common_controller($scope, $http, messager, event, database,common) {
        $scope.vm = {
            //window: "/Common/Connect",
            select: select,
            menus: [],
            database: [],
            remove: function () {
                messager.alert();
            },
            getTables:_getTables
        }

        function select(menu) {
            $scope.vm.window = menu.Href;
        }

        function _getTables(tree){
            database.getTables(tree).then(function(data){
                database.updateTree($scope.vm.database,data.Id,data);
            })
        }
       
        common.getMenus().then(function(data){
            $scope.vm.menus = data;
        });

        event.register("connect", function () {
            database.getDatabases().then(function (data) {
                $scope.vm.database = data
            });
        });
    }

    angular.module("admin").controller("gui.common.controller", ["$scope", "$http", "messager.service", "event.service", "database.service", "common.service", gui_common_controller]);
})();