(function ()
{
    function cryptogram_service()
    {
        //Base64 加密
        function _encryptForBase64(input)
        {
            return Base64.encode(input);
        }
        //Base64 解谜
        return {
            encryptForBase64: _encryptForBase64
        }
    }

    angular.module("admin").factory("cryptogram.service", [cryptogram_service])
})();