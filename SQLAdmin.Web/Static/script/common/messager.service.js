(function ()
{
    function messager_service() {
        var messageInfo = {
            window: 280,
            height: 162
        }

        function _window(content, winType) {
            var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
            var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            var alert = document.createElement("div");
            alert.classList.add("messager-alert");
            alert.classList.add(winType);
            alert.style.top = (h - messageInfo.height) / 2 + "px";
            alert.style.left = (w - messageInfo.window) / 2 + "px";
            alert.innerHTML = '<div class="messager-alert-title">信息</div><div class="messager-alert-content">' + content + '</div>';
            document.body.appendChild(alert)
        }

        function _alert(content) {
            _window(content);
        }
        function _error(content) {
            _window(content, "messager-alert-error");
        }
        function _loading(isHide) {
            if (!isHide) {
                var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
                var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
                var alert = document.createElement("div");
                alert.classList.add("message-loading-div");
                alert.innerHTML = '<div class="messager-model"></div><div class="messager-loading" style="top:' + (h - 128) / 2 + 'px;left:' + (w - 128) / 2 + 'px"><div class="wBall" id="wBall_1"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_2"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_3"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_4"><div class="wInnerBall"></div></div><div class="wBall" id="wBall_5"><div class="wInnerBall"></div></div></div>';
                document.body.appendChild(alert);
            }
            else
            {
                var loadings = document.getElementsByClassName("message-loading-div");
                if(loadings)
                {
                    loadings[0].parentElement.removeChild(loadings[0]);
                }
            }
        }
        return {
            alert: _alert,
            error: _error,
            loading: _loading
        }
    }

    angular.module("sqladmin").factory("messager.service", messager_service);
})();