define(['vue'], function (Vue) {
    return {
        _afterRender: function () {
            var that = this;
            that.vuePage = new Vue({
                el: '#myPage',
                data: {
                    a:11,
                    b:'test'
                }
            });
        }
    };
});
