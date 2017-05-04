(function () {
    function wrapper_service() {
        function _getInstance(func) {
            return (function () {
                var _func = func;

                function _before() {
                    return function (func) {
                        func();
                        _func();
                    }
                }

                function _after() {
                    return function (func) {
                        _func();
                        func();
                    }
                }

                return {
                    before: _before,
                    after: _after
                }
            })();
        }

        return {
            getInstance: _getInstance
        }
    }

    angular.module("sqladmin").factory("wrapper.service", wrapper_service);
})();