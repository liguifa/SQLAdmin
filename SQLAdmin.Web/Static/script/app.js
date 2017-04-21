(function () {
    function session_interceptor($q, session, messager) {
        var _interceptor = {
            request: function (config) {
                var dbConfig = session.get("config");
                if (dbConfig != null) {
                    config.headers["databaseConfig"] = JSON.stringify(dbConfig);
                }
                messager.loading();
                return config;
            },
            responseError:function(config)
            {
                messager.error("一个错误发生。");
                return config;
            },
            response: function (config)
            {
                messager.loading(true);
                return config;
            }
        }

        return _interceptor;
    }

    angular.module("sqladmin").factory("session.interceptor", ["$q","session.service", "messager.service" ,session_interceptor]);

    angular.module("sqladmin").config(function ($httpProvider) {
        $httpProvider.interceptors.push("session.interceptor");
        document.oncontextmenu = function () { return false; }
    });
    
})();