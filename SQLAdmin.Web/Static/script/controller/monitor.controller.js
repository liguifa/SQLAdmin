(function () {
    function monitor_controller($scope, monitor) {
        $scope.vm = {
            monitorTypes: [],
            intervalTypes: [],

            addMonitor: _addMonitor,

            isAdd: false,

            schedules: [],
            fields: [{ Name: "名称" }, { Name: "开始时间" }, { Name: "结束时间" }, { Name: "下次执行时间" }, { Name: "阀值" }, { Name: "邮箱" }],

            add:_add
        }

        function _addMonitor(){
            monitor.addMonitor($scope.vm.monitor).then(function (data) {
                $scope.vm.isAdd = false;
            });
        }

        function _add() {
            $scope.vm.isAdd = true;
        }

        monitor.getMonitorTypes().then(function (type) {
            $scope.vm.monitorTypes = type.MonitorTypes;
            $scope.vm.intervalTypes = type.IntervalTypes;
        });

        monitor.getMonitors().then(function (datas) {
            var schedules = [];
            for (var i in datas) {
                schedules.push({ rows:{
                    DisplayName:datas[i].DisplayName,
                    StartTime:new Date(datas[i].StartTime).toLocaleString(),
                    EndTime:new Date(datas[i].EndTime).toLocaleString(),
                    NextTime:new Date(datas[i].NextTime).toLocaleString(),
                    Threshold:datas[i].Threshold,
                    Main:datas[i].ToEmail
                }});
            }
            $scope.vm.schedules = schedules;
        });
    }

    angular.module("admin").controller("monitor.controller", ["$scope","monitor.service",monitor_controller]);
})();