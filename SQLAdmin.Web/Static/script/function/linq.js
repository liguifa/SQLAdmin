(function () {
    //find
    Array.prototype.find = function (func) {
        this.each(function (i,item) {
            if (func(item)) {
                return item;
            }
        });
        return null;
    }
})();