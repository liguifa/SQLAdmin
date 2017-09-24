angular.module("shinyui", [])

.directive("suiConnect", function ()
{
    var stamp = {
        isMove: false,
        mouse: { left: 0, top: 0 }
    }

    var vm = {
        template: "<div><div class='sui-window sui-connect'>\
                        <div class='sui-border' ng-mousedown='vm.mousedown($event)' ng-mousemove='vm.move($event)' ng-mouseup='vm.mouseup($event)'>\
                              <div class='sui-content' ng-mousedown='retun false;'  ng-mousemove='retun false;'>\
                                  <div class='sui-title'>Database Connection</div>\
                                  <div class='sui-form'>\
                                      <div>\
                                          <label>类别:</label>\
                                          <select class='sui-connect-input'>\
                                          <option ng-repeat='type in vm.types' value='type.id'>{{type.displayName}}</option>\
                                          </select>\
                                      </div>\
                                      <div>\
                                          <label>地址:</label>\
                                          <input type='text' class='sui-connect-input' ng-model='info.address'/>\
                                      </div>\
                                      <div>\
                                          <label>端口:</label>\
                                          <input type='text' class='sui-connect-input' ng-model='info.port'/>\
                                      </div>\
                                      <div>\
                                          <label>账号:</label>\
                                          <input type='text' class='sui-connect-input' ng-model='info.username'/>\
                                      </div>\
                                      <div>\
                                          <label>密码:</label>\
                                          <input type='password' class='sui-connect-input' ng-model='info.password'/>\
                                      </div>\
                                  </div>\
                                  <div class='sui-connect-footer'>\
                                      <button class='sui-button sui-button-small' ng-click='vm.determine()' style='margin-top:4px;'>确定</button>\
                                      <button class='sui-button sui-button-small'  ng-click='vm.cancel()' style='margin-top:4px;'>取消</button>\
                                  </div>\
                            </div>\
                        </div>\
                 </div>\
                 <div class='sui-mask'></div></div>",

        mousedown: function ($event)
        {
            if ($event.target.className == 'sui-border') {
                stamp.isMove = true;
                stamp.mouse = { left: $event.clientX, top: $event.clientY };
            }
        },

        mouseup: function ($event)
        {
            stamp.isMove = false;
        },

        move: function ($event)
        {
            if (stamp.isMove)
            {
                var suiWindow = document.getElementsByClassName('sui-window')[0];
                var x = $event.clientX - stamp.mouse.left;
                var y = $event.clientY - stamp.mouse.top;
                suiWindow.style.left = suiWindow.offsetLeft + x + 'px';
                suiWindow.style.top = suiWindow.offsetTop + y + 'px';
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

.directive("suiMenu", ["$http", "$compile", function ($http, $compile)
{
    var self = null;
    var vm = {
        template: "<div class='sui-menu'>\
                        <ul class='sui-menu-list'>\
                            <li class='sui-menu-item' ng-repeat='menu in vm.menus'>\
                                <div class='sui-menu-item-title' ng-click='vm.select(menu.id)'>{{menu.title}}</div><br />\
                                <ul ng-if='menu.isSelect' class='sui-menu-subs' style='left:{{$index*56.5+\"px\"}}'>\
                                    <li ng-repeat='sub in menu.subs'><img class='sui-menu-item-subs-icon' ng-src='{{sub.icon}}' /><span class='sui-menu-item-subs-title' ng-click='vm.Command(sub)'>{{sub.title}}</span><div class='sui-clear'></div></li>\
                                </ul>\
                            </li>\
                        </ul>\
                   </div>",
        select: function (id)
        {
            for (var i in self.vm.menus)
            {
                if (self.vm.menus[i].id == id)
                {
                    self.vm.menus[i].isSelect = true;
                    self.vm.isViewMenu = true;
                }
                else
                {
                    self.vm.menus[i].isSelect = false;
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
                            self.vm.menus[i].isSelect = false;
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
                $scope.vm.menus = menus.map(function(item){
                	item.isSelect = false;
                	return item;
                });
            });

            $scope.$watch("vm.isViewMenu", vm.clearSubMenus)
        }
    }
}])

.directive('suiExplorer', function ()
{
    var vm = {
        template: "<div class='sui-explorer'>\
                        <div class='sui-explorer-title'>{{vm.title}}</div>\
                        <div class='sui-explorer-tool'>\
                            <ul class='sui-explorer-tool-list'><li class='sui-explorer-tool-item' ng-repeat='tool in vm.tools' ng-click='vm.toolClick(tool)'><i class='sui-icon-{{tool.type}} sui-explorer-tool-icon'></i></li></ul>\
                        </div>\
                        <div class='sui-explorer-panel'>\
                            <div class='sui-explorer-content'>\
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
            title: "=",
            tools:"="
        },
        controller: function ($scope)
        {
            $scope.vm = {
                title: "",
                tools: "",
                toolClick: function (tool) {
                    tool.command();
                }
            };

            $scope.$watch("title", function (title) {
                $scope.vm.title = title;
            });

            $scope.$watch("tools", function (tools) {
                $scope.vm.tools = tools;
            }, true);
        }
    }
})

.directive('suiTabs', ["guid.service", "$http", "$compile", function (guid, $http, $compile)
{
    var vm = {
        id: guid.newGuid(),
        template: "<div class='sui-tabs' id='{{vm.id}}'>\
                    <div class='sui-tabs-title-div'><ul class='sui-tabs-titlt-list'>\
                        <li ng-class='{\"true\":\"sui-tabs-titlt-item sui-tabs-title-active\",\"false\":\"sui-tabs-titlt-item\"}[page.isSelected]' ng-repeat='page in vm.pages'><div class='sui-tabs-title'><span ng-click='vm.clickTitle(page.id)'>{{page.title}}</span><i ng-click='vm.deletePage(page)' class='sui-icon-remove sui-tabs-delete'></i></div></li>\
                    </ul></div>\
                    <div class='sui-tabs-tab' ng-repeat='page in vm.pages' id='{{page.id}}' ng-if='page.isSelected'>\
                        <div class='sui-tabs-panel' ng-if='page.isSelected'><div class='sui-tabs-panel-include' ng-include src='page.url'></div></div>\
                    </div>\
                   </div>",
        build: function ($scope,pages) {
            var self = this;
            for (var i in pages)
            {
                $http.get(pages[i].url).then(function (data) {
                    var tabs = document.getElementById(self.id);
                    var tab = document.createElement("div");
                    tab.classList.add("sui-tabs-tab");
                    tab.attributes["data-tab-id"] = pages[i].id;
                    var title = document.createElement("div");
                    title.classList.add("sui-tabs-title");
                    title.style.left = (i * 100) + "px";
                    var panel = document.createElement("div");
                    panel.appendChild($compile(data.data)($scope)[0]);
                    panel.classList.add("sui-tabs-panel");
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
                clickTitle:function(panel_id)
                {
                    //var panels = document.getElementsByClassName("sui-tabs-tab");
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
                },
                deletePage:function(page){
                     $scope.vm.pages =  $scope.vm.pages.filter(function(p){
                         return p.id != page.id;
                     });
                     var selectPage = $scope.vm.pages.find(function(p){
                        return p.isSelected;
                     });
                     if(!selectPage){
                        $scope.vm.pages[$scope.vm.pages.length - 1].isSelected = true;
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

.directive('suiTree', function ()
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
                rootElement.classList.add("sui-tree-ul");
                if (tree != null) {
                    rootElement.appendChild(this.buildNode(tree));
                }
                treeElement.innerHTML = "";
                treeElement.appendChild(rootElement);
                treeElement.oncontextmenu = function (e) {
                    e = e || window.event; 　//IE window.event
                    var t = e.target || e.srcElement; //目标对象
                    if (e.type == "contextmenu") {
                        var contextmenus = document.getElementsByClassName("sui-contextmenu");
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
                        if (t && t.className == "sui-icon-arrow-right") {
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
            treeNode.classList.add("sui-tree-li");
            var arrowNode = document.createElement("i");
            arrowNode.classList.add("sui-icon-arrow-right");
            var childId = self.guid();
            arrowNode.attributes["children_Id"] = childId;
            arrowNode.attributes["is_load"] = false;
            arrowNode.attributes["is_spread"] = false;
            arrowNode.id = self.guid();
            var contextNode = document.createElement("span");
            contextNode.classList.add("sui-tree-children");
            var iconNode = document.createElement("i");
            iconNode.classList.add("sui-icon-folder");
            var nameNode = document.createElement("span");
            nameNode.textContent = tree.Name;
            nameNode.attributes["tree-id"] = tree.Id;
            var childrenNode = document.createElement("ul");
            childrenNode.classList.add("sui-tree-ul");
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
                        newContextmenu.classList.add("sui-contextmenu");
                        this.push(contextmenu);
                    }
                }
            }, outContextmenus);
            contextNode.appendChild(childrenNode);

            this.contextmenus = outContextmenus;
            if (tree.Children) {
                if (tree.Children.length > 0) {
                    treeNode.classList.add("sui-tree-li-children");
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
            var contextmenus = document.getElementsByClassName("sui-contextmenu");
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
            var contextmenus = document.getElementsByClassName("sui-contextmenu");
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
            vm.contextmenus = element[0].getElementsByClassName("sui-contextmenu");
        }
    }
})

.directive("suiContextmenu", function ()
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
                    var contextmenus = document.getElementsByClassName("sui-contextmenu");
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
            //var func = document.onmousedown;
            //document.onmousedown = function(e)
            //{
            //    //if (func) {
            //    //    func();
            //    //}
            //    //e = e || window.event; 　//IE window.event
            //    //var t = e.target || e.srcElement; //目标对象
            //    //if (!(t && t.claaName && t.claaName == "sui-contextmenu-title")) {
            //    //    var contextmenus = document.getElementsByClassName("sui-contextmenu");
            //    //    for (var i in contextmenus) {
            //    //        if (contextmenus[i].style) {
            //    //            contextmenus[i].style.visibility = "";
            //    //        }
            //    //    }
            //    //}
            //}
        }
    }
})

.directive('suiQueryPanel', function ()
{
    var vm = {
        template: "<div>\
                    <sui-datagrid></sui-datagrid>\
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

.directive('suiDatagrid', ["guid.service",function (guid)
{
    var vm = {
        template: '<div class="sui-datagrid-content">\
                    <div class="sui-datagrid-tool" ng-if="isShowTool"><ul class="sui-datagrid-tool-list">\
                        <li class="sui-datagrid-tool-item"><sui-icon type="\'trash_empty\'" click="vm.remove()"></sui-icon></li>\
                        <li class="sui-datagrid-tool-item"><sui-icon type="\'plus_circle\'"></sui-icon></li>\
                        <li class="sui-datagrid-tool-item"><sui-icon type="\'edit\'"></sui-icon></li>\
                        <li class="sui-datagrid-tool-item"><sui-icon type="\'flopp\'"></sui-icon>\
                        <li class="sui-datagrid-tool-item sui-datagrid-tool-column"><sui-multiselect fields="vm.fields" select="vm.selectColumns(fields)"></sui-multiselect></li>\
                        <li class="sui-datagrid-tool-item sui-datagrid-tool-column"><sui-search placeholder="vm.placeholder" fields="vm.fields" search="vm.search(key,value)"></sui-sui-search></li>\
                    </ul></div>\
                    <div class="sui-datagrid-data">\
                        <div class="sui-datagrid-data-header" style="padding-right:{{tableHeaderPadding}}px">\
                            <table class="sui-datagrid">\
                                <thead ng-if="isShowThead">\
                                  <tr>\
                                    <th class="sui-datagrid-data-index" ng-if="isCanSelect"><input type="checkbox" name="" ng-change="vm.globalChecked()" ng-model="vm.isGlobalSelected" lay-skin="primary" lay-filter="allChoose"></th>\
                                    <th ng-repeat="field in vm.fields" ng-click="vm.sort(field.name)">\
                                        {{field.name}}\
                                        <div class="sui-datagrid-content-header-icon" ng-if="field.isPrimary"><img src="/Static/Images/icon_key.png" /></div>\
                                        <div class="sui-datagrid-content-sort-icon sui-icon-sort-asc" ng-if="field.isSort && field.isuisc"></div>\
                                        <div class="sui-datagrid-content-sort-icon sui-icon-sort-desc" ng-if="field.isSort && !field.isuisc"></div>\
                                    </th>\
                                  </tr> \
                                </thead>\
                            </table>\
                        </div>\
                        <div class="sui-datagrid-data-body"  style="height:{{tableHeight}}px;">\
                            <table class="sui-datagrid">\
                                <tbody>\
                                      <tr ng-repeat="row in datas">\
                                        <td class="sui-datagrid-data-index" ng-if="isCanSelect"><input type="checkbox" name="" ng-model="row.isSelected" lay-skin="primary"></td>\
                                        <td ng-if="isEdit" ng-repeat="(key,val) in row.rows track by $index"><sui-field type="vm.fields[$index].type" value="row.rows[key].Value"></sui-field></td>\
                                        <td ng-if="!isEdit" ng-repeat="(key,val) in row.rows track by $index">{{val}}</td>\
                                      </tr>\
                                </tbody>\
                            </table>\
                            <hr />\
                        </div>\
                    </div>\
                    <div class="sui-datagrid-footer" ng-if="isShowFooter">\
                        <sui-pagination class="sui-datagrid-footer-page" page="vm.page" pageNumber="10" click="vm.jump(pageIndex)"></sui-pagination>\
                        <span class="sui-datagrid-footer-info">共 {{vm.page.total}} 行 {{vm.page.pageCount}} 页，当前显示 {{(vm.page.pageIndex-1)*vm.page.pageSize+1}}-{{vm.page.pageIndex == vm.page.pageCount ? vm.page.total : vm.page.pageIndex*vm.page.pageSize}} 行</span>\
                    </div>\
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
            isCanSelect: '=',
            isShowThead: '=',
            isShowTool: "=",
            isShowFooter:"=",
            isEdit: "=",
            page:"=",
            sort:"&",
            remove: "&",
            search: "&",
            jump: "&",
            selectColumns:"&"
        },
        controller: function ($scope) {
            $scope.vm = {
                isGlobalSelected: false,
                page: {
                    pageIndex: 0,
                    pageSize: 0,
                    total: 0,
                    pageCount: 0,
                },
                tableHeaderPadding:0,
                placeholder:"Search",
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
                        sortMap.isuisc = !sortMap.isuisc;
                    }
                    else {
                        sortMap = {
                            name: name,
                            isuisc: true
                        }
                        $scope.vm.sortMap.push(sortMap);
                    }
                    $scope.sort({ name: name, isuisc: sortMap.isuisc });
                    $scope.vm.fields.forEach(function (field) {
                        if (field.name == name) {
                            field.isuisc = sortMap.isuisc;
                            field.isSort = true;
                        }
                        else {
                            field.isSort = false;
                        }
                    });
                },
                sortMap:[],
                remove:function(){
                    var items = $scope.datas.filter(function(item){
                        return item.isSelected;
                    });
                    $scope.remove({items:items});
                },
                search: function (key, value) {
                    $scope.search({ key: key, value: value });
                },
                jump: function (pageIndex) {
                    $scope.jump({ pageIndex: pageIndex });
                },
                selectColumns: function (fields) {
                    $scope.selectColumns({ fields: fields });
                }
            };

            $scope.$watch("datas", function (datas) {
                $scope.vm.isGlobalSelected = false;
                $scope.vm.globalChecked();
                if (datas && datas.length > 0) {
                    if ($scope.tableHeight > datas.length * 39) {
                        $scope.tableHeight = datas.length * 39;
                    } else {
                        $scope.tableHeaderPadding = 14;
                    }
                }
            });

            $scope.$watch("fields", function (fields) {
                $scope.vm.fields = [];
                for (var i in fields)
                {
                    var f = {
                        name: fields[i].name,
                        isPrimary:false,
                        isForeign: false,
                        isSort: false,
                        type: fields[i].Type,
                    };
                    $scope.vm.fields.push(f);
                }
            });

            $scope.$watch("indexs", function (indexs) {
                for (var i in $scope.fields) {
                    for (var j in indexs) {
                        if (indexs[j].ColumnName == $scope.vm.fields[i].name) {
                            $scope.vm.fields[i].isPrimary = indexs[j].Type == 0;
                            $scope.vm.fields[i].isForeign = indexs[j].Type == 1;
                        }
                    }
                }
            });

            $scope.$watch("page", function (page) {
                $scope.vm.page = page;
            },true)

            $scope.isEdit = $scope.isEdit == undefined ? true : $scope.isEdit;
            $scope.isCanSelect = $scope.isCanSelect == undefined ? true : $scope.isCanSelect;
            $scope.isShowThead = $scope.isShowThead == undefined ? true : $scope.isShowThead;
            $scope.isShowTool = $scope.isShowTool == undefined ? true : $scope.isShowTool;
            $scope.isShowFooter = $scope.isShowFooter == undefined ? true : $scope.isShowFooter;
        },
        link: function ($scope, element, attrs) {
            var height = element[0].scrollHeight;
            var tableHeight = height - 42 - 42;
            element[0].children[0].style.height = tableHeight + "px";
            //element[0].children[1].children[1].style.height = tableHeight - 39 + "px";
            $scope.tableHeight = tableHeight - 39;
        }
    }
}])

.directive("suiBlockquote", function ()
{
    var vm = {
        template: '<blockquote class="sui-blockquote {{vm.type}}"  ng-transclude></blockquote>'
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        transclude: true,
        priority: 1,
        scope: {
            type:"="
        },
        controller: function ($scope) {
            $scope.vm = {
                type: "sui-blockquote-default",
            };

            $scope.$watch("type", function (type) {
                if (type) {
                    $scope.vm.type = "sui-blockquote-" + type;
                }
            });
        }
    }
})

.directive("suiTools", function ()
{
    var vm = {
        template: '<div><sui-blockquote type="vm.type">\
                    <div clas="sui-tools-icon" ng-transclude>\
                    </div>\
                   </sui-blockquote></div>'
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
            $scope.vm = {
                type:"default"
            }
        }
    }
})

.directive("suiPagination", function ()
{
    var vm = {
        template: '<div class="sui-pagination">\
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
                    _class: i == page.pageIndex ? "sui-pagination-active" : "",
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

.directive("suiAlert", function (messager)
{
    var vm = {
        template: '<div class="sui-alert">\
                    <div class="sui-alert-title">信息</div>\
                    <div class="sui-alert-content">居中弹出</div>\
                    <button class="sui-alert-ok">确定</button>\
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

.directive("suiSearch",function(){
    var vm = {
        template: '<div class="sui-search">\
                        <sui-combo fields="vm.fields" class="sui-search-combo" select="vm.select(field)"></sui-combo>\
                        <input type="text" class="sui-connect-input sui-search-input" placeholder="{{vm.placeholder}}" ng-model="vm.searchKey.value" placeholder="{{vm.placeholder}}" />\
                        <button class="sui-button sui-search-button" ng-click="vm.search()">搜索</bitton>\
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
            search:"&"
        },
        controller: function ($scope) {
            $scope.vm = {
                search: function () {
                    $scope.search({ key: $scope.vm.searchKey.key, value: $scope.vm.searchKey.value });
                },
                searchKey: { key: "", value: "" },
                select: function (field) {
                    $scope.vm.searchKey.key = field.name;
                }
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

.directive("suiMultiselect", ["guid.service",function (guid) {
    var  vm = {
        template:"<div class='sui-multiselect'>\
                    <input type='text' readonly class='sui-multiselect-text' ng-model='vm.text' ng-click='vm.startSelect()' />\
                    <div ng-if='vm.isSelecting' class='sui-multiselect-field'>\
                        <ul>\
                            <li ng-repeat='field in vm.fields'><input type='checkbox' ng-model='field.IsSelect'/><span>{{field.name}}</span></li>\
                        </ul>\
                        <div class='sui-multiselect-button'>\
                            <sui-button size='vm.size' text='vm.ok_btn_text' click='vm.select()' class='sui-multiselect-button-ok'></sui-button>\
                            <sui-button size='vm.size' text='vm.cancel_btn_text' click='vm.cancel()' class='sui-multiselect-button-cancel'></sui-button>\
                            <div class='sui-clear'></div>\
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
                },
                size: "small",
                ok_btn_text: "确认",
                cancel_btn_text: "取消"
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

.directive("suiCalendar", function () {
    var vm = {
        template: "<div class='sui-calendar'>\
                    <div><input class='sui-calendar-text' type='text' readonly ng-model='vm.time' /><div class='sui-calendar-icon' ng-click='vm.startSelect()' ><img src='../Images/icon_calendar.png' /></div></div>\
                    <div class='sui-calendar-select' ng-if='vm.isSelect'>\
                        <div class='sui-calendar-select-title'><div class='sui-calendar-select-title-span'><div class='sui-icon-left sui-calendar-select-title-span-left' ng-click='vm.bottomMonth()'></div><div class='sui-calendar-select-title-text'>{{vm.year}}年 {{vm.month}}月</div><div class='sui-icon-right sui-calendar-select-title-span-right' ng-click='vm.topMonth()'></div></div></div>\
                        <div class='sui-calendar-select-context'>\
                            <div class='sui-calendar-select-fields'>\
                                <ul><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul>\
                            </div>\
                                <table>\
                                    <tbody>\
                                        <tr ng-repeat='calendar in vm.calendars'><td ng-repeat='day in  calendar track  by $index' ng-class='{\"true\":\"sui-calendar-select-context-active\",\"false\":\"\" }[day == vm.day]' ng-click='vm.selectDay(day)'>{{day}}</td></tr>\
                                    </tbody>\
                                </table>\
                        </div>\
                        <div class='sui-calendar-select-footer'>\
                            <table>\
                                <tr>\
                                    <td class='sui-calendar-select-footer-time'><sui-number value='vm.hour'></sui-number></td>\
                                    <td class='sui-calendar-select-footer-time'>:</td>\
                                    <td class='sui-calendar-select-footer-time'><sui-number value='vm.minute'></sui-number></td>\
                                    <td class='sui-calendar-select-footer-time'>:</td>\
                                    <td class='sui-calendar-select-footer-time'><sui-number value='vm.second'></sui-number></td>\
                                    <td><button class='sui-button sui-calendar-select-footer-button' ng-click='vm.updateDate()'>确定</button></td>\
                                    <td><button class='sui-button sui-calendar-select-footer-button' ng-click='vm.cancel()'>取消</button></td>\
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
                if(text){
                    var date = new Date(text);
                    $scope.vm.calendars = vm.getDateCalendar(date.getFullYear(), date.getMonth());
                    $scope.vm.year = date.getFullYear();
                    $scope.vm.month = date.getMonth() + 1;
                    $scope.vm.day = date.getDate();
                    $scope.vm.hour = date.getHours();
                    $scope.vm.minute = date.getMinutes();
                    $scope.vm.second = date.getSeconds();
                    $scope.vm.time = date.toString();
                }
            })
        }
    }
})

.directive("suiNumber", function () {
    var vm = {
        template: "<div class='sui-number' ng-readonly='vm.readonly'>\
                    <table><tbody>\
                        <tr>\
                            <td rowspan='2'><input class='sui-input sui-number-input' readonly ng-model='value' type='text'></td>\
                            <td><button class='sui-number-top sui-icon-top' ng-click='vm.top()'></button></td>\
                        </tr>\
                        <tr>\
                            <td><button class='sui-number-bottom sui-icon-bottom' ng-click='vm.bottom()'></button></td>\
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
        controller:function($scope) {
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

.directive("suiSwitch", function () {
    var vm = {
        template: "<div class='sui-switch sui-noselect' ng-click='vm.check()' ng-readonly='vm.readonly'>\
                    <input type='checkbox' readonly value='vm.isCheck' class='sui-switch-input' />\
                    <div ng-class='{\"true\":\"sui-switch-checkbox sui-switch-checkbox-true\",\"false\":\"sui-switch-checkbox sui-switch-checkbox-false\" }[vm.isCheck]'>\
                        <div class='sui-switch-checkbox-dot'></div>\
                        <div class='sui-switch-checkbox-text'>{{vm.displayText}}<div>\
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
                readonly:false,
            };

            $scope.$watch("vm.isCheck", function (isCheck) {
                $scope.vm.displayText = isCheck ? $scope.vm.trueText : $scope.vm.falseText;
                $scope.value = isCheck;
            });

            $scope.$watch("value",function(value){
                if(value != undefined){
                    $scope.vm.isCheck = value;
                }
            });
            $scope.$watch("readonly", function (readonly) {
                $scope.vm.readonly = readonly;
            });
            $scope.$watch("falseText",function(falseText){
                $scope.vm.falseText = falseText;
                $scope.vm.displayText = falseText;
            });
            $scope.$watch("trueText",function(trueText){
                $scope.vm.trueText = trueText;
            });
        }
    }
})

.directive("suiText", function () {
    var vm = {
        template:"<div class='sui-text'><input type='text' class='sui-input sui-text-input' ng-model='text' ng-readonly='vm.readonly' /></div>"
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

.directive("suiGuid", function () {
    var vm = {
        template: "<div class='sui-guid' ng-readonly='vm.readonly'>\
                    <div class='sui-guid-text sui-guid-text-long'><sui-text readonly='vm.readonly' class='sui-guid-text-context' text='vm.guid_one'></sui-text><span class='sui-guid-text-symbol'>-</span></div>\
                    <div class='sui-guid-text'><sui-text class='sui-guid-text-context' readonly='vm.readonly' text='vm.guid_two'></sui-text><span class='sui-guid-text-symbol'>-</span></div>\
                    <div class='sui-guid-text'><sui-text class='sui-guid-text-context' readonly='vm.readonly' text='vm.guid_three'></sui-text><span class='sui-guid-text-symbol'>-</span></div>\
                    <div class='sui-guid-text'><sui-text class='sui-guid-text-context' readonly='vm.readonly' text='vm.guid_four'></sui-text><span class='sui-guid-text-symbol'>-</span></div>\
                    <div class='sui-guid-text sui-guid-text-maxlong'><sui-text readonly='vm.readonly' class='sui-guid-text-context' text='vm.guid_five'></sui-text></div>\
                    <div class='sui-guid-text'><button class='sui-guid-copy' ng-click='vm.copy()'></button><sui-tooltip ng-if='vm.showTooltip' text='vm.copyMessuige'></sui-tooltip></div>\
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
                copyMessuige: "Copy成功",
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

.directive("suiField", function () {
    var vm = {
        template:"<div ng-switch='vm.type'>\
                    <sui-text ng-if='type == 0' text='vm.value' readonly='vm.readonly'></sui-text>\
                    <sui-guid ng-if='type == 2' value='vm.value' readonly='vm.readonlyvm.readonly'></sui-guid>\
                    <sui-switch ng-if='type == 8' value='vm.value' readonly='vm.readonly'></sui-switch>\
                    <sui-number ng-if='type == 5' value='vm.value' readonly='vm.readonly'></sui-number>\
                    <sui-Calendar ng-if='type == 4' text='vm.value' readonly='vm.readonly'></sui-Calendar>\
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

.directive("suiTooltip", function () {
    var vm = {
        template:"<div class='sui-tooltip'>\
                    <div class='sui-tooltip-context'>\
                        <div class='sui-tooltip-arrow sui-tooltip-arrow-border'></div>\
                        <div class='sui-tooltip-arrow sui-tooltip-arrow-bacground'></div>\
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

.directive("suiFooter", function () {
    var vm = {
        template: "<div class='sui-footer' ng-transclude></div>"
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

.directive("suiAbout", function () { 
    var vm = {
        template: "<div class='sui-about'>\
                    <div class='sui-about-header'>\
                        <div class='sui-about-header-icon'>\
                            <img src='{{icon}}' />\
                        </div>\
                        <div class='sui-about-header-name'>{{name}}</div>\
                    </div>\
                    <div class='sui-about-footer' ng-transclude></div>\
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


.directive("suiCombo", function(){
    var  vm = {
        template:"<div class='sui-combo'>\
                    <input type='text' readonly class='sui-combo-text' ng-model='vm.text' ng-click='vm.startSelect()' />\
                    <div ng-if='vm.isSelecting' class='sui-combo-field'>\
                        <ul>\
                            <li ng-repeat='field in vm.fields' ng-click='vm.select(field)'><span>{{field.name}}</span></li>\
                        </ul>\
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
                    $scope.vm.isSelecting = !$scope.vm.isSelecting;
                },
                select: function (field) {
                    $scope.vm.text = field.name;
                    $scope.select({ field: field });
                    $scope.vm.startSelect();
                }
            }
            $scope.$watch("fields", function (fields) {
                $scope.vm.fields = fields;
                $scope.vm.text = fields[0].name;
            })
        }
    }  
})

.directive("suiCheck", function(){
    var  vm = {
        template:"<div class='sui-check'>\
                    <ul>\
                        <li ng-repeat='field in vm.fields'  ng-click='vm.select(field)'><div ng-class='{\"true\": \"sui-check-select sui-check-select-active\",\"false\":\"sui-check-select\"}[field.isSelect]'><div class='sui-check-select-span'>√</div></div><span>{{field.name}}</span></li>\
                    </ul>\
                  </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            fields:"="
        },
        controller: function ($scope) {
            $scope.vm = {
                fields:[], 
                select:function(field){
                    field.isSelect = !field.isSelect;
                }
            };
            
            $scope.$watch("fields",function(fields){
                $scope.vm.fields = fields.map(function(field){
                    field.isSelect = false;
                    return field;
                })
            });
        }
    }  
})

.directive("suiRadio",function(){
    var vm = {
        template:"<div class='sui-radio'>\
                    <ul>\
                        <li ng-repeat='field in vm.fields'  ng-click='vm.select(field)'><div ng-class='{\"true\": \"sui-radio-select sui-radio-select-active\",\"false\":\"sui-radio-select\"}[field.isSelect]'><div ng-class='{\"true\": \"sui-radio-select-span sui-radio-select-span-active\",\"false\":\"sui-radio-select-span\"}[field.isSelect]'></div></div><span>{{field.name}}</span></li>\
                    </ul>\
                  </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            fields:"="
        },
        controller: function ($scope) {
            $scope.vm = {
                fields:[], 
                select:function(field){
                    $scope.vm.fields.forEach(function(field){
                        field.isSelect = false;
                    })
                    field.isSelect = !field.isSelect;
                }
            };
            
            $scope.$watch("fields",function(fields){
                $scope.vm.fields = fields.map(function(field){
                    field.isSelect = false;
                    return field;
                })
            });
        }
    }
})

.directive("suiProgress",function(){
    var vm = {
        template:"<div class='sui-progress'>\
                    <div class='sui-progress-value' style='width:{{vm.value}}%'></div>\
                  </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            value:"="
        },
        controller: function ($scope) {
            $scope.vm = {
                value:0
            };
            
            $scope.$watch("value",function(value){
                if(value<=100)
                {
                    $scope.vm.value = value;
                }
                else
                {
                    $scope.vm.value = 100;
                }
            });
        }
    }
})

.directive("suiCode",["guid.service",function(guid){
    var vm = {
        template:"<div class='sui-code' id='{{vm.boxId}}'>\
                    <div class='sui-code-header'></div>\
                    <div class='sui-code-body'>\
                        <div id='{{vm.indexId}}' class='sui-code-body-index'>\
                            <ul>\
                                <li ng-repeat='i in [] | range:vm.index'>{{i}}.</li>\
                            </ul>\
                        </div>\
                        <div id='{{vm.codeId}}' class='sui-code-body-context' ng-transclude></div>\
                    </div>\
                  </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        transclude:true,
        priority: 1,
        scope: {
            code:"="
        },
        controller: function ($scope) {
            $scope.vm = {
                code:"",
                codeId:guid.newGuid(),
                indexId:guid.newGuid(),
                boxId:guid.newGuid(),
                index:0
            };
            $scope.$watch("code",function(code){
                $scope.vm.code = Prism.highlight(code, Prism.languages.javascript);
            })
            setTimeout(function(){
                $scope.$apply(function(){
                    var context = document.getElementById($scope.vm.codeId);
                    var box = document.getElementById($scope.vm.boxId);
                    var index = document.getElementById($scope.vm.indexId);
                    context.style.height = box.clientHeight-30+"px";
                    index.style.height =  box.clientHeight-30+"px";
                    $scope.vm.index = context.clientHeight/20;
                });
            },1000);
            
        }
    }
}])

.directive("suiMessagebar",function(){
    var vm = {
        template: "<div class='sui-messagebar'><span>{{vm.message}}</span><i>×</i></div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            message: "="
        },
        controller: function ($scope) {
            $scope.vm = {
                message: "",
            }
            $scope.$watch("message", function (message) {
                $scope.vm.message = message;
            })
        }
    }
})

.directive("suiButton", function () {
    var vm = {
        template: "<div class='sui-button-div'>\
                    <button class='sui-button {{vm.type}} {{vm.size}}' ng-click='vm.btn_click()'><sui-icon class='sui-button-icon' ng-if='vm.icon' type='vm.icon'></sui-icon><span>{{vm.text}}</span></button>\
                   </div>"
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            text: "=",
            type: "=",
            disabled: "=",
            size: "=",
            href: "=",
            click:"&",
            icon:"="
        },
        controller: function ($scope) {
            $scope.vm = {
                text: "",
                type: "default",
                size: "defaule",
                icon:false,
                btn_click: function () {
                    if ($scope.href && $scope.href != "") {
                        window.open($scope.href);
                    }
                    $scope.click();
                }
            };

            $scope.$watch("text", function (text) {
                $scope.vm.text = text;
            });
            $scope.$watch("type", function (type) {
                $scope.vm.type = "sui-button-" + type;
            });
            $scope.$watch("disabled", function (disabled) {
                setTimeout(function () {
                    $scope.$apply(function () {
                        $scope.vm.type = disabled ? "sui-button-disabled" : "sui-button-" + $scope.type || "sui-button-default";
                    });
                }, 100);
            });
            $scope.$watch("size", function (size) {
                $scope.vm.size = "sui-button-" + size;
            });
            $scope.$watch("icon",function(icon){
                $scope.vm.icon = icon;
            });
        }
    }
})

.directive("suiNav", function () {
    var vm = {
        template: "<div class='sui-nav'>\
                    <img class='sui-nav-icon' src='{{vm.icon}}' />\
                    <ul class='sui-nav-list'>\
                        <li class='sui-nav-item' ng-repeat='nav in vm.navs'>\
                            <a ng-if='nav.isLink' href='{{nav.url}}' target='_blank'>{{nav.title}}</a>\
                            <a ng-if='!nav.isLink' ng-click='vm.showSubs(nav)'>{{nav.title}}</a>\
                            <div ng-if='nav.isShowSubs' class='sui-nav-subnav'>\
                                <ul class='sui-nav-subnav-list'>\
                                    <li class='sui-nav-subnav-item' ng-repeat='subnav in nav.subs'>\
                                        <span ng-if='!subnav.isLink' ng-click='vm.subClick(subnav,nav)'>{{subnav.title}}</span>\
                                        <a ng-if='subnav.isLink' href='{{subnav.url}}' target='_blank'>{{subnav.title}}</a>\
                                    </li>\
                                </ul>\
                            </div>\
                        </li>\
                    </ul>\
                    <div class='sui-nav-custom' ng-transclude></div>\
                   </div>"
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude:true,
        scope: {
            navs: "=",
            icon: "=",
        },
        controller: function ($scope) {
            $scope.vm = {
                navs: [],
                showSubs: function (nav) {
                    $scope.vm.navs = $scope.vm.navs.map(function (nav) {
                        nav.isShowSubs = false;
                        nav.subs = nav.subs.map(function (sub) {
                            sub.isShowSubs = false;
                            return sub;
                        });
                        return nav;
                    });
                    nav.isShowSubs = !nav.isShowSubs;
                },
                subClick: function (sub,parentNav) {
                    sub.click();
                    parentNav.isShowSubs = false;
                }
            }
            $scope.$watch("navs", function (navs) {
                $scope.vm.navs = navs.map(function (nav) {
                    nav.isShowSubs = nav.isShowSubs ? true : false;
                    if (nav.subs) {
                        nav.subs = nav.subs.map(function (sub) {
                            sub.isShowSubs = sub.isShowSubs ? true : false
                            return sub;
                        });
                    }
                    else
                    {
                        nav.subs = [];
                    }
                    return nav;
                });
            }, true);
            $scope.$watch("icon", function (icon) {
                $scope.vm.icon = icon;
            });
        }
    }
})

.directive("suiCrumbs", function () {
    var vm = {
        template: "<div class='sui-crumbs'>\
                    <ul class='sui-crumbs-list'>\
                        <li class='sui-crumbs-item' ng-repeat='item in vm.items'>\
                            <a class='sui-crumbs-text' href='{{item.url}}' ng-if='!$last'>{{item.title}}</a>\
                            <span class='sui-crumbs-text' ng-if='$last'>{{item.title}}</span>\
                            <i ng-if='!$last'>{{vm.separator}}</i>\
                        </li>\
                    </ul>\
                    <div class='sui-clear'></div>\
                   </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            items:"=",
            separator:"="
        },
        controller: function ($scope) {
            $scope.vm = {
                items: [],
                separator:">"
            };
            $scope.$watch("items", function (items) {
                $scope.vm.items = items;
            }, true);

            $scope.$watch("separator",function(separator){
                $scope.vm.separator = separator;
            });
        }
    }
})

.directive("suiSidebar",function(){
    var vm = {
        template: "<div class='sui-sidebar'>\
                    <ul class='sui-sidebar-list'>\
                        <li ng-repeat='item in vm.items'>\
                            <a class='sui-sidebar-text' href='{{item.url}}' ng-if='item.subs == undefined'>{{item.title}}</a>\
                            <div class='sui-sidebar-subtitle' ng-if='item.subs != undefined' ng-click='vm.open(item)'>\
                                <span>{{item.title}}</span>\
                                <sui-icon class='sui-sidebar-subtitle-icon' type='\"angle_down\"' ng-if='item.subs != undefined && !item.isOpen' /></sui-icon>\
                                <sui-icon class='sui-sidebar-subtitle-icon' type='\"angle_up\"' ng-if='item.subs != undefined && item.isOpen' /></sui-icon>\
                            </div>\
                            <ul ng-if='item.subs != undefined && item.isOpen' class='sui-sidebar-list-sub'>\
                                <li ng-class='{\"true\":\"sui-sidebar-item sui-sidebar-item-active\",\"false\":\"sui-sidebar-item\"}[sub.isActive]'  ng-repeat='sub in item.subs'>\
                                    <a class='sui-sidebar-text' href='{{sub.url}}' target='{{sub.target}}' ng-click='vm.navClick(sub)'>{{sub.title}}</a>\
                                </li>\
                            </ul>\
                        </li></ul>\
                   </div>"
    }
    return {
        restrict:"E",
        template:vm.template,
        replace:true,
        priority:1,
        scope:{
            items:"=",
            position:"=",
            fixed:"="
        },
        controller:function($scope){
            $scope.vm = {
                items: [],
                navClick:function(item){
                    $scope.vm.items.forEach(function(nav){
                        nav.isActive = false;
                        nav.subs.forEach(function(sub){
                            sub.isActive = false;
                        })
                    })
                    item.isActive = true;
                },
                open:function(item){
                    $scope.vm.items.forEach(function(nav){
                        nav.isOpen = false;
                    });
                    item.isOpen = !item.isOpen;
                }
            };
            $scope.$watch("items", function (items) {
                $scope.vm.items = items;
            }, true);
        }
    }
})

.directive("suiPage",function(){
    var vm = {
        template:"<iframe src='{{vm.url}}' name='{{vm.name}}'></iframe>"
    }
    return {
        restrict:"E",
        template:vm.template,
        replace:true,
        priority:1,
        scope:{
            url:"=",
            id:"="
        },
        controller:function($scope){
            $scope.vm = {
                url:"",
                name:""
            };
            $scope.$watch("url",function(url){
                $scope.vm.url = url;
            })
            $scope.$watch("id",function(id){
                $scope.vm.name = id;
            })
        }
    }
})

.directive("suiLine",function(){
    var vm = {
        template: "<div class='sui-line'><fieldset class='sui-line-context'><legend class='sui-line-context-text'>{{vm.title}}</legend></fieldset></div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            title: "="
        },
        controller: function ($scope) {
            $scope.vm = {
                title: "",
            };
            $scope.$watch("title", function (title) {
                $scope.vm.title = title;
            })
        }
    }
})

.directive('contenteditable', function() {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ctrl) {
            //定位div(contenteditable = "true")
            function po_Last_Div(obj) {
                if (window.getSelection) {//ie11 10 9 ff safari
                    //obj.focus(); //解决ff不获取焦点无法定位问题
                    var range = window.getSelection();//创建range
                    range.selectAllChildren(obj[0]);//range 选择obj下所有子内容
                    range.collapseToEnd();//光标移至最后
                }
                else if (document.selection) {//ie10 9 8 7 6 5
                    var range = document.selection.createRange();//创建选择对象
                    //var range = document.body.createTextRange();
                    range.moveToElementText(obj[0]);//range定位到obj
                    range.collapse(false);//光标移至最后
                    range.select();
                }
            }

            element.bind('focus', function () {
                scope.timer = setInterval(function () {
                    ctrl.$setViewValue(element.html());
                },300);
            })

            // view -> model
            element.bind('blur', function() {
                scope.$apply(function() {
                    ctrl.$setViewValue(element.html());
                });
                clearInterval(scope.timer);
            });
            // model -> view
            ctrl.$render = function() {
                element.html(ctrl.$viewValue);
                po_Last_Div(element);
            };
            // load init value from DOM
            ctrl.$render();
        }
    };
})

.directive("suiCodeEdit", function () {
    var vm = {
        template: "<div class='sui-code-edit'>\
                    <div class='sui-code-edit-tools'>\
                        <ul class='sui-code-edit-tools-list'>\
                            <li class='sui-code-edit-tools-item'><sui-combo fields='vm.languages'></sui-combo></li>\
                            <li class='sui-code-edit-tools-item' ng-click='vm.exec()'><div class='sui-icon-exec sui-code-edit-exec'></div></li>\
                            <li class='sui-code-edit-tools-item'><label class='sui-code-edit-isHighlight-label'>语法高亮:</label><sui-switch value='vm.isHighlight' class='sui-code-edit-isHighlight'></sui-switch></li>\
                        </ul>\
                    </div>\
                    <div contenteditable ng-model='vm.text' class='sui-code-edit-textrea'></div>\
                  </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            exec:"&"
        },
        controller: function ($scope) {
            $scope.vm = {
                languages: [{ Name: "T-SQL" }, { Name: "JavaScript" }],
                text: "",
                isHighlight: true,
                exec: function () {
                    var div = document.createElement("div");
                    div.innerHTML = $scope.vm.text;
                    $scope.exec({ code: div.innerText, language:0 });
                }
            }
            $scope.$watch("vm.text", function (text) {
                if ($scope.vm.isHighlight) {
                    setTimeout(function () {
                        var div = document.createElement("div");
                        div.innerHTML = text;
                        $scope.vm.text = Prism.highlight(div.innerText, Prism.languages.sql);
                    }, 0)
                }
            })
        }
    }
})

.directive("suiUploader",function(){
    var vm = {
        template:"<div class='sui-uploader'>\
                    <div><sui-progress value='vm.progress' ng-if='vm.inprogress'></sui-progress><span ng-if='!vm.inprogress'>{{vm.filename}}</span></div>\
                    <sui-button class='sui-uploader-button' text='vm.title' click='vm.openUpload()'></sui-button>\
                    <input class='sui-uploader-input' type='file' onchange='angular.element(this).scope().vm.change()'/>\
                    <span>{{vm.fileTypes.join(',')}} ({{vm.fileSize / 1024}} K)</span>\
                  </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        scope: {
            upload:"&",
            title:"=",
            fileTypes:"=",
            fileSize:"=",
            progress:"="
        },
        controller: function ($scope) {
            $scope.vm = {
                title:"",
                fileInput:null,
                fileTypes:[],
                filename:"",
                progress:0,
                inprogress:false,
                openUpload:function(){
                    $scope.vm.fileInput.click();
                },
                change:function(){
                    $scope.upload({filename:$scope.vm.fileInput.value});
                    $scope.vm.filename = $scope.vm.fileInput.value;
                    $scope.vm.inprogress = true;
                }
            }

            $scope.$watch("title",function(title){
                $scope.vm.title = title;
            });

            $scope.$watch("fileTypes",function(types){
                $scope.vm.fileTypes = types;
            });

            $scope.$watch("progress",function(progress){
                $scope.vm.progress = progress;
                if(progress == 100){
                    $scope.vm.inprogress = false;
                }
            });

            $scope.$watch("fileSize",function(fileSize){
                $scope.vm.fileSize = fileSize;
            })
        },
        link:function($scope,element,attrs){
            $scope.vm.fileInput = element[0].children[2];
        }
    }
})

.directive("suiWindow",function(){
    var vm = {
        template:"<div class='sui-window-div'>\
                    <div class='sui-window-title'>\
                        <span class='sui-window-title-span'>{{vm.title}}</span>\
                        <ui class='sui-window-icons'>\
                            <li class='sui-window-icon sui-window-icon-close'></li>\
                            <li class='sui-window-icon sui-window-icon-max' ng-click='vm.max()'></li>\
                            <li class='sui-window-icon sui-window-icon-min'></li>\
                        </ui>\
                    </div>\
                    <div class='sui-window-context'><div ng-transclude></div>\</div>\
                  </div>",
        mousedown: function ($event)
        {
            if ($event.target.className == 'sui-border') {
                stamp.isMove = true;
                stamp.mouse = { left: $event.clientX, top: $event.clientY };
            }
        },

        mouseup: function ($event)
        {
            stamp.isMove = false;
        },

        move: function ($event)
        {
            if (stamp.isMove)
            {
                var suiWindow = document.getElementsByClassName('sui-window')[0];
                var x = $event.clientX - stamp.mouse.left;
                var y = $event.clientY - stamp.mouse.top;
                suiWindow.style.left = suiWindow.offsetLeft + x + 'px';
                suiWindow.style.top = suiWindow.offsetTop + y + 'px';
                stamp.mouse = { left: $event.clientX, top: $event.clientY };
            }
        }
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude:true,
        scope: {
            close:"&",
        },
        controller: function ($scope) {
            $scope.vm = {
                title:"Test",
                content:"Test"
            }
        },
        link:function($scope,element,attrs){
            $scope.vm.max = function(){
                 var height = document.body.clientHeight;
                 var width = document.body.clientWidth-20;
                 element[0].style.height = height + "px";
                 element[0].style.width = width + "px";
            }
        }
    }
})

.directive("suiPanel",function(){
    var vm = {
        template:"<div class='sui-panel'>\
                    <div class='sui-panel-title' ng-click='vm.fold()'><span>{{vm.title}}</span><sui-icon class='sui-panel-title-icon' type='vm.icon'></sui-icon></div>\
                    <div class='sui-panel-content' ng-if='vm.isShowContent'><div class='sui-panel-content-div' ng-transclude></div></div>\
                  </div>"
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude:true,
        scope: {
           title:"="
        },
        controller:function($scope){
            $scope.vm = {
                title:"",
                isShowContent:false,
                icon:"fold-bottom",
                fold:function(){
                    $scope.vm.isShowContent = !$scope.vm.isShowContent;
                    $scope.vm.icon = $scope.vm.isShowContent?"fold-top":"fold-bottom";
                }
            }

            $scope.$watch("title",function(title){
                $scope.vm.title = title;
            })
        }
    }
})

.directive("suiAvatar",function(){
    var vm = {
        template:"<div class='sui-avatar' ng-click='vm.click()'>\
                    <img class='sui-avatar-image' src='{{vm.src}}' />\
                    <div ng-if='vm.number>0' class='sui-avatar-number'>{{vm.number}}</div>\
                  </div>"
    }

    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude:true,
        scope: {
           src:"=",
           number:"=",
           href:"=",
        },
        controller:function($scope){
            $scope.vm = {
                src:"",
                number:0,
                click:function(){
                    window.open($scope.href);
                }
            }

            $scope.$watch("src",function(src){
                $scope.vm.src = src;
            });

            $scope.$watch("number",function(number){
                $scope.vm.number = number;
            });
        }
    }
})

.directive("suiCard",function(){
    var stamp = {
        isMove: false,
        mouse: { left: 0, top: 0 },
        card:null
    }
    var vm = {
        template:"<div class='sui-card'>\
                    <div class='sui-card-title sui-noselect' ng-mousedown='vm.mousedown($event)' ng-mousemove='vm.move($event)' ng-mouseup='vm.mouseup($event)'><span>{{vm.title}}</span></div>\
                    <div class='sui-card-content' ng-transclude></div>\
                  </div>",
        mousedown: function ($event)
        {
                stamp.isMove = true;
                stamp.mouse = { left: $event.clientX, top: $event.clientY };
        },

        mouseup: function ($event)
        {
            stamp.isMove = false;
        },

        move: function ($event,suiWindow)
        {
            if (stamp.isMove)
            {
                var x = $event.clientX - stamp.mouse.left;
                var y = $event.clientY - stamp.mouse.top;
                suiWindow.style.left = suiWindow.offsetLeft + x + 'px';
                suiWindow.style.top = suiWindow.offsetTop + y + 'px';
                stamp.mouse = { left: $event.clientX, top: $event.clientY };
            }
        }
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude:true,
        scope: {
           title:"="
        },
        controller:function($scope){
            $scope.vm = {
                title:"",
                mousedown: vm.mousedown,
                move: function($event){
                    vm.move($event,$scope.vm.card);
                },
                mouseup: vm.mouseup,
            }

            $scope.$watch("title",function(title){
                $scope.vm.title = title;
            })
        },
        link:function($scope,element,attrs){
            $scope.vm.card = element[0];
        }
    }
})

.directive("suiFixed",function(){
    var vm = {
        template:"<div class='sui-fixed' style='{{vm.position}}' ng-transclude>\</div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude:true,
        scope: {
            fixedTop:"=",
            fixedBottom:"=",
            fixedLeft:"=",
            fixedRight:"="
        },
        controller:function($scope){
            $scope.vm = {
                position:"",
            }

            function buildPosition(){
                var position = "";
                if($scope.fixedTop != undefined){
                    position += "top:"+$scope.fixedTop+"px;";
                }
                if($scope.fixedBottom != undefined){
                    position += "bottom:"+$scope.fixedBottom+"px;";
                }
                if($scope.fixedLeft != undefined){
                    position += "left:"+$scope.fixedLeft+"px;";
                }
                if($scope.fixedRight != undefined){
                    position += "right:"+$scope.fixedRight+"px;";
                }
                $scope.vm.position = position;
            }

            $scope.$watch("fixedTop",buildPosition);
            $scope.$watch("fixedBottom",buildPosition);
            $scope.$watch("fixedLeft",buildPosition);
            $scope.$watch("fixedRight",buildPosition);
        }
    }
})

.directive("suiTop",function(){
    var vm  = {
        template:"<div class='sui-top'>\
                    <sui-fixed fixed-bottom='50' fixed-right='50'><sui-icon click='vm.top()' class='sui-top-content' type='vm.icon'></sui-icon></sui-fixed>\
                  </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude:true,
        scope: {
        },
        controller:function($scope){
            $scope.vm = {
                icon:"up_han",
                scroll:(function(){
                    var interval = window.setInterval(function(){
                        var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                        if(currentScroll>0){
                             window.scrollTo( 0, currentScroll - 10);
                        } else {
                            window.clearInterval(interval);
                        }
                    },24);
                }),
                top:function(){
                    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
                    if(currentScroll>0){
                        $scope.vm.scroll();
                    }

                }
            }
        }
    }
})

.directive("suiCarousel",function(){
    var vm = {
        template:"<div class='sui-carousel'>\
                    <ul class='sui-carousel-list' style='width:{{vm.width*2*vm.items.length}}px;left:{{vm.left}}px;'>\
                        <li class='sui-carousel-list-item' style='width:{{vm.width}}px;' ng-repeat='item in vm.items'><img class='sui-carousel-list-item-img' title='{{item.title}}' src='{{item.src}}' /></li>\
                        <li class='sui-carousel-list-item' style='width:{{vm.width}}px;' ng-repeat='item in vm.items'><img class='sui-carousel-list-item-img' title='{{item.title}}' src='{{item.src}}' /></li>\
                    </ul>\
                    <div class='sui-carousel-title'></div>\
                    <ul class='sui-carousel-points'>\
                        <li class='sui-carousel-points-point' ng-repeat='item in vm.items' ng-click='vm.switch(item)'><div ng-class='{\"sui-carousel-points-point-dot-active\":vm.active == item.index}' class='sui-carousel-points-point-dot'></div></li>\
                    </ul>\
                  </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude:true,
        scope: {
            items:"=",
            speed:"="
        },
        controller:function($scope){
            $scope.vm = {
                items:[],
                width:0,
                left:0,
                speed:6,
                active:0,
                switch_interval:false,
                clear_move:function(){
                    if($scope.vm.switch_interval){
                        clearInterval($scope.vm.switch_interval);
                        $scope.vm.switch_interval = false;
                    }
                },
                start_move:function(){
                    $scope.vm.clear_move();
                    $scope.vm.switch_interval = window.setInterval(function(){
                        var move_width = 0;
                        var move_interval = window.setInterval(function(){
                            $scope.$apply(function(){
                                var list_width = $scope.vm.width * $scope.vm.items.length;
                                if(move_width >= $scope.vm.width){
                                    clearInterval(move_interval);
                                    move_width = 0;
                                    $scope.vm.active ++;
                                    if($scope.vm.active >= $scope.vm.items.length){
                                        $scope.vm.active = 0;
                                    }
                                    //纠正偏差
                                    var current_left = $scope.vm.active * $scope.vm.width;
                                    $scope.vm.left = 0 - current_left;
                                } else {
                                    $scope.vm.left -= 1;
                                    move_width += 1;
                                }
                                if(0-list_width > $scope.vm.left){
                                    $scope.vm.left = 0;
                                }
                            });
                        },1)
                    },$scope.vm.speed * 1000);
                },
                switch:function(item){
                    var target_left = 0 - item.index * $scope.vm.width;
                    $scope.vm.active = item.index;
                    $scope.vm.clear_move();
                    var move_interval = window.setInterval(function(){
                        $scope.$apply(function(){
                            if(target_left == $scope.vm.left){
                                clearInterval(move_interval);
                            } else {
                                $scope.vm.left = $scope.vm.left > target_left ? $scope.vm.left - 1 : $scope.vm.left + 1;
                            }
                        });
                    },0.5);
                    $scope.vm.start_move();
                }
            }

            $scope.$watch("speed",function(speed){
                if(speed){
                    $scope.vm.speed = speed;
                }
            });

            $scope.$watch("items",function(items){
                var index = 0;
                $scope.vm.items = items.map(function(item){
                    item.index = index++; 
                    return item;
                });
                $scope.vm.start_move();
            });
        },
        link:function($scope,elements,attrs){
            $scope.vm.width = elements[0].clientWidth;
        }
    }
})

.directive("suiTimeline",function(){
    var vm = {
        template:"<div class='sui-timeline'>\
                    <ul class='sui-timeline-list'>\
                        <li class='sui-timeline-list-item' ng-repeat='item in vm.items'>\
                            <div class='sui-timeline-list-item-title'><div class='{{item.style}}'><sui-icon ng-if='item.isIcon' type='item.icon'></sui-icon></div><span>{{item.title}}<span></div>\
                            <div class='sui-timeline-list-item-detailed'>{{item.detailed}}</div>\
                        </li>\
                    </ul>\
                  </div>",
        getStyle: function (status) {
            switch (status) {
                case 0: return "sui-timeline-list-item-title-icon"; 
                case 1: return "sui-timeline-list-item-title-icon sui-timeline-list-item-title-icon-success";
                case 2: return "sui-timeline-list-item-title-icon sui-timeline-list-item-title-icon-error";
            }
        }
    }   
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude:true,
        scope: {
            items:"=",
        },
        controller:function($scope){
            $scope.vm = {
                items: [],
            }

            $scope.$watch("items",function(items){
                $scope.vm.items = items.map(function (item) {
                    item.style = vm.getStyle(0);
                    if(item.isSuccess){
                        item.isIcon = true;
                        item.icon = 'o';
                        item.style = vm.getStyle(1);
                    } 
                    if(item.isError){
                        item.isIcon = true;
                        item.icon = 'cance';
                        item.style = vm.getStyle(2);
                    }
                    return item;
                });
            },true);
        }
    }
})

.directive("suiSteps",function(){
    var vm = {
        template:"<div class='sui-steps'>\
                    <ul class='sui-steps-list'>\
                        <li class='sui-steps-list-step' ng-repeat='item in vm.items'>\
                            <div class='sui-steps-list-step-icon'><span>{{item.index}}</span></div>\
                            <fieldset class='sui-steps-list-step-line'><legend class='sui-steps-list-step-line-title'>{{item.title}}</legend></fieldset>\
                            <div class='sui-steps-list-step-description'>{{item.description}}</div>\
                        </li>\
                    </ul>\
                    <div class='sui-clear'></div>\
                  </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude:true,
        scope: {
            items:"=",
        },
        controller:function($scope){
            $scope.vm = {
                items:[],
            }

            $scope.$watch("items",function(items){
                var index = 1;
                $scope.vm.items = items.map(function(item){
                    item.index = index ++ ;
                    return item;
                });
            },true);
        }
    }
})

.directive("suiButtonGroup",function(){
    var vm = {
        template:"<div class='sui-button-group' ng-transclude></div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude:true,
        scope: false
    }
})

.directive("suiSlider",function(){
    var vm = {
        template:"<div class='sui-slider' ng-class='{\"sui-slider-vertical\":vm.direction==\"vertical\"}'>\
                    <div class='sui-slider-line'>\
                        <div class='sui-slider-line-active' style='width:{{vm.value}}%'></div>\
                    </div>\
                    <div class='sui-slider-line-point' style='left:{{vm.value}}%;' ng-mousedown='vm.startSetValue($event)'></div>\
                  </div>"
    }
    return {
        restrict: "E",
        template: vm.template,
        replace: true,
        priority: 1,
        transclude:true,
        scope: {
            value:"=",
            min:"=",
            max:"=",
            type:"=",
            direction:"=",
        },
        controller:function($scope){
            $scope.vm = {
                value:0,
                isStartSetValue:false,
                startValue:0,
                isWatch:true,
                with:0,
                direction:"horizontal",
                startSetValue:function($event){
                    $scope.vm.isStartSetValue = true;
                    $scope.vm.startValue = $scope.vm.direction == 'vertical' ? $event.clientY : $event.clientX;
                },
                endSetValue:function(){
                    $scope.vm.isStartSetValue = false;
                },
                setValue:function($event){
                    $scope.$apply(function(){
                        if($scope.vm.isStartSetValue){
                            var ratio = 1/$scope.vm.width;
                            var pos = $scope.vm.direction == 'vertical' ? $event.clientY : $event.clientX;
                            var addValue = (pos - $scope.vm.startValue)*ratio*100;
                            $scope.vm.startValue = pos;
                            if($scope.vm.direction == 'vertical'){
                                addValue = 0 - addValue;
                            }
                            var newValue = $scope.vm.value + addValue;
                            if(newValue>100){
                                newValue = 100;
                            }
                            if(newValue<0){
                                newValue = 0;
                            }
                            $scope.vm.value = newValue;
                            
                            console.log("add:"+addValue+"   "+ $scope.vm.value);
                        }
                    });
                }
            }

            $scope.$watch("value",function(value){
                if($scope.vm.isWatch){
                    var ratio = 1/($scope.max-$scope.min);
                    $scope.vm.value = value * ratio * 100;
                }
            });
            $scope.$watch("vm.value",function(value){
                $scope.vm.isWatch = false;
                var ratio = 1/($scope.max-$scope.min);
                var newValue = value / ratio / 100;
                $scope.value = $scope.type=='int'?parseInt(newValue):newValue;
                console.log(value);
                //$scope.vm.isWatch = true;
            });
            $scope.$watch("direction",function(direction){
                if(direction){
                    $scope.vm.direction = direction;
                }
            });
        },
        link:function($scope,elements,attrs){
            document.addEventListener("mouseup",$scope.vm.endSetValue);
            document.addEventListener("mousemove",$scope.vm.setValue);
            $scope.vm.width = elements[0].clientWidth;
        }
    }
})

.directive("suiLines", ["guid.service",function (guid) {
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
                    labelsuingle: 15,                              //x轴文字倾斜角度
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
                    labelsuingle: 0,        // =>  labels' angle, in degrees
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

.directive("suiBars", ["guid.service", function (guid) {
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
                    labelsuingle: 15,                              //x轴文字倾斜角度
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

.directive("suiPie", ["guid.service", function (guid) {
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