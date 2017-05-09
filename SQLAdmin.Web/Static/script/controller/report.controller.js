(function () {
    function report_controller($scope, report) {
        $scope.vm = {
            cpu:{ cpuinfos: [],
                xaxis: [],
                cpudatas: [],
                fields: [{ Name: "DB进程" }, { Name: "空闲进程" }, { Name: "其它进程" }, { Name: "时间" }],
            },

            connected: {
                connectedSummary: [],
                xaxis: [],
                connecteddatas:[],
                fields: [{ Name: "IP" }, {Name:"时间"}]
            },

            exception: {
                exceptiondatas: [],
                fields: [{ Name: "时间" }, {Name:"异常"}]
            }
        }

        report.getCPUInfos().then(function (infos) {
            var dbCpus = [];
            var otherCpus = [];
            var idleCpus = [];
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
            $scope.vm.cpu.cpuinfos = data;
            $scope.vm.cpu.xaxis = xaxis;
            $scope.vm.cpu.cpudatas = cpudatas;
        });

        report.getConnectedSummary().then(function (infos) {
            var connecteds = [];
            var xaxis = [];
            for (var i in infos)
            {
                connecteds.push([parseInt(i), infos[i].Total]);
                xaxis.push([parseInt(i), infos[i].Ip]);
            }
            $scope.vm.connected.connectedSummary = [{ data: connecteds, label: "登录次数", lines: { show: false }, points: { show: false } }];
            $scope.vm.connected.xaxis = xaxis;
        });

        report.getConnectedInfos().then(function (infos) {
            var connecteddatas = [];
            for(var i in infos)
            {
                connecteddatas.push({
                    rows: {
                        IP: infos[i].Ip,
                        EventTime:infos[i].EventTime
                    }
                });
            }
            $scope.vm.connected.connecteddatas = connecteddatas;
        });

        report.getExceptionInfos().then(function (infos) {
            var exceptiondatas = [];
            for(var i in infos)
            {
                exceptiondatas.push({
                    rows: {
                        EventTime: infos[i].EventTime,
                        Message: infos[i].Message
                    }
                });
            }
            $scope.vm.exception.exceptiondatas = exceptiondatas;
        });
    }
    angular.module("admin").controller("report.controller", ["$scope", "report.service", report_controller]);
})();