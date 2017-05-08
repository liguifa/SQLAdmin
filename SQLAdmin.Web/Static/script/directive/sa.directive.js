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
                        <div class='sa-tabs-panel' ng-if='page.isSelected'><div ng-include src='page.url'></div></div>\
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
                for (var i in pages)
                {
                    var page = {
                        isSelected: false,
                        url: pages[i].url,
                        id: pages[i].id,
                        title:pages[i].title
                    }
                    $scope.vm.pages.push(page);
                }
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
                    e = e || window.event; 　//IE window.event
                    var t = e.target || e.srcElement; //目标对象
                    var treeId = t.attributes["tree-id"];
                    var selectTree = self.getTreeById(tree, treeId);
                    self.scope.doubleclick({ tree: selectTree });
                }

                treeElement.onclick = function (e) {
                    e = e || window.event; 　//IE window.event
                    var t = e.target || e.srcElement; //目标对象
                    var command = t.attributes["command"].value;
                    self.scope.menuCommand({ command: command });
                }
            }
        },
        buildNode: function (tree) {
            var self = this;
            var treeNode = document.createElement("li");
            treeNode.classList.add("sa-tree-li");
            var arrowNode = document.createElement("i");
            arrowNode.classList.add("sa-icon-arrow-right");
            var contextNode = document.createElement("span");
            contextNode.classList.add("sa-tree-children");
            var iconNode = document.createElement("i");
            iconNode.classList.add("sa-icon-folder");
            var nameNode = document.createElement("span");
            nameNode.textContent = tree.Name;
            nameNode.attributes["tree-id"] = tree.Id;
            var childrenNode = document.createElement("ul");
            childrenNode.classList.add("sa-tree-ul");
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
            //var func = document.onmousedown;
            //document.onmousedown = function()
            //{
            //    func();
            //    var contextmenus = document.getElementsByClassName("sa-contextmenu");
            //    for (var i in contextmenus) {
            //        if (contextmenus[i].style) {
            //            contextmenus[i].style.visibility = "";
            //        }
            //    }
            //}
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
        <th ng-repeat="field in vm.fields">{{field.name}}<div class="sa-datagrid-content-header-icon" ng-if="field.isPrimary"><img src="/Static/Images/icon_key.png" /></div></th>\
      </tr> \
    </thead>\
<tbody>\
      <tr ng-repeat="row in datas">\
        <td><input type="checkbox" name="" ng-model="row.isSelected" lay-skin="primary"></td>\
        <td ng-repeat="(key,val) in row.rows track by $index">{{val}}</td>\
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
            indexs:"=",
        },
        controller: function ($scope) {
            $scope.vm = {
                isGlobalSelected: false,
                globalChecked: function () {
                    for (var i in $scope.datas)
                    {
                        $scope.datas[i].isSelected = this.isGlobalSelected;
                    }
                }
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
                        isForeign:false
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
                    xaxis: [[0, "1"], [1, "2"]],
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