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
            menus:[]
        }

        $http.get("/Common/GetMenus").then(function(res)
        {
            $scope.vm.menus = res.data;
        })
    }

    angular.module("admin", ['sqladmin']).controller("gui.common.controller", ["$scope","$http",gui_common_controller]);
})();