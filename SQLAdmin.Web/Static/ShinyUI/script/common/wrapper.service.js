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

    angular.module("shinyui").factory("wrapper.service", wrapper_service);
})();