(function () {
    function report_controller($scope, report) {
        $scope.vm = {
            cpu: {
                cpuinfos: [],
                xaxis: [],
                cpudatas: [],
                fields: [{ Name: "DB进程" }, { Name: "空闲进程" }, { Name: "其它进程" }, { Name: "时间" }],
            },

            connected: {
                connectedSummary: [],
                xaxis: [],
                connecteddatas: [],
                fields: [{ Name: "IP" }, { Name: "时间" }]
            },

            exception: {
                exceptiondatas: [],
                fields: [{ Name: "时间" }, { Name: "异常" }]
            },

            query: {
                historydatas: [],
                fields: [{ Name: "语句" }, { Name: "时间" }, { Name: "CPU时间" }, { Name: "最小CPU时间" }, { Name: "最大CPU时间" }, { Name: "执行时间" }, { Name: "最小执行时间" }, { Name: "最大执行时间" }, { Name: "影响行数" }, { Name: "最小影响行数" }, { Name: "最大影响行数" }],
                queryProportionInfo: [],
                xaxis: [],
                page: {
                    pageIndex: 1,
                    pageSize: 50,
                    totle: 0,
                    pageCount: 0
                },
            },

            memory: {
                memoryinfos: [],
                xaxis: [],
                memorydatas: [],
                fields: [{ Name: "使用率" }, { Name: "使用量" }, { Name: "总内存" }, { Name: "时间" }]
            },

            disk: {
                disks: []
            },

            pageId: 0,

            switchTo: function (pageId) {
                this.pageId = pageId;
            }
        }

        var config = [
            { id: 11, func: [getCPUInfos] },
            { id: 21, func: [getMemoryInfos] },
            { id: 31, func: [getDiskInfos] },
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

        function getConnectedSummary() {
            report.getConnectedSummary().then(function (infos) {
                var connecteds = [];
                var xaxis = [];
                for (var i in infos) {
                    connecteds.push([parseInt(i), infos[i].Total]);
                    xaxis.push([parseInt(i), infos[i].Ip]);
                }
                $scope.vm.connected.connectedSummary = [{ data: connecteds, label: "登录次数", lines: { show: false }, points: { show: false } }];
                $scope.vm.connected.xaxis = xaxis;
            });
        }

        function getConnectedInfos() {
            report.getConnectedInfos().then(function (infos) {
                var connecteddatas = [];
                for (var i in infos) {
                    connecteddatas.push({
                        rows: {
                            IP: infos[i].Ip,
                            EventTime: infos[i].EventTime
                        }
                    });
                }
                $scope.vm.connected.connecteddatas = connecteddatas;
            });
        }

        function getExceptionInfos() {
            report.getExceptionInfos().then(function (infos) {
                var exceptiondatas = [];
                for (var i in infos) {
                    exceptiondatas.push({
                        rows: {
                            EventTime: infos[i].EventTime,
                            Messuige: infos[i].Messuige
                        }
                    });
                }
                $scope.vm.exception.exceptiondatas = exceptiondatas;
            });
        }

        $scope.vm.query.jump = function (pageIndex) {
            $scope.vm.query.page.pageIndex = pageIndex;
            getQueryHistories();
        }

        function getQueryHistories() {
            report.getQueryHistories($scope.vm.query.page).then(function (history) {
                var historydatas = [];
                var histories = history.QueryHistories;
                for (var i in histories) {
                    historydatas.push({ rows: histories[i] });
                }
                $scope.vm.query.historydatas = historydatas;
                $scope.vm.query.page = {
                    pageIndex: history.PageIndex,
                    pageSize: history.PageSize,
                    totle: 0,
                    pageCount: history.PageCount,
                }
            });
        }

        function getAllQueryProportionInfo() {
            report.getAllQueryProportionInfo().then(function (info) {
                var proportionInfo = [];
                proportionInfo.push([0, info.SelectCount]);
                proportionInfo.push([1, info.DeleteCount]);
                proportionInfo.push([2, info.UpdateCount]);
                proportionInfo.push([3, info.InsertCount]);
                $scope.vm.query.queryProportionInfo = [{ data: proportionInfo, label: "查询次数", lines: { show: false }, points: { show: false } }];
                $scope.vm.query.xaxis = [[0, "Select"], [1, "Delete"], [2, "Update"], [3, "Insert"], ];
            });
        }

        function getMemoryInfos() {
            report.getMemoryInfos().then(function (infos) {
                var memoryinfos = [];
                var memorydatas = [];
                var xaxis = [];
                for (var i in infos) {
                    memoryinfos.push([parseInt(i), infos[i].MemoryUtilization]);
                    memorydatas.push({
                        rows: {
                            MemoryUtilization: infos[i].MemoryUtilization,
                            UseMemory: infos[i].UseMemory,
                            TotalMemory: infos[i].TotalMemory,
                            EventTime: infos[i].EventTime
                        }
                    });
                }
                var data = [
                    { data: memoryinfos, label: '内存使用率', lines: { show: true }, points: { show: true } },
                ];
                $scope.vm.memory.memoryinfos = data;
                $scope.vm.memory.xaxis = xaxis;
                $scope.vm.memory.memorydatas = memorydatas;
            });
        }

        function getDiskInfos() {
            report.getDiskInfos().then(function (infos) {
                var disks = [];
                for (var i in infos) {
                    var disk = {
                        databaseName: infos[i].DatabaseName,
                        diskinfos: [{ data: [[0, infos[i].UsedSpace]], label: '已使用空间', lines: { show: true }, points: { show: true } },
                        { data: [[0, infos[i].FreeSpace]], label: '空闲空间', lines: { show: true }, points: { show: true } }]
                    };
                    disks.push(disk);
                }
                $scope.vm.disk.disks = disks;
            });
        }

        $scope.$watch("vm.pageId", function (pageId) {
            for (var i in config) {
                if (config[i].id == pageId) {
                    for (var j in config[i].func) {
                        config[i].func[j]();
                    }
                }
            }
        });
    }
    angular.module("admin").controller("report.controller", ["$scope", "report.service", report_controller]);
})();