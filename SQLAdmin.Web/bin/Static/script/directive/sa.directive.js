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
                                          <option ng-repeat='type in vm.types' value='type.id'>{{type.displayName}}</option>\
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
            cancel: '&',
            databaseTypes: "@",
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
                cancel: function ()
                {
                    $scope.cancel();
                },
                types:[]
            }
            document.onmouseup = vm.mouseup;

            $scope.$watch("databaseTypes", function (newValue)
            {
                newValue = JSON.parse(newValue);
                $scope.vm.types = [];
                for(var i in newValue)
                {
                    var type = {
                        id: newValue[i].Type,
                        displayName: newValue[i].DisplayName
                    };
                    $scope.vm.types.push(type);
                }
            })
        }
    }
})

.directive("saMenu", ["$http", "$compile", function ($http, $compile)
{
    var self = null;
    var stamp = {
        isViewMenu: false
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
        select: function (id)
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
                clearSubMenus: vm.clearSubMenus,
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
                            <div class='sa-explorer-content'>\
                                <div ng-transclude></div>\
                            </div>\
                        </div>\
                   </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude: true,
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
                        <div class='sa-tabs-panel' ng-transclude></div>\
                   </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        transclude: true,
        scope: {
        },
        controller: function ($scope)
        {
        }
    }
})

.directive('saTree', function ()
{
    var vm = {
        template: "<ul class='sa-tree-ul'>\
                        <li class='sa-tree-li'>\
                            <i class='sa-icon-arrow-right' ng-click='vm.spread()' />\
                            <span class='sa-tree-children'>\
                                <i class='sa-icon-folder' />\
                                <span>{{vm.tree.Name}}</span>\
                                <ul class='sa-tree-ul' ng-show='vm.tree.isShow'>\
                                    <li class='sa-tree-li' ng-repeat='tree in vm.tree.Children'>\
                                        <span class='sa-tree-children'>\
                                            <i class='sa-icon-arrow-right' ng-click='vm.spread()' />\
                                            <i class='sa-icon-folder' />\
                                            <span>{{tree.Name}}</span>\
                                            <ul class='sa-tree-ul'>\
                                                <li class='sa-tree-li' ng-repeat='tree in tree.Children' sa-contextmenu contextmenu-id='{{tree.Id}}'>\
                                                    <i class='sa-icon-arrow-right' ng-click='vm.getTables(tree.Name)' />\
                                                    <i class='sa-icon-folder' />\
                                                    <span>{{tree.Name}}</span>\
                                                    <div id='{{tree.Id}}' class='sa-contextmenu'>\
                                                        <ul><li><div class='sa-contextmenu-i'></div><div class='sa-contextmenu-title'>新建查询</div></li>\
                                                        <li><div class='sa-contextmenu-i'></div><div class='sa-contextmenu-title'>新建数据库</div></li>\
                                                        <li><div class='sa-contextmenu-i'></div><div class='sa-contextmenu-title'>重命名</div></li>\
                                                        <li><div class='sa-contextmenu-i'></div><div class='sa-contextmenu-title'>删除</div></li>\
                                                        <li><div class='sa-contextmenu-i'></div><div class='sa-contextmenu-title'>刷新</div></li>\
                                                        <li><div class='sa-contextmenu-i'></div><div class='sa-contextmenu-title'>属性</div></li>\</ul>\
                                                    </div>\
                                                </li>\
                                           </ul>\
                                        </span>\
                                    </li>\
                               </ul>\
                           </span>\
                        </li>\
                   </ul>"
    };

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 2,
        scope: {
            tree: '=',
            getTables: "&",
        },
        controller: function ($scope)
        {
            $scope.vm = {
                tree: $scope.tree,
                spread: function ()
                {
                    $scope.vm.tree.isShow = !$scope.vm.tree.isShow;
                },
                getTables: function (table)
                {
                    $scope.getTables({ tableName: table });
                }
            }

            $scope.$watch("tree", function ()
            {
                $scope.vm.tree = $scope.tree;
                $scope.vm.tree.isShow = true;
            })
        },
    }
})

.directive("saContextmenu", function ()
{
    var vm = {
        template: "",
    }

    return {
        restrict: "A",
        template: "",
        replace: false,
        priority: 4,
        scope: {
            contextmenuId:"@"
        },
        controller: function ($scope) {
            $scope.vm = {
                visibility: false
            }
        },
        link: function ($scope, element, attrs) {
            element.bind("contextmenu", function (event) {
                $scope.$apply(function () {
                    var contextmenus = document.getElementsByClassName("sa-contextmenu");
                    for (var i in contextmenus)
                    {
                        if (contextmenus[i].style) {
                            contextmenus[i].style.visibility = "";
                        }
                    }
                    var contextmenu = document.getElementById($scope.contextmenuId);
                    contextmenu.style.visibility = "visible";
                })
            });
            document.onmousedown = function()
            {
                var contextmenus = document.getElementsByClassName("sa-contextmenu");
                for (var i in contextmenus) {
                    if (contextmenus[i].style) {
                        contextmenus[i].style.visibility = "";
                    }
                }
            }
        }
    }
})

.directive('saQueryPanel', function ()
{
    var vm = {
        template: "<div>\
                    <sa-datagrid></sa-datagrid>\
                   </div>"
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 2,
        scope: {
        },
        controller: function ($scope)
        {

        }
    }
})

.directive('saDatagrid', function ()
{
    var vm = {
        template: '<table class="sa-datagrid">\
    <colgroup>\
      <col width="50">\
      <col width="150">\
      <col width="150">\
      <col width="200">\
      <col>\
    </colgroup>\
    <thead>\
      <tr>\
        <th><input type="checkbox" name="" lay-skin="primary" lay-filter="allChoose"></th>\
        <th>人物</th>\
        <th>民族</th>\
        <th>出场时间</th>\
        <th>格言</th>\
      </tr> \
    </thead>\
<tbody>\
<tr><td colspan="5" class="sa-datagrid-content-td"><div class="sa-datagrid-content">\
    <table class="sa-datagrid">\
<colgroup>\
      <col width="50">\
      <col width="150">\
      <col width="150">\
      <col width="200">\
      <col>\
    </colgroup>\
<tbody>\
      <tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>贤心</td>\
        <td>汉族</td>\
        <td>1989-10-14</td>\
        <td>人生似修行</td>\
      </tr>\
      <tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>张爱玲</td>\
        <td>汉族</td>\
        <td>1920-09-30</td>\
        <td>于千万人之中遇见你所遇见的人，于千万年之中，时间的无涯的荒野里…</td>\
      </tr>\
      <tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>Helen Keller</td>\
        <td>拉丁美裔</td>\
        <td>1880-06-27</td>\
        <td> Life is either a daring adventure or nothing.</td>\
      </tr>\
      <tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>岳飞</td>\
        <td>汉族</td>\
        <td>1103-北宋崇宁二年</td>\
        <td>教科书再滥改，也抹不去“民族英雄”的事实</td>\
      </tr>\
      <tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
<tr>\
        <td><input type="checkbox" name="" lay-skin="primary"></td>\
        <td>孟子</td>\
        <td>华夏族（汉族）</td>\
        <td>公元前-372年</td>\
        <td>猿强，则国强。国强，则猿更强！ </td>\
      </tr>\
</tbody>\
    </table>\
</div></td></tr>\
</tbody>\
  </table>'
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 2,
        scope: {
        },
        controller: function ($scope)
        {

        }
    }
})

.directive("saBlockquote", function ()
{
    var vm = {
        template: '<blockquote class="sa-blockquote"  ng-transclude></blockquote>'
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        transclude: true,
        priority: 1,
        scope: {
        },
        controller: function ($scope)
        {

        }
    }
})

.directive("saTools", function ()
{
    var vm = {
        template: '<div><sa-blockquote>\
                    <div clas="sa-tools-icon" ng-transclude>\
                    </div>\
                   </sa-blockquote></div>'
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        transclude: true,
        priority: 0,
        scope: {
        },
        controller: function ($scope)
        {

        }
    }
})


.directive("saIcon", ["messager.service",function (messager)
{
    var vm = {
        template: '<i class="{{icon_class}} sa-tool-icon" ng-click="vm.icon_click()"></i> '
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 2,
        scope: {
            type: "@",
            click:"&",
        },
        controller: function ($scope)
        {
            $scope.icon_class = "sa-icon-" + $scope.type;
            $scope.vm = {
                icon_click:function()
                {
                    $scope.click();
                }
            }
        }
    }
}])

.directive("saPagination", function ()
{
    var vm = {
        template: '<div class="sa-pagination">\
                    <ul>\
                        <li><a href="javascript:;" data-page="2">上一页</a></li>\
                        <li><a href="javascript:;" data-page="2">1</a></li>\
                        <li><a href="javascript:;" data-page="2" class="sa-pagination-active">2</a></li>\
                        <li><a href="javascript:;" data-page="2">3</a></li>\
                        <li><a href="javascript:;" data-page="2">4</a></li>\
                        <li><a href="javascript:;" data-page="2">5</a></li>\
                        <li><a href="javascript:;" data-page="2">6</a></li>\
                        <li><a href="javascript:;" data-page="2">7</a></li>\
                        <li><a href="javascript:;" data-page="2">8</a></li>\
                        <li><a href="javascript:;" data-page="2">9</a></li>\
                        <li><a href="javascript:;" data-page="2">10</a></li>\
                        <li><a href="javascript:;" data-page="2">下一页</a></li>\
                    </ul>\
                   </div>'
    };

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
        },
        controller: function ($scope)
        {

        }
    }
})

.directive("saAlert", function (messager)
{
    var vm = {
        template: '<div class="sa-alert">\
                    <div class="sa-alert-title">信息</div>\
                    <div class="sa-alert-content">居中弹出</div>\
                    <button class="sa-alert-ok">确定</button>\
                  </div>'
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
        },
        controller: function($scope)
        {
        }
    }
})