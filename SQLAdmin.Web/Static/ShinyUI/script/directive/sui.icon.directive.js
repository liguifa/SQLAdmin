angular.module("shinyui.icon", [])

.directive("suiIcon",["icon.service",function (icon){
    var vm = {
        template: '<div ng-click="vm.icon_click()"></div>'
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 2,
        scope: {
            type: "=",
            click:"&",
        },
        controller: function ($scope)
        {
            $scope.vm = {
                code:"",
                icon:null,
                icon_click:function()
                {
                    $scope.click();
                }
            }
            $scope.$watch("type",function(type){
               $scope.vm.icon.innerHTML = "<i class='sui-icon'>"+ icon["icon_"+type]+"</i>";
            })
        },
        link:function($scope,elment,attrs){
            $scope.vm.icon = elment[0];
        }
    }
}])