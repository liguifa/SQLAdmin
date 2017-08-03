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
            contextMenuCommand: _contextMenuCommand,
            icon: "/Static/Images/displayLogo.ico",
            name:"SQLAdmin"
        }

        function select(menu) {
            $scope.vm.window = menu.href;
        }

        function _getTables(tree) {
            if (tree.NodeType == 2) {
                database.getTables(tree).then(function (data) {
                    database.updateTree($scope.vm.database, data.Id, data);
                })
            }
            else {
                event.trigger(constant.SELECT, {name:tree.Fullname});
            }
        }

        function _contextMenuCommand(command, args) {
            event.trigger(command, args);
        }

        common.getMenus().then(function (data) {
            var mapItem = function (item) {
                var newItem = {
                    title: item.Title,
                    id: item.Id,
                    icon: item.Icon,
                    href:item.Href,
                    subs: []
                };
                if(item.Subs && item.Subs.length > 0){
                    newItem.subs = item.Subs.map(mapItem)
                }
                return newItem;
            }
            $scope.vm.menus = data.map(mapItem);
        });

        event.register("connect", function () {
            database.getDatabases().then(function (data) {
                $scope.vm.database = data
            });
        });
    }

    angular.module("admin").controller("gui.common.controller", ["$scope", "$http", "messager.service", "event.service", "database.service", "common.service", "constant.service", gui_common_controller]);
})();