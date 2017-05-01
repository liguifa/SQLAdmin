(function () {
    function gui_common_controller($scope, $http, messager, event, database, common, constant) {
        $scope.vm = {
            //window: "/Common/Connect",
            select: select,
            menus: [],
            database: [],
            remove: function () {
                messager.alert();
            },
            getTables: _getTables,
            contextMenuCommand: _contextMenuCommand
        }

        function select(menu) {
            $scope.vm.window = menu.Href;
        }

        function _getTables(tree) {
            if (tree.NodeType == 2) {
                database.getTables(tree).then(function (data) {
                    database.updateTree($scope.vm.database, data.Id, data);
                })
            }
            else {
                event.trigger(constant.SELECT);
            }
        }

        function _contextMenuCommand(command) {
            event.trigger(command);
        }

        common.getMenus().then(function (data) {
            $scope.vm.menus = data;
        });

        event.register("connect", function () {
            database.getDatabases().then(function (data) {
                $scope.vm.database = data
            });
        });
    }

    angular.module("admin").controller("gui.common.controller", ["$scope", "$http", "messager.service", "event.service", "database.service", "common.service", "constant.service", gui_common_controller]);
})();