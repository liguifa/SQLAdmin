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
            },

            query: {
                historydatas: [],
                fields: [{ Name: "语句" }, { Name: "时间" }, { Name: "CPU时间" }, { Name: "最小CPU时间" }, { Name: "最大CPU时间" }, { Name: "执行时间" }, { Name: "最小执行时间" }, { Name: "最大执行时间" }, { Name: "影响行数" }, { Name: "最小影响行数" }, { Name: "最大影响行数" }],
                queryProportionInfo: [],
                xaxis:[]
            },

            pageId: 0,

            switchTo: function (pageId) {
                this.pageId = pageId;
            }
        }

        var config = [
            { id: 11, func: [getCPUInfos] },
            { id: 61, func: [getQueryHistories] },
            { id: 62, func: [getAllQueryProportionInfo] }
        ];

        function getCPUInfos() {
            report.getCPUInfos().then(function (infos) {
                var dbCpus = [];
                var otherCpus = [];
                var idleCpus = [];
                var cpudatas = [];
                var xaxis = [];
                for (var i in infos) {
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
        }

        function getConnectedSummary(){
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
        }
        
        function getConnectedInfos(){
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
        }

        function getExceptionInfos(){
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

        function getQueryHistories() {
            report.getQueryHistories().then(function (histories) {
                var historydatas = [];
                for (var i in histories) {
                    historydatas.push({ rows: histories[i] });
                }
                $scope.vm.query.historydatas = historydatas;
            });
        }

        function getAllQueryProportionInfo() {
            report.getAllQueryProportionInfo().then(function (info) {
                var proportionI = [];
                connecteds.push([0, info.SelectCount]);
                connecteds.push([1, info.DeleteCount]);
                connecteds.push([2, info.UpdateCount]);
                connecteds.push([3, info.InsertCount]);
                $scope.vm.query.queryProportionInfo = [{ data: connecteds, label: "查询次数", lines: { show: false }, points: { show: false } }];
                $scope.vm.query.xaxis = [[0, "Select"], [1, "Delete"], [2, "Update"], [3, "Insert"], ];
            });
        }

        $scope.$watch("vm.pageId", function (pageId) {
            for(var i in config)
            {
                if(config[i].id == pageId)
                {
                    for(var j in config[i].func)
                    {
                        config[i].func[j]();
                    }
                }
            }
        });
    }
    angular.module("admin").controller("report.controller", ["$scope", "report.service", report_controller]);
})();