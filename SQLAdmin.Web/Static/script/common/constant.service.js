(function () {
    function constant_service() {
        return {
            CONNECTED: "connected",
            SELECT: "SELECT",
            CPU: "getcpuinfo",
            Memory: "getmemoryinfo",
            CONNECT_INFO: "getconnectinfo",
            DELETE_DB:"delete_db"
        }
    }

    angular.module("admin").factory("constant.service", constant_service);
})();