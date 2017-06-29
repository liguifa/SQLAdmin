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
                    self.vm.isViewMenu = true;
                }
                else
                {
                    self.vm.menus[i].IsSelect = false;
                }
            }
        },
        clearSubMenus: function ()
        {
            if (!self.vm.isViewMenu)
            {
                try
                {
                    self.$apply(function ()
                    {
                        for (var i in self.vm.menus)
                        {
                            self.vm.menus[i].IsSelect = false;
                        }
                    });
                }
                catch(e)
                {

                }
            }
        },
        Command: function (sub)
        {
            self.select({ menu: sub });
            self.vm.isViewMenu = false;
            return false;
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
                isViewMenu: false
            }
            var func = document.onmousedown;
            document.onmousedown = function()
            {
                if (func)
                {
                    func();
                }
                $scope.vm.clearSubMenus();
            }
            self = $scope;

            $scope.$watch("menus", function (menus) {
                $scope.vm.menus = menus;
            });

            $scope.$watch("vm.isViewMenu", vm.clearSubMenus)
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

.directive('saTabs', ["guid.service", "$http", "$compile", function (guid, $http, $compile)
{
    var vm = {
        id: guid.newGuid(),
        template: "<div class='sa-tabs' id='{{vm.id}}'>\
                    <div class='sa-tabs-tab' ng-repeat='page in vm.pages' id='{{page.id}}' style='z-index:{{page.isSelected?990:989}}'>\
                        <div class='sa-tabs-title' style='left:{{$index*210}}px' ng-click='vm.click_title(page.id)'>{{page.title}}</div>\
                        <div class='sa-tabs-panel' ng-if='page.isSelected'><div class='sa-tabs-panel-include' ng-include src='page.url'></div></div>\
                    </div>\
                   </div>",
        build: function ($scope,pages) {
            var self = this;
            for (var i in pages)
            {
                $http.get(pages[i].url).then(function (data) {
                    var tabs = document.getElementById(self.id);
                    var tab = document.createElement("div");
                    tab.classList.add("sa-tabs-tab");
                    tab.attributes["data-tab-id"] = pages[i].id;
                    var title = document.createElement("div");
                    title.classList.add("sa-tabs-title");
                    title.style.left = (i * 90) + "px";
                    var panel = document.createElement("div");
                    panel.appendChild($compile(data.data)($scope)[0]);
                    panel.classList.add("sa-tabs-panel");
                    tab.appendChild(title);
                    tab.appendChild(panel);
                    tabs.appendChild(tab);
                });
            }
        }
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        transclude: true,
        scope: {
            pages:"=",
        },
        controller: function ($scope)
        {
            $scope.vm = {
                id: vm.id,
                click_title:function(panel_id)
                {
                    //var panels = document.getElementsByClassName("sa-tabs-tab");
                    //for (var i = 0; i < panels.length; i++)
                    //{
                    //    panels[i].style.zIndex = 997;
                    //}
                    //document.getElementById(panel_id).style.zIndex = 998;
                    for(var i in $scope.vm.pages)
                    {
                        if($scope.vm.pages[i].id == panel_id)
                        {
                            $scope.vm.pages[i].isSelected = true;
                        }
                        else
                        {
                            $scope.vm.pages[i].isSelected = false;
                        }
                    }
                }
            }
            $scope.$watch("pages", function (pages) {
                $scope.vm.pages = [];
                pages.forEach(function (item) {
                    var page = {
                        isSelected: false,
                        url: item.url,
                        id: item.id,
                        title: item.title
                    }
                    $scope.vm.pages.push(page);
                });
                if ($scope.vm.pages[$scope.vm.pages.length - 1]) {
                    $scope.vm.pages[$scope.vm.pages.length - 1].isSelected = true;
                }
            },true);
        }
    }
}])

.directive('saTree', function ()
{
    var vm = {
        scope:null,
        id:new Date().getTime(),
        isRoot:false,
        template: "<div id='{{vm.id}}' ng-transclude></div>",
        clickCall:null,
        build: function (tree) {
            var self = this;
            var treeElement = document.getElementById(this.id);
            if (treeElement) {
                var rootElement = document.createElement("ul");
                rootElement.classList.add("sa-tree-ul");
                if (tree != null) {
                    rootElement.appendChild(this.buildNode(tree));
                }
                treeElement.innerHTML = "";
                treeElement.appendChild(rootElement);
                treeElement.oncontextmenu = function (e) {
                    e = e || window.event; 　//IE window.event
                    var t = e.target || e.srcElement; //目标对象
                    if (e.type == "contextmenu") {
                        var contextmenus = document.getElementsByClassName("sa-contextmenu");
                        for (var i in contextmenus) {
                            if (contextmenus[i].style) {
                                contextmenus[i].style.visibility = "";
                            }
                        }
                        var contextmenuId = t.id;
                        var contextmenu = document.getElementById("contextmenu-" + contextmenuId);
                        contextmenu.style.visibility = "visible";
                    }
                };
                treeElement.ondblclick = function (e) {
                    clearTimeout(self.clickCall);
                    e = e || window.event; 　//IE window.event
                    var t = e.target || e.srcElement; //目标对象
                    var treeId = t.attributes["tree-id"];
                    var selectTree = self.getTreeById(tree, treeId);
                    self.scope.doubleclick({ tree: selectTree });
                }

                treeElement.onclick = function (e) {
                    clearTimeout(self.clickCall);
                    self.clickCall = setTimeout(function () {
                        e = e || window.event; 　//IE window.event
                        var t = e.target || e.srcElement; //目标对象
                        if (t && t.className == "sa-icon-arrow-right") {
                            var is_load  = t.attributes["is_load"] = true;
                            var is_spread = t.attributes["is_spread"] = true;
                            if (is_load) {
                                var children_Id = t.attributes["children_Id"];
                                document.getElementById(children_Id).style.visibility = is_spread ? "hidden" : "visible";
                                document.getElementById(t.id).attributes["is_spread"] = !is_spread;
                            }
                        }
                        else {
                            var command = t.attributes["command"].value;
                            self.scope.menuCommand({ command: command, args: t.parentElement.parentElement.parentElement.parentElement.childNodes[1].textContent });
                        }
                        self.clearMenus();
                    },300);
                }
            }
        },
        buildNode: function (tree) {
            var self = this;
            var treeNode = document.createElement("li");
            treeNode.classList.add("sa-tree-li");
            var arrowNode = document.createElement("i");
            arrowNode.classList.add("sa-icon-arrow-right");
            var childId = self.guid();
            arrowNode.attributes["children_Id"] = childId;
            arrowNode.attributes["is_load"] = false;
            arrowNode.attributes["is_spread"] = false;
            arrowNode.id = self.guid();
            var contextNode = document.createElement("span");
            contextNode.classList.add("sa-tree-children");
            var iconNode = document.createElement("i");
            iconNode.classList.add("sa-icon-folder");
            var nameNode = document.createElement("span");
            nameNode.textContent = tree.Name;
            nameNode.attributes["tree-id"] = tree.Id;
            var childrenNode = document.createElement("ul");
            childrenNode.classList.add("sa-tree-ul");
            childrenNode.id = childId;
            treeNode.appendChild(arrowNode);
            treeNode.appendChild(contextNode);
            contextNode.appendChild(iconNode);
            contextNode.appendChild(nameNode);
            var outContextmenus = [];
            angular.forEach(this.contextmenus, function (contextmenu) {
                if (contextmenu) {
                    if (contextmenu.attributes["contextmenu-type"].value == "database") {
                        var newContextmenu = document.createElement("div");
                        newContextmenu.innerHTML = contextmenu.innerHTML;
                        newContextmenu.classList = newContextmenu.classList;
                        contextNode.appendChild(newContextmenu);
                        var contextmenuId = self.guid();
                        nameNode.id = contextmenuId;
                        newContextmenu.id = "contextmenu-" + contextmenuId;
                        newContextmenu.classList.add("sa-contextmenu");
                        this.push(contextmenu);
                    }
                }
            }, outContextmenus);
            contextNode.appendChild(childrenNode);

            this.contextmenus = outContextmenus;
            if (tree.Children) {
                if (tree.Children.length > 0) {
                    treeNode.classList.add("sa-tree-li-children");
                    arrowNode.attributes["is_load"] = true;
                    arrowNode.attributes["is_spread"] = true;
                }
                for (var i in tree.Children) {
                    childrenNode.appendChild(this.buildNode(tree.Children[i]));
                }
            }
            return treeNode;
        },
        contextmenus: [],
        contextmenuClick: function () {
            var contextmenus = document.getElementsByClassName("sa-contextmenu");
            for (var i in contextmenus) {
                if (contextmenus[i].style) {
                    contextmenus[i].style.visibility = "";
                }
            }
            var contextmenu = document.getElementById($scope.contextmenuId);
            contextmenu.style.visibility = "visible";
        },
        guid: function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                  .toString(16)
                  .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
              s4() + '-' + s4() + s4() + s4();
        },
        getTreeById: function (tree, id) {
            if (tree.Id && tree.Id == id) {
                return tree;
            }
            if (tree.Children) {
                for (var i in tree.Children) {
                    var selectTree = this.getTreeById(tree.Children[i], id);
                    if (selectTree) {
                        return selectTree;
                    }
                }
            }
        },
        clearMenus: function () {
            var contextmenus = document.getElementsByClassName("sa-contextmenu");
            for (var i in contextmenus) {
                if (contextmenus[i].style) {
                    contextmenus[i].style.visibility = "";
                }
            }
        }
    };

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        transclude: true,
        priority: 2,
        scope: {
            tree: '=',
            doubleclick: "&",
            menuCommand:"&"
        },
        controller: function ($scope) {
            $scope.vm = {
                tree: $scope.tree,
                id: vm.id,
                spread: function () {
                    $scope.vm.tree.isShow = !$scope.vm.tree.isShow;
                },
                getTables: function (table) {
                    $scope.getTables({ tableName: table });
                },
            }

            $scope.$watch("tree", function () {
                vm.build($scope.tree);
            },true)
            vm.scope = $scope;
        },
        link: function ($scope, element) {
            vm.contextmenus = element[0].getElementsByClassName("sa-contextmenu");
        }
    }
})

.directive("saContextmenu", function ()
{
    var vm = {
        template: "<div ng-click='vm.command(e)' ng-transclude></div>",
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        transclude:true,
        priority: 1,
        scope: {
            contextmenuId: "@",
            click:"&"
        },
        controller: function ($scope) {
            $scope.vm = {
                visibility: false,
                command: function (e) {
                    e = e || window.event; 　//IE window.event
                    var t = e.target || e.srcElement; //目标对象
                    var commandName = t.attributes["command"];
                    $scope.click({ command: commandName });
                }
            }

        },
        link: function ($scope, element, attrs) {
            element.contextmenu = function (event) {
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
            }
            var func = document.onmousedown;
            document.onmousedown = function(e)
            {
                func();
                e = e || window.event; 　//IE window.event
                var t = e.target || e.srcElement; //目标对象
                if (!(t && t.claaName && t.claaName == "sa-contextmenu-title")) {
                    var contextmenus = document.getElementsByClassName("sa-contextmenu");
                    for (var i in contextmenus) {
                        if (contextmenus[i].style) {
                            contextmenus[i].style.visibility = "";
                        }
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

.directive('saDatagrid', ["guid.service",function (guid)
{
    var vm = {
        template: '<div class="sa-datagrid-content">\
    <table class="sa-datagrid">\
        <thead>\
      <tr>\
        <th><input type="checkbox" name="" ng-change="vm.globalChecked()" ng-model="vm.isGlobalSelected" lay-skin="primary" lay-filter="allChoose"></th>\
        <th ng-repeat="field in vm.fields" ng-click="vm.sort(field.name)">\
            {{field.name}}\
            <div class="sa-datagrid-content-header-icon" ng-if="field.isPrimary"><img src="/Static/Images/icon_key.png" /></div>\
            <div class="sa-datagrid-content-sort-icon sa-icon-sort-asc" ng-if="field.isSort && field.isAsc"></div>\
            <div class="sa-datagrid-content-sort-icon sa-icon-sort-desc" ng-if="field.isSort && !field.isAsc"></div>\
        </th>\
      </tr> \
    </thead>\
<tbody>\
      <tr ng-repeat="row in datas">\
        <td><input type="checkbox" name="" ng-model="row.isSelected" lay-skin="primary"></td>\
        <td ng-repeat="(key,val) in row.rows track by $index"><sa-field type="val.Type" value="val.Value" model="row.model"></sa-field></td>\
      </tr>\
</tbody>\
    </table>\
</div>',
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 2,
        scope: {
            datas: "=",
            fields: "=",
            indexs: "=",
            sort:"&"
        },
        controller: function ($scope) {
            $scope.vm = {
                isGlobalSelected: false,
                globalChecked: function () {
                    for (var i in $scope.datas)
                    {
                        $scope.datas[i].isSelected = this.isGlobalSelected;
                    }
                },
                sort: function (name) {
                    var sortMap = $scope.vm.sortMap.filter(function (map) {
                        return map.name == name;
                    })[0];
                    if (sortMap) {
                        sortMap.isAsc = !sortMap.isAsc;
                    }
                    else {
                        sortMap = {
                            name: name,
                            isAsc: true
                        }
                        $scope.vm.sortMap.push(sortMap);
                    }
                    $scope.sort({ name: name, isAsc: sortMap.isAsc });
                    $scope.vm.fields.forEach(function (field) {
                        if (field.name == name) {
                            field.isAsc = sortMap.isAsc;
                            field.isSort = true;
                        }
                        else {
                            field.isSort = false;
                        }
                    });
                },
                sortMap:[]
            };

            $scope.$watch("datas", function (datas) {
                $scope.vm.isGlobalSelected = false;
                $scope.vm.globalChecked();
            });

            $scope.$watch("fields", function (fields) {
                $scope.vm.fields = [];
                for (var i in fields)
                {
                    var f = {
                        name: fields[i].Name,
                        isPrimary:false,
                        isForeign: false,
                        isSort:false
                    };
                    $scope.vm.fields.push(f);
                }
            });

            $scope.$watch("indexs", function (indexs) {
                for (var i in $scope.fields)
                {
                    for (var j in indexs)
                    {
                        if(indexs[j].ColumnName == $scope.vm.fields[i].name)
                        {
                            $scope.vm.fields[i].isPrimary = indexs[j].Type == 0;
                            $scope.vm.fields[i].isForeign = indexs[j].Type == 1;
                        }
                    }
                }
            })

            $scope.$watch("datas", function (datas) {
                console.log(datas);
            },true)
        }
    }
}])

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
                        <li ng-repeat="page in vm.pages"><a href="{{page.url}}" data-page="2" class="{{page._class}}" ng-click="vm.jump(page.index)">{{page.text}}</a></li>\
                    </ul>\
                   </div>',
        buildPages: function (page, pageNumber) {
            var pages = [];
            var startNumber = page.pageIndex <= pageNumber / 2 ? 1 : page.pageIndex - pageNumber / 2 + 1;
            var minPageNumber = Math.min(startNumber + pageNumber - 1, page.pageCount);
            if (page.pageIndex != 1)
            {
                var inPage = {
                    url: "javascripe:#",
                    text: "上一页",
                    _class: "",
                    index: page.pageIndex - 1
                }
                pages.push(inPage);
            }
            for (var i = startNumber ; i <= minPageNumber; i++)
            {
                var inPage = {
                    url: "javascripe:#",
                    text: i,
                    _class: i == page.pageIndex ? "sa-pagination-active" : "",
                    index: i
                };
                pages.push(inPage);
            }
            if (page.pageIndex != page.pageCount)
            {
                var inPage = {
                    url: "javascripe:#",
                    text: "下一页",
                    _class: "",
                    index: page.pageIndex + 1
                }
                pages.push(inPage);
            }
            return pages;
        }
    };

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            page: "=",
            pageNumber: "=",
            click:"&"
        },
        controller: function ($scope)
        {
            $scope.vm = {};
            $scope.pageNumber = 10;
            $scope.$watch("page", function (page) {
                $scope.vm.pages = vm.buildPages(page,10);
            }, true);
            //$scope.$watch("pageNumber", function (number) {
            //    $scope.vm.pages = vm.buildPages($scope.page, number);
            //});
            $scope.vm.jump = function (index) {
                $scope.click({ pageIndex: index });
            }
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

.directive("saSearch",function(){
    var vm = {
        template: '<div class="sa-search">\
                        <select class="sa-search-select" ng-model="vm.searchKey.key">\
                            <option ng-repeat="field in vm.fields" value="{{field.Name}}">{{field.Name}}</option>\
                        </select>\
                        <input type="text" class="sa-connect-input sa-search-input" placeholder="{{vm.placeholder}}" ng-model="vm.searchKey.value" />\
                        <button class="sa-button sa-search-button" ng-click="vm.search()">搜索</bitton>\
                   </div>'
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            placeholder: "=",
            search: "&",
            fields: "=",
           
        },
        controller: function ($scope) {
            $scope.vm = {
                search: function () {
                    $scope.search({ searchKey: $scope.vm.searchKey });
                },
                searchKey: { key:"",value:""}
            }
            $scope.$watch("placeholder", function (placeholder) {
                $scope.vm.placeholder = placeholder;
            });
            $scope.$watch("fields", function (fields) {
                $scope.vm.fields = fields;
                $scope.vm.searchKey.key = fields[0].Name;
            });
            $scope.$watch("vm.searchField", function (key) {
                $scope.searchKey.key = key;
            });
            $scope.$watch("vm.searchKey", function (value) {
                $scope.searchKey.value;
            })
        }
    }
})

.directive("saMultiselect", ["guid.service",function (guid) {
    var  vm = {
        template:"<div class='sa-multiselect'>\
                    <input type='text' readonly class='sa-multiselect-text' ng-model='vm.text' ng-click='vm.startSelect()' />\
                    <div ng-if='vm.isSelecting' class='sa-multiselect-field'>\
                        <ul>\
                            <li ng-repeat='field in vm.fields'><input type='checkbox' ng-model='field.IsSelect'/><span>{{field.Name}}</span></li>\
                        </ul>\
                        <div class='sa-multiselect-button'>\
                            <button class='sa-button' ng-click='vm.select()'>确认</button>\
                            <button class='sa-button' ng-click='vm.cancel()'>取消</button>\
                            <div class='sa-clear'></div>\
                        </div>\
                    </div>\
                  </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            fields: "=",
            select:"&"
        },
        controller: function ($scope) {
            $scope.vm = {
                text: "全部",
                isSelecting: false,
                startSelect: function () {
                    $scope.vm.isSelecting = true;
                },
                cancel: function () {
                    $scope.vm.isSelecting = false;
                },
                select: function () {
                    var selected = $scope.vm.fields.filter(function (field) {
                        return field.IsSelect;
                    });
                    $scope.select({ fields: selected });
                    $scope.vm.text = "选中" + selected.length + "项";
                    $scope.vm.isSelecting = false;
                }
            }
            $scope.$watch("fields", function (fields) {
                $scope.vm.fields = fields.map(function (field) {
                    field.IsSelect = true;
                    return field;
                });
            })
        }
    }
}])

.directive("saCalendar", function () {
    var vm = {
        template: "<div class='sa-calendar'>\
                    <div><input class='sa-calendar-text' type='text' readonly ng-model='vm.time' /><div class='sa-calendar-icon' ng-click='vm.startSelect()' ><img src='/Static/Images/icon_calendar.png' /></div></div>\
                    <div class='sa-calendar-select' ng-if='vm.isSelect'>\
                        <div class='sa-calendar-select-title'><div class='sa-calendar-select-title-span'><div class='sa-icon-left sa-calendar-select-title-span-left' ng-click='vm.bottomMonth()'></div><div class='sa-calendar-select-title-text'>{{vm.year}}年 {{vm.month}}月</div><div class='sa-icon-right sa-calendar-select-title-span-right' ng-click='vm.topMonth()'></div></div></div>\
                        <div class='sa-calendar-select-context'>\
                            <div class='sa-calendar-select-fields'>\
                                <ul><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul>\
                            </div>\
                                <table>\
                                    <tbody>\
                                        <tr ng-repeat='calendar in vm.calendars'><td ng-repeat='day in  calendar track  by $index' ng-class='{\"true\":\"sa-calendar-select-context-active\",\"false\":\"\" }[day == vm.day]' ng-click='vm.selectDay(day)'>{{day}}</td></tr>\
                                    </tbody>\
                                </table>\
                        </div>\
                        <div class='sa-calendar-select-footer'>\
                            <table>\
                                <tr>\
                                    <td class='sa-calendar-select-footer-time'><sa-number value='vm.hour'></sa-number></td>\
                                    <td class='sa-calendar-select-footer-time'>:</td>\
                                    <td class='sa-calendar-select-footer-time'><sa-number value='vm.minute'></sa-number></td>\
                                    <td class='sa-calendar-select-footer-time'>:</td>\
                                    <td class='sa-calendar-select-footer-time'><sa-number value='vm.second'></sa-number></td>\
                                    <td><button class='sa-button sa-calendar-select-footer-button' ng-click='vm.updateDate()'>确定</button></td>\
                                    <td><button class='sa-button sa-calendar-select-footer-button' ng-click='vm.cancel()'>取消</button></td>\
                                </tr>\
                            </table>\
                        </div>\
                    </div>\
                   </div>",
        getDateCalendar: function (year, month) {
            var date = new Date();
            date.setFullYear(year, month, 1);
            var start = date.getDay();
            var startDay = 1 - start;
            var calendars = [];
            var weekDayCount = 7;
            var currentWeekDay = 0
            var currentWeek = [];
            for (var i = 1; i <= 35; i++) {
                if (currentWeekDay == 0) {
                    currentWeek = [];
                }
                if (startDay > 0 && i <= 31) {
                    currentWeek.push(i - start);
                }
                else {
                    currentWeek.push("");
                }
                if (currentWeekDay == weekDayCount - 1) {
                    calendars.push(currentWeek);
                }
                currentWeekDay++;
                if (currentWeekDay == weekDayCount) {
                    currentWeekDay = 0;
                }
                startDay++;
            }
            return calendars;
        },
        doubleNumber: function (number) {
            if (number < 10) {
                return "0" + number;
            }
            return number;
        }
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            text: "=",
            readonly:"="
        },
        controller: function ($scope) {
            var date = new Date();
            $scope.vm = {
                startSelect: function () {
                    $scope.vm.isSelect = !$scope.vm.isSelect;
                },
                isSelect: false,
                calendars: vm.getDateCalendar(date.getFullYear(), date.getMonth()),
                year: date.getFullYear(),
                month: date.getMonth() + 1,
                day: date.getDate(),
                hour: date.getHours(),
                minute: date.getMinutes(),
                second: date.getSeconds(),
                time: date.toString(),
                topMonth: function () {
                    var month = $scope.vm.month + 1;
                    var year = $scope.vm.year;
                    if (month == 13) {
                        year = year + 1;
                        month = 1;
                    }
                    $scope.vm.year = year;
                    $scope.vm.month = month;
                },
                bottomMonth: function () {
                    var month = $scope.vm.month - 1;
                    var year = $scope.vm.year;
                    if (month == 0) {
                        year = year - 1;
                        month = 12;
                    }
                    $scope.vm.year = year;
                    $scope.vm.month = month;
                },
                updateDate: function () {
                    if (!$scope.readonly) {
                        var date = new Date($scope.vm.year, $scope.vm.month, $scope.vm.day, $scope.vm.hour, $scope.vm.minute, $scope.vm.second);
                        $scope.vm.time = date.toString();
                        $scope.vm.isSelect = false;
                        //2017-06-11T18:48:51
                        $scope.text = $scope.vm.year + "-" + vm.doubleNumber($scope.vm.month) + "-" + vm.doubleNumber($scope.vm.day) + "T" + vm.doubleNumber($scope.vm.hour) + ":" + vm.doubleNumber($scope.vm.minute) + ":" + vm.doubleNumber($scope.vm.second);
                    }
                },
                cancel: function () {
                    $scope.vm.isSelect = false;
                },
                selectDay: function (day) {
                    $scope.vm.day = day;
                }
            }

            $scope.$watch("vm.year", function (year) {
                $scope.vm.calendars = vm.getDateCalendar(year, $scope.vm.month - 1);
            })

            $scope.$watch("vm.month", function (month) {
                $scope.vm.calendars = vm.getDateCalendar($scope.vm.year, month - 1);
            })

            $scope.$watch("text", function (text) {
                var date = new Date(text);
                $scope.vm.calendars = vm.getDateCalendar(date.getFullYear(), date.getMonth());
                $scope.vm.year = date.getFullYear();
                $scope.vm.month = date.getMonth() + 1;
                $scope.vm.day = date.getDate();
                $scope.vm.hour = date.getHours();
                $scope.vm.minute = date.getMinutes();
                $scope.vm.second = date.getSeconds();
                $scope.vm.time = date.toString();
            })
        }
    }
})

.directive("saNumber", function () {
    var vm = {
        template: "<div class='sa-number' ng-readonly='vm.readonly'>\
                    <table><tbody>\
                        <tr>\
                            <td rowspan='2'><input class='sa-input sa-number-input' readonly ng-model='value' type='text'></td>\
                            <td><button class='sa-number-top sa-icon-top' ng-click='vm.top()'></button></td>\
                        </tr>\
                        <tr>\
                            <td><button class='sa-number-bottom sa-icon-bottom' ng-click='vm.bottom()'></button></td>\
                        </tr>\
                    </tbody></table>\
                   </div>"
    }

    return {
        restrict: "E",
        replace: true,
        template: vm.template,
        priority: 1,
        scope: {
            value: "=",
            min: "=",
            max: "=",
            readonly: "="
        },
        controller: function ($scope) {
            $scope.vm = {
                top: function () {
                    if (!$scope.readonly) {
                        var intValue = $scope.value = parseInt($scope.value);
                        var minValue = parseInt($scope.min);
                        var maxValue = parseInt($scope.max);
                        var newValue = intValue + 1;
                        $scope.value = newValue > maxValue ? minValue : newValue;
                    }
                },
                bottom: function () {
                    if (!$scope.readonly) {
                        var intValue = $scope.value = parseInt($scope.value);
                        var minValue = parseInt($scope.min);
                        var maxValue = parseInt($scope.max);
                        var newValue = intValue - 1;
                        $scope.value = newValue < minValue ? maxValue : newValue;
                    }
                }
            }

            $scope.$watch("readonly", function (readonly) {
                $scope.vm.readonly = readonly;
            })
        }
    }
})

.directive("saSwitch", function () {
    var vm = {
        template: "<div class='sa-switch' ng-click='vm.check()' ng-readonly='vm.readonly'>\
                    <input type='checkbox' readonly value='vm.isCheck' class='sa-switch-input' />\
                    <div ng-class='{\"true\":\"sa-switch-checkbox sa-switch-checkbox-true\",\"false\":\"sa-switch-checkbox sa-switch-checkbox-false\" }[vm.isCheck]'>\
                        <div class='sa-switch-checkbox-dot'></div>\
                        <div class='sa-switch-checkbox-text'>{{vm.displayText}}<div>\
                    </div>\
                  </div>"
    }

    return {
        restrict: "E",
        replace: true,
        template: vm.template,
        priority: 1,
        scope: {
            falseText: "=",
            trueText: "=",
            value: "=",
            readonly: "="
        },
        controller: function ($scope) {
            $scope.vm = {
                isCheck: false,
                check: function () {
                    $scope.vm.isCheck = !$scope.vm.isCheck;
                },
                falseText: "False",
                trueText: "True",
                displayText: "False",
            };

            $scope.$watch("vm.isCheck", function (isCheck) {
                $scope.vm.displayText = isCheck ? $scope.vm.trueText : $scope.vm.falseText;
            });

            $scope.$watch("value",function(value){
                $scope.vm.isCheck = value;
            });
            $scope.$watch("readonly", function (readonly) {
                $scope.vm.readonly = readonly;
            })
        }
    }
})

.directive("saText", function () {
    var vm = {
        template:"<div class='sa-text'><input type='text' class='sa-input sa-text-input' ng-model='text' ng-readonly='vm.readonly' /></div>"
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            text: "=",
            readonly:"="
        },
        controller: function ($scope) {
            $scope.vm = {
                text: "",
                readonly:true
            };
            $scope.$watch("readonly", function (readonly) {
                $scope.vm.readonly = readonly;
            })

            $scope.$watch("text", function (text) {
                console.log(text);
            })
        }
    }
})

.directive("saGuid", function () {
    var vm = {
        template: "<div class='sa-guid' ng-readonly='vm.readonly'>\
                    <div class='sa-guid-text sa-guid-text-long'><sa-text readonly='vm.readonly' class='sa-guid-text-context' text='vm.guid_one'></sa-text><span class='sa-guid-text-symbol'>-</span></div>\
                    <div class='sa-guid-text'><sa-text class='sa-guid-text-context' readonly='vm.readonly' text='vm.guid_two'></sa-text><span class='sa-guid-text-symbol'>-</span></div>\
                    <div class='sa-guid-text'><sa-text class='sa-guid-text-context' readonly='vm.readonly' text='vm.guid_three'></sa-text><span class='sa-guid-text-symbol'>-</span></div>\
                    <div class='sa-guid-text'><sa-text class='sa-guid-text-context' readonly='vm.readonly' text='vm.guid_four'></sa-text><span class='sa-guid-text-symbol'>-</span></div>\
                    <div class='sa-guid-text sa-guid-text-maxlong'><sa-text readonly='vm.readonly' class='sa-guid-text-context' text='vm.guid_five'></sa-text></div>\
                    <div class='sa-guid-text'><button class='sa-guid-copy' ng-click='vm.copy()'></button><sa-tooltip ng-if='vm.showTooltip' text='vm.copyMessage'></sa-tooltip></div>\
                  </div>"
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            value: "=",
            readonly: "="
        },
        controller: function ($scope) {
            $scope.vm = {
                guid_one: "",
                guid_two: "",
                guid_three: "",
                guid_four: "",
                guid_five: "",
                showTooltip: false,
                copyMessage: "Copy成功",
                copy: function () {
                    this.showTooltip = true;
                },
                showTooltipTimer:0
            };

            $scope.$watch("value", function (value) {
                var str = value.split("-");
                $scope.vm.guid_one = str[0];
                $scope.vm.guid_two = str[1];
                $scope.vm.guid_three = str[2];
                $scope.vm.guid_four = str[3];
                $scope.vm.guid_five = str[4];
            });

            $scope.$watch("readonly", function (readonly) {
                $scope.vm.readonly = readonly;
            });

            $scope.$watch("vm.guid_one", function (value) {

            });

            $scope.$watch("vm.showTooltip", function (value) {
                if (value) {
                    setTimeout(function () {
                        if ($scope.vm.showTooltipTimer <= 1) {
                            $scope.$apply(function () {
                                $scope.vm.showTooltip = false;
                            });
                        }
                        $scope.vm.showTooltipTimer -= 1;
                    }, 3000);
                    $scope.vm.showTooltipTimer += 1;
                }
            })
        }
    }
})

.directive("saField", function () {
    var vm = {
        template:"<div ng-switch='vm.type'>\
                    <sa-text ng-if='type == 0' text='vm.value' readonly='vm.readonly'></sa-text>\
                    <sa-guid ng-if='type == 2' value='vm.value' readonly='vm.readonlyvm.readonly'></sa-guid>\
                    <sa-switch ng-if='type == 8' value='vm.value' readonly='vm.readonly'></sa-switch>\
                    <sa-number ng-if='type == 5' value='vm.value' readonly='vm.readonly'></sa-number>\
                    <sa-Calendar ng-if='type == 4' text='vm.value' readonly='vm.readonly'></sa-Calendar>\
                  </div>"
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            value: "=",
            type: "=",
            model:"="
        },
        controller: function ($scope) {
            console.log($scope.type + ":" + $scope.value);

            $scope.vm = {
                readonly: true,
                value:"",
            };

            $scope.$watch("model", function (model) {
                $scope.vm.readonly = model == "readonly";
            })

            $scope.$watch("value", function (value) {
                console.log(value);
                $scope.vm.value = value;
            })

            $scope.$watch("vm.value", function (value) {
                $scope.value = value;
            })
        }
    }
})

.directive("saTooltip", function () {
    var vm = {
        template:"<div class='sa-tooltip'>\
                    <div class='sa-tooltip-context'>\
                        <div class='sa-tooltip-arrow sa-tooltip-arrow-border'></div>\
                        <div class='sa-tooltip-arrow sa-tooltip-arrow-bacground'></div>\
                        {{text}}</div>\
                  </div>"
    }

    return {
        restrict: "E",
        replace: true,
        template: vm.template,
        priority: 1,
        scope: {
            text:"=",
        },
        controller: function ($scope) {

        }
    }
})

.directive("saFooter", function () {
    var vm = {
        template: "<div class='sa-footer' ng-transclude></div>"
    }

    return {
        restrict: "E",
        replace: true,
        template: vm.template,
        priority: 1,
        transclude: true,
        scope: {

        },
        controller: function ($scope) {

        }
    }
})

.directive("saAbout", function () { 
    var vm = {
        template: "<div class='sa-about'>\
                    <div class='sa-about-header'>\
                        <div class='sa-about-header-icon'>\
                            <img src='{{icon}}' />\
                        </div>\
                        <div class='sa-about-header-name'>{{name}}</div>\
                    </div>\
                    <div class='sa-about-footer' ng-transclude></div>\
                   <div>"
    }

    return {
        restrict: "E",
        replace: true,
        template: vm.template,
        priority: 1,
        transclude: true,
        scope: {
            icon: "=",
            name:"="
        },
        controller: function ($scope) {
            for(var i=0;i<100;i++)
            {

            }
        }
    }
})

.directive("saLines", ["guid.service",function (guid) {
    var vm = {
        id:guid.newGuid(),
        template: '<div id="{{vm.id}}" style="width:1300px;height:500px"></div>',
        build: function (points, xAxis) {
            var container = document.getElementById(this.id);
            var option = {
                colors: ['#00A8F0', '#C0D800', '#CB4B4B'],  //线条的颜色
                ieBackgroundColor: '#3ec5ff',                    //选中时的背景颜色
                title: 'CPU 使用率',               //标题
                subtitle: '',                           //子标题
                shadowSize: 3,                                 //线条阴影
                defaultType: 'lines',                           //图表类型,可选值:bars,bubbles,candles,gantt,lines,markers,pie,points,radar
                HtmlText: false,                                //是使用html或者canvas显示 true:使用html  false:使用canvas
                fontColor: '#ff3ec5',                           //字体颜色
                fontSize: 7.5,                                  //字体大小
                resolution: 1,                                  //分辨率 数字越大越模糊
                parseFloat: true,                               //是否将数据转化为浮点型
                xaxis: {
                    //ticks: [[1, "一月"], [2, "二月"], [3, "三月"], [4, "四月"], [5, "五月"], [6, "六月"], [7, "七月"], [8, "八月"], [9, "九月"], [10, "十月"], [11, "十一月"], [12, "十二月"]], // 自定义X轴
                    xaxis:xAxis,
                    minorTicks: null,
                    showLabels: true,                             // 是否显示X轴刻度
                    showMinorLabels: false,
                    labelsAngle: 15,                              //x轴文字倾斜角度
                    title: '时间',                                 //x轴标题
                    titleAngle: 0,                                //x轴标题倾斜角度
                    noTicks: 12,                                   //当使用自动增长时,x轴刻度的个数
                    minorTickFreq: null,                           //
                    tickFormatter: Flotr.defaultTickFormatter,   //刻度的格式化方式
                    tickDecimals: 0,                              //刻度小数点后的位数
                    min: null,                                    //刻度最小值  X轴起点的值
                    max: null,                                    //刻度最大值
                    autoscale: true,
                    autoscaleMargin: 0,
                    color: null,                             //x轴刻度的颜色
                    mode: 'normal',
                    timeFormat: null,
                    timeMode: 'UTC',                               //For UTC time ('local' for local time).
                    timeUnit: 'year',                             //时间单位 (millisecond, second, minute, hour, day, month, year) 
                    scaling: 'linear',                            //linear or logarithmic
                    base: Math.E,
                    titleAlign: 'center',                         //标题对齐方式
                    margin: true
                },
                x2axis: {
                },
                yaxis: {
                    //// =>  Y轴配置与X轴类似
                    ticks: [[0, "0"], [10, "10"], [20, "20"], [30, "30"], [40, "40"], [50, "50"], [60, "60"], [70, "70"], [80, "80"], [90, "90"], [100,"100"] ],
                    minorTicks: null,      // =>  format: either [1, 3] or [[1, 'a'], 3]
                    showLabels: true,      // =>  setting to true will show the axis ticks labels, hide otherwise
                    showMinorLabels: false,// =>  true to show the axis minor ticks labels, false to hide
                    labelsAngle: 0,        // =>  labels' angle, in degrees
                    title: '使用率',           // =>  axis title
                    titleAngle: 90,        // =>  axis title's angle, in degrees
                    noTicks: null,            // =>  number of ticks for automagically generated ticks
                    minorTickFreq: null,   // =>  number of minor ticks between major ticks for autogenerated ticks
                    tickFormatter: Flotr.defaultTickFormatter, // =>  fn: number, Object ->  string
                    tickDecimals: 'no',    // =>  no. of decimals, null means auto
                    min: 0,             // =>  min. value to show, null means set automatically
                    max: 100,             // =>  max. value to show, null means set automatically
                    autoscale: false,      // =>  Turns autoscaling on with true
                    autoscaleMargin: 0,    // =>  margin in % to add if auto-setting min/max
                    color: null,           // =>  The color of the ticks
                    scaling: 'linear',     // =>  Scaling, can be 'linear' or 'logarithmic'
                    base: Math.E,
                    titleAlign: 'center',
                    margin: true           // =>  Turn off margins with false
                },
                y2axis: {
                },
                grid: {
                    color: '#545454',      // =>  表格外边框和标题以及所有刻度的颜色
                    backgroundColor: null, // =>  表格背景颜色
                    backgroundImage: null, // =>  表格背景图片
                    watermarkAlpha: 0.4,   // =>  水印透明度
                    tickColor: '#DDDDDD',  // =>  表格内部线条的颜色
                    labelMargin: 1,        // =>  margin in pixels
                    verticalLines: true,   // =>  表格内部是否显示垂直线条
                    minorVerticalLines: null, // =>  whether to show gridlines for minor ticks in vertical dir.
                    horizontalLines: true, // =>  表格内部是否显示水平线条
                    minorHorizontalLines: null, // =>  whether to show gridlines for minor ticks in horizontal dir.
                    outlineWidth: 1,       // =>  表格外边框的粗细
                    outline: 'nsew',      // =>  超出显示范围后的显示方式
                    circular: false        // =>  是否以环形的方式显示
                },
                mouse: {
                    track: true,          // =>  为true时,当鼠标移动到每个折点时,会显示折点的坐标
                    trackAll: true,       // =>  为true时,当鼠标在线条上移动时,显示所在点的坐标
                    position: 'se',        // =>  鼠标事件显示数据的位置 (default south-east)
                    relative: false,       // =>  当为true时,鼠标移动时,即使不在线条上,也会显示相应点的数据
                    trackFormatter: Flotr.defaultTrackFormatter, // =>  formats the values in the value box
                    margin: 5,             // =>  margin in pixels of the valuebox
                    lineColor: '#FF3F19',  // =>  鼠标移动到线条上时,点的颜色
                    trackDecimals: 0,      // =>  数值小数点后的位数
                    sensibility: 2,        // =>  值越小,鼠标事件越精确
                    trackY: true,          // =>  whether or not to track the mouse in the y axis
                    radius: 3,             // =>  radius of the track point
                    fillColor: null,       // =>  color to fill our select bar with only applies to bar and similar graphs (only bars for now)
                    fillOpacity: 0.4       // =>  o
                }
            };
            Flotr.draw(container, points, option);
        }
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        scope: {
            points: "=",
            xaxis:"="
        },
        controller: function ($scope) {
            $scope.vm = {
                id: vm.id
            }
            $scope.$watch("points", function (points) {
                vm.build(points, $scope.xaxis);
            }, true);
            $scope.$watch("xaxis", function (xaxis) {
                vm.build($scope.points, xaxis);
            }, true);
        },
    }
}])

.directive("saBars", ["guid.service", function (guid) {
    var vm = {
        id: guid.newGuid(),
        template: '<div id="{{vm.id}}" style="width:1300px;height:500px"></div>',
        build: function (points, xAxis) {
            var container = document.getElementById(this.id);
            var option = {
                bars: {
                    show: true,
                    horizontal: false,
                    shadowSize: 0,
                    barWidth: 0.5
                },
                mouse: {
                    track: true,
                    relative: true
                },
                xaxis: {
                    //ticks: [[1, "一月"], [2, "二月"], [3, "三月"], [4, "四月"], [5, "五月"], [6, "六月"], [7, "七月"], [8, "八月"], [9, "九月"], [10, "十月"], [11, "十一月"], [12, "十二月"]], // 自定义X轴
                    xaxis: xAxis,
                    minorTicks: null,
                    showLabels: true,                             // 是否显示X轴刻度
                    showMinorLabels: false,
                    labelsAngle: 15,                              //x轴文字倾斜角度
                    title: '时间',                                 //x轴标题
                    titleAngle: 0,                                //x轴标题倾斜角度
                    noTicks: 12,                                   //当使用自动增长时,x轴刻度的个数
                    minorTickFreq: null,                           //
                    tickFormatter: Flotr.defaultTickFormatter,   //刻度的格式化方式
                    tickDecimals: 0,                              //刻度小数点后的位数
                    min: null,                                    //刻度最小值  X轴起点的值
                    max: null,                                    //刻度最大值
                    autoscale: true,
                    autoscaleMargin: 0,
                    color: null,                             //x轴刻度的颜色
                    mode: 'normal',
                    timeFormat: null,
                    timeMode: 'UTC',                               //For UTC time ('local' for local time).
                    timeUnit: 'year',                             //时间单位 (millisecond, second, minute, hour, day, month, year) 
                    scaling: 'linear',                            //linear or logarithmic
                    base: Math.E,
                    titleAlign: 'center',                         //标题对齐方式
                    margin: true
                },
                yaxis: {
                    min: 0,
                    autoscaleMargin: 1
                }
            }
            Flotr.draw(container, points, option);
        }
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        scope: {
            points: "=",
            xaxis: "="
        },
        controller: function ($scope) {
            $scope.vm = {
                id: vm.id
            }
            $scope.$watch("points", function (points) {
                vm.build(points, $scope.xaxis);
            }, true);
            $scope.$watch("xaxis", function (xaxis) {
                vm.build($scope.points, xaxis);
            }, true);
        },
    }
}])

.directive("saPie", ["guid.service", function (guid) {
    var vm = {
        id: guid.newGuid(),
        template: '<div id="{{vm.id}}"  style="width:400px;height:400px"></div>',
        build: function (points, xAxis,id) {
            var container = document.getElementById(id);
            var option = {
                HtmlText: false,
                grid: {
                    verticalLines: false,
                    horizontalLines: false
                },
                xaxis: { showLabels: false },
                yaxis: { showLabels: false },
                pie: {
                    show: true,
                    explode: 6
                },
                mouse: { track: true },
                legend: {
                    position: 'se',
                    backgroundColor: '#D2E8FF'
                }
            }
            Flotr.draw(container, points, option);
        }
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        scope: {
            points: "=",
            xaxis: "=",
            _width: "=",
            _height:"="
        },
        controller: function ($scope) {
            $scope.vm = {
                id: guid.newGuid(),
                width: "1300px",
                height:'500px'
            }
            $scope.$watch("points", function (points) {
                setTimeout(function () {
                    vm.build(points, $scope.xaxis, $scope.vm.id);
                },300);
            }, true);
            $scope.$watch("xaxis", function (xaxis) {
                setTimeout(function () {
                    vm.build($scope.points, xaxis, $scope.vm.id);
                },300);
            }, true);
            //$scope.$watch("_width", function (width) {
            //    $scope.vm.width = width;
            //});
            //$scope.$watch("_height", function (height) {
            //    $scope.vm.height = height;
            //});
        },
    }
}])