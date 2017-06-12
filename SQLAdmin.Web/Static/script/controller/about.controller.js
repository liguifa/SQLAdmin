(function ()
{
    function about_controller($scope)
    {
        $scope.vm = {
            icon: "/Static/Images/displayLogo.ico",
            name: "SQLAdmin"
        }
    }
    angular.module("admin").controller("about.controller", ["$scope", "$http", about_controller]);
})();