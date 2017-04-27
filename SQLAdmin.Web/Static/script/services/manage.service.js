(function () {
    function manage_service($http) {
        //public string TableName { get; set; }

        //public int PageIndex { get; set; }

        //public int PageSize { get; set; }

        //public string SortColumn { get; set; }

        //public bool IsAsc { get; set; }
        function _filter() {
            $http.post("/Manage/Get", { TableName: "[test].[dbo].[nAME]", SortColumn: "Age", IsAsc: true }).then(function (data) {
                console.log(data);
            });
        }

        return {
            filter: _filter
        }
    }

    angular.module("admin").factory("manage.service", ["$http", manage_service]);
})();