angular.module("sqladmin", [])

.directive("saConnect", function ()
{
    var stamp = {
        isMove: false,
        mouse: { left: 0, top: 0 }
    }

    var vm = {
        template: "<div><div class='sa-window sa-connect'>\
                        <div class='sa-border' ng-mousedown='vm.mousedown($event)' ng-mousemove='vm.move($event)' ng-mouseup='vm.mouseup($event)'>\
                              <div class='sa-content' ng-mousedown='retun false;'  ng-mousemove='retun false;'>\
                                  <div class='sa-title'>Database Connection</div>\
                                  <div class='sa-form'>\
                                      <div>\
                                          <label>类别:</label>\
                                          <select class='sa-connect-input'>\
                                          <option>SQL Server</option>\
                                          </select>\
                                      </div>\
                                      <div>\
                                          <label>地址:</label>\
                                          <input type='text' class='sa-connect-input' ng-model='info.address'/>\
                                      </div>\
                                      <div>\
                                          <label>端口:</label>\
                                          <input type='text' class='sa-connect-input' ng-model='info.port'/>\
                                      </div>\
                                      <div>\
                                          <label>账号:</label>\
                                          <input type='text' class='sa-connect-input' ng-model='info.username'/>\
                                      </div>\
                                      <div>\
                                          <label>密码:</label>\
                                          <input type='password' class='sa-connect-input' ng-model='info.password'/>\
                                      </div>\
                                  </div>\
                                  <div class='sa-connect-footer'>\
                                      <button class='sa-button' ng-click='vm.determine()'>确定</button>\
                                      <button class='sa-button'  ng-click='vm.cancel()'>取消</button>\
                                  </div>\
                            </div>\
                        </div>\
                 </div>\
                 <div class='sa-mask'></div></div>",

        mousedown: function ($event)
        {
            stamp.isMove = true;
            stamp.mouse = { left: $event.clientX, top: $event.clientY };
        },

        mouseup: function ($event)
        {
            stamp.isMove = false;
        },

        move: function ($event)
        {
            if (stamp.isMove)
            {
                var saWindow = document.getElementsByClassName('sa-window')[0];
                var x = $event.clientX - stamp.mouse.left;
                var y = $event.clientY - stamp.mouse.top;
                saWindow.style.left = saWindow.offsetLeft + x + 'px';
                saWindow.style.top = saWindow.offsetTop + y + 'px';
                stamp.mouse = { left: $event.clientX, top: $event.clientY };
            }
        }
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        scope: {
            //type: '@',
            //address: '@',
            //port: '@',
            //username: '@',
            //password: '@',
            determine: '&',
            cancel:'&',
        },
        controller: function ($scope)
        {
            $scope.vm = {
                mousedown: vm.mousedown,
                move: vm.move,
                mouseup: vm.mouseup,
                determine: function ()
                {
                    $scope.determine({ args: $scope.info });
                },
                cancel:function()
                {
                    $scope.cancel();
                }
            }
            document.onmouseup = vm.mouseup;
        }
    }
})

.directive("saMenu", ["$http", "$compile", function ($http, $compile)
{
    var self = null;
    var stamp = {
        isViewMenu : false
    }
    var vm = {
        template: "<div class='sa-menu'>\
                        <ul class='sa-menu-list'>\
                            <li class='sa-menu-item' ng-repeat='menu in vm.menus'>\
                                <div class='sa-menu-item-title' ng-click='vm.select(menu.Id)'>{{menu.Title}}</div>\
                                <ul ng-if='menu.IsSelect' class='sa-menu-subs' style='left:{{$index*56.5+\"px\"}}'>\
                                    <li ng-repeat='sub in menu.Subs'><img class='sa-menu-item-subs-icon' ng-src='{{sub.Icon}}' /><span class='sa-menu-item-subs-title' ng-click='vm.Command(sub)'>{{sub.Title}}</span><div class='sa-clear'></div></li>\
                                </ul>\
                            </li>\
                        </ul>\
                   </div>",
        select:function (id)
        {
            for (var i in self.vm.menus)
            {
                if (self.vm.menus[i].Id == id)
                {
                    self.vm.menus[i].IsSelect = true;
                    stamp.isViewMenu = true;
                }
                else
                {
                    self.vm.menus[i].IsSelect = false;
                }
            }
        },
        clearSubMenus: function ()
        {
            if (!stamp.isViewMenu)
            {
                self.$apply(function ()
                {
                    for (var i in self.vm.menus)
                    {
                        self.vm.menus[i].IsSelect = false;
                    }
                });
            }
        },
        Command: function (sub)
        {
            self.select({ menu: sub });
            stamp.isViewMenu = false;
        }
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        scope: {
            select: '&',
            menus: '='
        },
        controller: function ($scope)
        {
            $scope.vm = {
                menus: $scope.menus,
                select: vm.select,
                clearSubMenus:vm.clearSubMenus,
                Command: vm.Command,
            }
            document.onmousedown = $scope.vm.clearSubMenus;
            self = $scope;

            $scope.$watch("menus", function (menus)
            {
                $scope.vm.menus = menus;
            })
        }
    }
}])

.directive('saExplorer', function ()
{
    var vm = {
        template: "<div class='sa-explorer'>\
                        <div class='sa-explorer-title'></div>\
                        <div class='sa-explorer-tool'></div>\
                        <div class='sa-explorer-panel'>\
                            <div class='sa-explorer-content'></div>\
                        </div>\
                   </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        scope: {
        },
        controller: function ($scope)
        {
        }
    }
})

.directive('saTabs', function ()
{
    var vm = {
        template: "<div class='sa-tabs'>\
                        <div class='sa-tabs-title'></div>\
                        <div class='sa-tabs-panel'></div>\
                   </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        scope: {
        },
        controller: function ($scope)
        {
        }
    }
})