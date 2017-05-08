(function () {
    function report_controller($scope, report) {
        $scope.vm = {
            cpuinfos: [],
            xaxis: [],
            cpudatas: [],
            fields: [{ Name: "DB进程" }, { Name: "空闲进程" }, { Name: "其它进程" }, { Name: "时间" }],

            connectedSummary: [],
        }

        report.getCPUInfos().then(function (infos) {
            $scope.vm.cpuinfos = [];
            var dbCpus = [];
            var otherCpus = [];
            var idleCpus = [];
            $scope.vm.xaxis = [];
            var cpudatas = [];
            var xaxis = [];
            for (var i in infos)
            {
                dbCpus.push([parseInt(i), infos[i].DBProess]);
                otherCpus.push([parseInt(i), infos[i].OtherProcess]);
                idleCpus.push([parseInt(i), infos[i].IDLEProcess]);
                xaxis.push([parseInt(i), infos[i].EventTime]);
                cpudatas.push({
                    rows: {
                        DBProess: infos[i].DBProess,
                        IDLEProcess: infos[i].IDLEProcess,
                        OtherProcess: infos[i].OtherProcess,
                        EventTime: infos[i].EventTime
                    }
                });
            }
            var data = [
                { data: dbCpus, label: 'DB进程', lines: { show: true }, points: { show: true } },
                { data: otherCpus, label: '其它进程', lines: { show: true }, points: { show: true } },
                { data: idleCpus, label: '空闲进程', lines: { show: true }, points: { show: true } }
            ];
            $scope.vm.cpuinfos = data;
            $scope.vm.xaxis = xaxis;
            $scope.vm.cpudatas = cpudatas;
        });

        report.getConnectedSummary().then(function (infos) {
            var connecteds = [];
            for (var i in infos)
            {
                connecteds.push([i, infos[i].Total]);
            }
            $scope.vm.connectedSummary = [{ data: connecteds, label: "登录次数", lines: { show: true }, points: { show:true}}];
        });
    }
    angular.module("admin").controller("report.controller", ["$scope", "report.service", report_controller]);
})();