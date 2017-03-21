(function ()
{
    function connect_service($http, cryptogram)
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
                
            })
        }

        return {
            loginDatabase: _loginDatabase
        }
    }
    angular.module("admin").factory("connect.service", ["$http", "cryptogram.service", connect_service]);
})();