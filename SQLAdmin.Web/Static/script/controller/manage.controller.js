(function () {
    function manage_controller($scope, manage, event) {
        event.register("connect", function () {
            manage.filter();
        });
    }

    angular.module("admin").controller("manage.controller", ["$scope", "manage.service", "event.service", manage_controller]);
})();