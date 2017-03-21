(function ()
{
    function connect_controller($scope, connect)
    {
        $scope.connect = {
            determine: function (args)
            {
                debugger;
                connect.loginDatabase(args);
            },
            cancel: function ()
            {
                $scope.vm.window = "";
            },
        };
    }
    angular.module("admin").controller("connect.controller", ["$scope", "connect.service", connect_controller]);
})();