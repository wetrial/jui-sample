'use strict';

(function (win) {
    requirejs.onError = function (err) {
        if (err.requireType === 'timeout') {
            location.reload();
        }
        else {
            throw err;
        }
    };
    requirejs.config({
        baseUrl: "/assets/js",
        waitSeconds: 6,//超时时间设为6秒
        onNodeCreated: function (node, config, moduleName, url) {
            //console.log('module ' + moduleName + ' is about to be loaded');
            NProgress.start();
            node.addEventListener('load', function () {
                //console.log('module ' + moduleName + ' has been loaded');
                NProgress.done();
            });

            ////加载模块出错自动刷新页面
            //node.addEventListener('error', function () {
            //    debugger;
            //    location.reload();
            //});
        },
        paths: {
            "jquery": "jquery-1.11.3",
            "jqueryui": "jquery-ui",
            "juiall": "jui/jui",
            "jquerydatepicker": "i18n/datepicker-zh-CN",
            "slimscroll": "jquery.slimscroll.min",
            "mock": "mock",
            "vue": '/assets/lib/vue/vue2.min',
        },
        "shim": {
            "slimscroll": ["jquery"],
            'vue': {
                exports: 'vue'
            }
        },
        urlArgs: "v=2.1.2"// + (new Date()).getTime()
    });

    require(['jquery', 'mock', 'jqueryui', 'juiall', 'jquerydatepicker', 'slimscroll'], function ($, Mock) {
        win.Mock = Mock;

        var config = {
            viewsDir: 'views'
        };

        $.router.start(config);

    });
})(window);
