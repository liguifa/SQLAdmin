(function () {
    function constant_service() {
        return {
            CONNECTED: "connected",
            SELECT: "SELECT",
            CPU: "getcpuinfo",
            Memory: "getmemoryinfo",
            CONNECT_INFO: "getconnectinfo",
            DELETE_DB: "delete_db",
            EXCEPTION: "geterrorinfo",
            MONITOR: "monitor",
            QUERYHISTORY:"query_history"
        }
    }

    angular.module("admin").factory("constant.service", constant_service);
})();