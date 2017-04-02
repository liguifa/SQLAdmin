(function ()
{
    function gui_common_controller($scope,$http)
    {
        function select(menu)
        {
            $scope.vm.window = menu.Href;
        }
       
        $scope.vm = {
            //window: "/Common/Connect",
            select: select,
            menus: [],
            database:[]
        }

        $http.get("/Common/GetMenus").then(function(res)
        {
            $scope.vm.menus = res.data;
        })

        $http.get("/Database/GetDatabases").then(function (res)
        {
            $scope.vm.database = res.data;
        })
    }

    angular.module("admin", ['sqladmin']).controller("gui.common.controller", ["$scope","$http",gui_common_controller]);
})();