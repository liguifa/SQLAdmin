(function () {
    function constant_service() {
        return {
            CONNECTED: "connected",
            SELECT: "SELECT",
            CPU: "getcpuinfo",
        }
    }

    angular.module("admin").factory("constant.service", constant_service);
})();