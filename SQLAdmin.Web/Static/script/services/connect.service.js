(function ()
{
    function connect_service($http, cryptogram, messager, event, session)
    {
        function _loginDatabase(db)
        {
            var query = {
                Address: db.address,
                Port: db.port,
                Username: db.username,
                Password: cryptogram.encryptForBase64(db.password),
                Type: 0
            };
            
            $http.post("/Connect/LoginDb", query).then(function (res)
            {
                var loginResult = res.data;
                if(!loginResult.IsLogin)
                {
                    messager.error("登录失败！");
                }
                else
                {
                    session.set("config", query);
                    event.trigger("connect");
                }
            })
        }

        return {
            loginDatabase: _loginDatabase
        }
    }
    angular.module("admin").factory("connect.service", ["$http", "cryptogram.service", "messager.service", "event.service", "session.service", connect_service]);
})();