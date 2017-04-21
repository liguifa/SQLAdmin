(function ()
{
    function connect_controller($scope, $http, connect, event)
    {
        $scope.connect = {
            determine: function (args)
            {
                debugger;
                connect.loginDatabase(args);
                event.register("connect", function () {
                    $scope.vm.window = "";
                });
            },
            cancel: function ()
            {
                $scope.vm.window = "";
            },
            databaseTypes: []
        };
        $http.get("/Common/GetDatabaseTypes").then(function (res) {
            $scope.connect.databaseTypes = res.data;
        })
    }
    angular.module("admin").controller("connect.controller", ["$scope", "$http", "connect.service","event.service", connect_controller]);
})();