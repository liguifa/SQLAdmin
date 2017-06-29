(function () {
    function layout_directive(guid) {
        return {
            restrict: "E",
            template: "<div id='{{vm.id}}' ng-transclude></div>",
            replace: true,
            transclude: true,
            scope: {
            },
            controller: function ($scope) {
                $scope.vm = {
                    id: guid.newGuid(),
                    resize: function () {
                        var height = document.body.clientHeight;
                        var layout = document.getElementById($scope.vm.id);
                        layout.style.height = height + "px";
                    }
                },
                window.onresize = $scope.vm.resize;
                window.onload = $scope.vm.resize;
            }
        }
    }

    angular.module("admin").directive("saLayout", ["guid.service", layout_directive])
})()