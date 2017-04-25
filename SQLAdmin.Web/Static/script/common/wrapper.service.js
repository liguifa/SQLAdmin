(function () {
    function wrapper_service() {
        

        function _wrapperFn(func) {

        }

        function _before(func) {

        }

        return {
            wrapperFn: _wrapperFn,
            before: _before
        }
    }

    angular.module("sqladmin").factory("wrapper.service", wrapper_service);
})();