(function () {
    function manage_controller($scope, manage, event, constant, guid) {
        $scope.vm = {
            pages: []
        }

        var pageConfiguration = [
            { name: constant.SELECT, url: "/Manage/Query", args: "name", title: "select", defaultPageId: 101 },
            { name: constant.CPU, url: "/Report/Cpu", args: null, title: "CPU 统计", defaultPageId: 11 },
            { name: constant.MEMORY, url: "/Report/Memory", args: null, title: "内存统计", defaultPageId: 21 },
            { name: constant.DISK, url: "Report/HardDisk",args:null,title:"磁盘统计",defaultPageId:31 },
            { name: constant.CONNECT_INFO, url: "/Report/Connect", args: null, title: "连接统计", defaultPageId: 71 },
            { name: constant.EXCEPTION, url: "/Report/Exception", args: null, title: "异常统计", defaultPageId: 81 },
            { name: constant.MONITOR, url: "Monitor/Index", args: null, title: "监视", defaultPageId: 111 },
            { name: constant.QUERYHISTORY, url: "Report/Query", args: null, title: "查询统计", defaultPageId: 61 },
        ]

        function _addPage(config, args) {
            $scope.$apply(function () {
                var url = config.url;
                url += "?defaultPageId=" + config.defaultPageId;
                if (config.args) {
                    for (var name in args) {
                        url += "&" + name + "=" + args[name];
                    }
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
        function _registerEvent() {
            for (var i in pageConfiguration) {
                event.register(pageConfiguration[i].name, function (args, config) {
                    _addPage(config, args);
                }, pageConfiguration[i]);
            }
        }
        _registerEvent();
    }

    angular.module("admin").controller("manage.controller", ["$scope", "manage.service", "event.service", "constant.service", "guid.service", manage_controller]);
})();