(function () {
    function database_controller($scope, $http, event, constant, messager, database) {
        event.register(constant.DELETE_DB, function (args) {
            messager.confirm("确认删除吗？",function () {
                database.deleteDatabase(args).then(function () {

                });
            })
        });
    }
    angular.module("admin").controller("database.controller", ["$scope", "$http", "event.service", "constant.service", "pop.service", "database.service", database_controller]);
})();