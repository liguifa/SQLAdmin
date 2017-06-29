(function () {
    function guid_service() {
        var idNumber = 8;
        var index = 0
        function _newId() {
            return Math.floor((1 + Math.random() + index) * 0x10000)
                     .toString(16)
                     .substring(1);
        }

        function _newGuid() {
            index++;
            var guidId = "";
            for (var i = 0; i < idNumber; i++) {
                guidId += _newId();
                if (i != idNumber - 1) {
                    guidId += "-";
                }
            }
            return guidId;
        }

        return {
            newGuid: _newGuid
        }
    }

    angular.module("sqladmin").factory("guid.service", guid_service);
})();