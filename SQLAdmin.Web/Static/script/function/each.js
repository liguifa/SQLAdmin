(function () {
    Array.prototype.each = function (func) {
        var array = this;
        for (var i in array) {
            func(i, array[i], array);
        }
    }
})();