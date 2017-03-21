var template = "<div class='sa-window sa-connect'></div>"

angular.module("sqladmin", [])

.directive("saConnect", function ()
{
    return {
        restrict: "E",
        template: template,
        replace: true
    }
})

