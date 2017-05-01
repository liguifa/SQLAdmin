(function () {
    function manage_controller($scope, manage, event, constant,guid) {
        $scope.vm = {
            pages:[]
        }

        event.register(constant.SELECT, function () {
            var page = {
                id:guid.newGuid(),
            }
            $scope.vm.pages.push(page);
            manage.filter();
        });
    }

    angular.module("admin").controller("manage.controller", ["$scope", "manage.service", "event.service", "constant.service", "guid.service", manage_controller]);
})();