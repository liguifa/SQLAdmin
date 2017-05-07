(function () {
    function manage_controller($scope, manage, event, constant, guid) {
        $scope.vm = {
            pages: []
        }

        event.register(constant.SELECT, function (table) {
            $scope.$apply(function () {
                var page = {
                    id: guid.newGuid(),
                    url: "/Manage/Query?name=" + table.name,
                    table: table,
                    title: table.name + "-" + constant.SELECT
                }
                $scope.vm.pages.push(page);
            });
        });

        event.register(constant.CPU, function () {
            $scope.$apply(function () {
                var page = {
                    id: guid.newGuid(),
                    url: "/Report/Cpu",
                    title: "cpu 统计",
                }
                $scope.vm.pages.push(page);
            });
        })
    }

    angular.module("admin").controller("manage.controller", ["$scope", "manage.service", "event.service", "constant.service", "guid.service", manage_controller]);
})();