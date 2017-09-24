(function (){
    function pop_service(guid) {
        var messageInfo = {
            width: 570,
            height: 300,
            notify:{
                top_right:0,
                top_left:0,
                bottom_right:0,
                bottom_left:0
            },
            icons:{
                "messager-alert-error":"&#xe81c;",
                "messager-alert-warn":"&#xe83e;",
                "messager-alert-info":"&#xe823;",
                "messager-alert-success":"&#xe819;"}
        }

        function _window(content, winType) {
            var alertId = guid.newGuid();
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var alert = document.createElement("div");
            alert.classList.add("messager-alert");
            alert.classList.add(winType);
            alert.id = alertId;
            alert.style.top = (h - messageInfo.height) / 2 + "px";
            alert.style.left = (w - messageInfo.width) / 2 + "px";
            alert.innerHTML = '<div class="messager-alert-title">信息</div><div class="messager-alert-content"><i class="sui-icon">'+messageInfo.icons[winType]+'</i>' + content + '</div><div class="message-alert-tool"><button id="' + alertId + '_ok_btn" class="sui-button">确定</button></div>';
            document.body.appendChild(alert);
            document.getElementById(alertId + "_ok_btn").onclick = function () {
                document.getElementById(alertId).remove();
            }
        }

        function _alert(content) {
            _window(content,"messager-alert-warn");
        }
        function _error(content) {
            _window(content, "messager-alert-error");
        }
        function _info(content) {
            _window(content, "messager-alert-info");
        }
        function _success(content) {
            _window(content,"messager-alert-success");
        }
        function _loading(isHide) {
            if (!isHide) {
                var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                var alert = document.createElement("div");
                alert.classList.add("messuige-loading-div");
                alert.innerHTML = '<div class="messager-model"></div><div class="messager-loading" style="top:' + (h - 128) / 2 + 'px;left:' + (w - 128) / 2 + 'px"><div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div></div>';
                document.body.appendChild(alert);
            }
            else
            {
                var loadings = document.getElementsByClassName("messuige-loading-div");
                if(loadings)
                {
                    loadings[0].parentElement.removeChild(loadings[0]);
                }
            }
        }
        function _confirm(content,func) {
            var alertId = guid.newGuid();
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var alert = document.createElement("div");
            alert.classList.add("messager-alert");
            //alert.classList.add(winType);
            alert.id = alertId;
            alert.style.top = (h - messageInfo.height) / 2 + "px";
            alert.style.left = (w - messageInfo.width) / 2 + "px";
            alert.innerHTML = '<div class="messager-alert-title">信息</div><div class="messager-alert-content">' + content + '</div><div class="message-alert-tool"><button class="sui-button sui-button-primary" id="' + alertId + '_ok_cel">否</button><button class="sui-button" id="' + alertId + '_ok_btn">是</button></div>';
            document.body.appendChild(alert);
            document.getElementById(alertId + "_ok_btn").onclick = function () {
                document.getElementById(alertId).remove();
                func();
            }
        }
        function _notify(type,posType,title,content){
            var alertId = guid.newGuid();
            var alert = document.createElement("div");
            alert.id =alertId;
            alert.classList.add("messager-notify");
            _setNotifyPosition(posType,alert);
            alert.setAttribute("pos-type",posType);
            alert.innerHTML = "<div class='messager-notify-title'>"+title+"</div><div class='messager-notify-content'>"+content+"</div>";
            document.body.appendChild(alert);
            setTimeout(function(){
                var element = document.getElementById(alertId);
                var posTYpe = element.getAttribute("pos-type");
                element.remove();
                switch(posType){
                    case 1:messageInfo.notify.top_left -= 1;break;
                    case 2:messageInfo.notify.top_right -= 1;break;
                    case 3:messageInfo.notify.bottom_right -= 1;break;
                    case 4:messageInfo.notify.bottom_left -= 1;break;
                }
            },4500)
        }
        function _setNotifyPosition(posType,alert){
            switch(posType){
                case 1:{
                    alert.style.top = messageInfo.notify.top_left*118 + 10 + "px";
                    alert.style.left = "10px";
                    essageInfo.notify.top_lef += 1;
                    break;
                }
                case 2:{
                    alert.style.top = messageInfo.notify.top_right*118 + 10 + "px";
                    alert.style.right = "10px";
                    messageInfo.notify.top_right += 1;
                    break;
                }
                case 3:{
                    alert.style.bottom = messageInfo.notify.bottom_right*118 + 10 + "px";
                    alert.style.right = "10px";
                    messageInfo.notify.bottom_right += 1;
                    break;
                }
                case 4:{
                    alert.style.bottom = messageInfo.notify.bottom_left*118 + 10 + "px";
                    alert.style.left = "10px";
                    messageInfo.notify.bottom_left += 1;
                    break;
                }
            }
        }
        function _global(content){
            var alertId = guid.newGuid();
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var alert = document.createElement("div");
            alert.classList.add("messager-global-alert");
            // alert.classList.add(winType);
            alert.id = alertId;
            alert.style.top = (h - messageInfo.height) / 2 + "px";
            alert.style.left = (w - messageInfo.width) / 2 + "px";
            alert.innerHTML = '<span>'+content+'</span>';
            document.body.appendChild(alert);
        }
        return {
            alert: _alert,
            error: _error,
            loading: _loading,
            confirm: _confirm,
            info:_info,
            success:_success,
            notify: _notify,
            global:_global,
        }
    }

    angular.module("shinyui.pop",["shinyui"]).factory("pop.service", ["guid.service",pop_service]);
})();