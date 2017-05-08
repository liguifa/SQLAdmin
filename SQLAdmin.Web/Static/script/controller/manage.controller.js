(function () {
    function manage_controller($scope, manage, event, constant, guid) {
        $scope.vm = {
            pages: []
        }

        var pageConfiguration = [
            { name: constant.SELECT, url: "/Manage/Query", args: "name", title: "select" },
            { name: constant.CPU, url: "/Report/Cpu", args: null, title: "CPU 统计" },
             { name: constant.CONNECT_INFO, url: "/Report/Cpu", args: null, title: "CPU 统计" },
        ]

        function _addPage(config,args) {
            $scope.$apply(function () {
                var url = config.url;
                if(config.args){
                    url +="?"+config.name+"="+args;
                }
                var page = {
                    id: guid.newGuid(),
                    url: url,
                    //table: table,
                    title: config.title
                }
                $scope.vm.pages.push(page);
            });
        }

        //注册事件
        function _registerEvent()
        {
            for (var i in pageConfiguration)
            {
                event.register(pageConfiguration[i].name, function (args) {
                    _addPage(pageConfiguration[i],args);
                });
            }
        }
        _registerEvent();
    }

    angular.module("admin").controller("manage.controller", ["$scope", "manage.service", "event.service", "constant.service", "guid.service", manage_controller]);
})();