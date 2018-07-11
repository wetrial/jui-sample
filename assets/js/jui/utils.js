(function (factory) {
    if (typeof define === "function" && define.amd) {

        // AMD. Register as an anonymous module.
        define([
            "jquery", "jui/template"
        ], factory);
    } else {

        // Browser globals
        factory(jQuery, template);
    }
}(function ($, template) {

    String.prototype.trim = function (characters) {
        return this.replace(new RegExp('^' + characters + '+|' + characters + '+$', 'g'), '');
    }

    String.prototype.prepend = function (character) {
        if (this[0] != character) {
            return (character + this).toString();
        }
        else {
            return this.toString();
        }
    }

    $.jui = $.jui || {};

    $.jui.template = template;

    $.jui.tmpl = function (idOrContent, data) {
        var ret = idOrContent;
        if (!/[^\w\-\.:]/.test(idOrContent)) {
            ret = template(idOrContent, data);
        }
        else {
            var render = template.compile(idOrContent);
            ret = render(data);
        }

        return ret;
    };

    /* UTILS ***************************************************/

    $.jui.utils = $.jui.utils || {};

    // 检测是否是 jquery 对象 
    $.jui.utils.isJqObj = function (o) {
        return (o && o.length && (typeof jQuery === "function" || typeof jQuery === "object") && o instanceof jQuery) ? true : false;
    };

    $.jui.utils.pathCombine = function () {
        var path = '';
        var args = $.makeArray(arguments);

        $.each(args, function (index, item) {
            if (index > 0) {
                path += '/' + item.trim('/');
            }
            else {
                path += item.trim('/');
            }
        });

        return path;
    }

    $.jui.utils.parseUrl = function (url) {
        var query = {};
        var path = '';
        var queryIndex = url.indexOf('?');
        var queryStr = '';

        if (url != '') {
            if (queryIndex > -1) {
                path = url.substring(0, queryIndex);
                var paramStr = url.substring(queryIndex + 1);
                queryStr = paramStr
                var paramArr = paramStr.split('&');

                $.each(paramArr, function (i, e) {
                    var item = e.split('='),
                        key,
                        val;
                    key = item[0];
                    val = item[1];
                    if (key !== '') {
                        query[key] = decodeURIComponent(val);
                    }
                });
            }
            else {
                path = url;
            }
        }

        return {
            url: url,
            path: path,
            query: query,
            queryStr: queryStr
        }
    }

    $.jui.utils.format = function (source, params) {
        if (arguments.length == 1)
            return function () {
                var args = $.makeArray(arguments);
                args.unshift(source);
                return $.format.apply(this, args);
            };
        if (arguments.length > 2 && params.constructor != Array) {
            params = $.makeArray(arguments).slice(1);
        }
        if (params.constructor != Array) {
            params = [params];
        }
        $.each(params, function (i, n) {
            source = source.replace(new RegExp("\\{" + i + "\\}", "g"), n);
        });
        return source;
    };

    $.jui.utils.formatDate = function () {
        var dFormat = "yyyy-MM-dd hh:mm:ss",//default date format
            utc = true,
            str = arguments[0],
            format = arguments[1] || dFormat;
        if (typeof str === "boolean") {
            utc = str;
            str = arguments[1];
            format = arguments[2] || dFormat;
        }
        if (!str) return;
        //if (!format) format = "dd/MM/yyyy hh:mm:ss";
        var curDate = new Date();
        //base on server's time zone, -480:Beijing,-240:dubai.
        var timeoffset = -480;//curDate.getTimezoneOffset();
        var myDate
        if (str instanceof Date) {
            myDate = str;
        } else if (typeof str == "number") {
            myDate = new Date(str);
        } else if ($.type(str) == "object") {
            var _format = str.format; //str format
            str = str.date;
        } else if (typeof str == "string") {
            if (/Date/.test(str) || !isNaN(str)) {
                str = str.replace(/(^\/Date\()|(\)\/$)/g, "");
                str = parseInt(str);
                //UTC to Local time
                if (utc) str = str - (timeoffset * 60000);
                myDate = new Date(str);
            }
            else if (/\d{4}.\d{2}.\d{2}/.test(str)) {
                var regDate = /(\d{4}).(\d{2}).(\d{2}).*/;
                var regTime = /.*?(\d{1,2}):(\d{1,2}):(\d{1,2})/;
                var arrDate = str.replace(regDate, "$1,$2,$3").split(',');
                var arrTime = [];
                if (regTime.test(str)) {
                    arrTime = str.replace(regTime, "$1,$2,$3").split(',');
                }
                myDate = new Date(arrDate[0], arrDate[1] - 1, arrDate[2], arrTime[0] || 0, arrTime[1] || 0, arrTime[2] || 0);
            }
            else if (/\:/.test(str)) {
                var _reg1 = /(\d{1,2})([\s\/])(\d{1,2})\2(\d{2,4})/;
                var _reg2 = /(\d{2,4})([\s\/\-])(\d{1,2})\2(\d{1,2})/;
                var _format = str.split(":")[1]; //str format
                str = str.split(":")[0];
                if (_format == "dmy") {
                    str = str.replace(_reg1, "$3$2$1$2$4");
                } else if (_format == "ydm") {
                    str = str.replace(_reg2, "$1$2$4$2$3");
                }
                myDate = new Date(str);
                if (!utc) {
                    str = myDate.getTime() + (timeoffset * 60000);
                    myDate = new Date(str);
                }
            }
            else {
                return str;
            }
        } else {
            return;
        }
        var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        var opts = {
            "M+": myDate.getMonth() + 1,                    //Month 
            "d+": myDate.getDate(),                         //Day   
            "W+": weeks[myDate.getDay()],                         //Day   
            "h+": myDate.getHours(),                        //Hours   
            "m+": myDate.getMinutes(),                      //Minute   
            "s+": myDate.getSeconds(),                      //Second   
            "q+": Math.floor((myDate.getMonth() + 3) / 3),  //Quarter   
            "S": myDate.getMilliseconds()                   //Millisecond   
        };
        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (myDate.getFullYear() + "").substr(4 - RegExp.$1.length));
        }
        for (var k in opts) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, (RegExp.$1.length == 1) ? (opts[k]) : (("00" + opts[k]).substr(("" + opts[k]).length)));
            }
        }
        return format;
    };

    $.jui.utils.jsonEqual = function (obj1, obj2) {
        return JSON.stringify(obj1) === JSON.stringify(obj2);
    };

    $.jui.utils.htmlEncode = function (value) {
        return $('<div/>').text(value).html();
    };

    $.jui.utils.htmlDecode = function (value) {
        return $('<div/>').html(value).text();
    };

    $.jui.utils.getFirstLeaf = function (treeNodes, childrenField) {
        childrenField = childrenField || 'children';
        var first = null;
        if (treeNodes.length > 0) {
            first = treeNodes[0];
            var children = treeNodes[0][childrenField];
            if (children && children.length > 0) {
                first = $.jui.utils.getFirstLeaf.getFirstLeaf(children);
            }
        }

        return first;
    }

    /* template helper ***************************************************/

    $.jui.template.helper('formatDate', function (v, format) {
        format = format || 'yyyy-MM-dd';
        return $.jui.utils.formatDate(false, v, format);
    });

    /* jquery plugin ***************************************************/

    $.fn.findByName = function (name) {
        return this.find('[name="' + name + '"]');
    };

    $.fn.findUntil = function (selector, mask, result) {
        result = typeof result !== 'undefined' ? result : new jQuery();
        this.children().each(function () {
            var thisObject = jQuery(this);
            if (thisObject.is(selector))
                result.push(this);
            var meet = false;
            if ($.isArray(mask)) {
                $.each(mask, function (index, item) {
                    if (thisObject.is(item)) {
                        meet = true;
                        return false;
                    }
                });
            }
            else if (thisObject.is(mask)) {
                meet = true;
            }
            if (!meet) {
                thisObject.findUntil(selector, mask, result);
            }
        });
        return result;
    }

    $.fn.equalHeights = function () {
        var maxHeight = 0,
            $this = $(this);

        $this.each(function () {
            var height = $(this).outerHeight();

            if (height > maxHeight) { maxHeight = height; }
        });

        return $this.css('height', maxHeight);
    };

    /* SIMPLE EVENT BUS *****************************************/

    $.jui.event = (function () {

        var _callbacks = {};

        var on = function (eventName, callback) {
            if (!_callbacks[eventName]) {
                _callbacks[eventName] = [];
            }

            _callbacks[eventName].push(callback);
        };

        var off = function (eventName, callback) {
            var callbacks = _callbacks[eventName];
            if (!callbacks) {
                return;
            }

            var index = -1;
            for (var i = 0; i < callbacks.length; i++) {
                if (callbacks[i] === callback) {
                    index = i;
                    break;
                }
            }

            if (index < 0) {
                return;
            }

            _callbacks[eventName].splice(index, 1);
        };

        var trigger = function (eventName) {
            var callbacks = _callbacks[eventName];
            if (!callbacks || !callbacks.length) {
                return;
            }

            var args = Array.prototype.slice.call(arguments, 1);
            for (var i = 0; i < callbacks.length; i++) {
                callbacks[i].apply(this, args);
            }
        };

        // Public interface ///////////////////////////////////////////////////

        return {
            on: on,
            off: off,
            trigger: trigger
        };
    })();

    // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
    // ============================================================

    function transitionEnd() {
        var el = document.createElement('bootstrap')

        var transEndEventNames = {
            WebkitTransition: 'webkitTransitionEnd',
            MozTransition: 'transitionend',
            OTransition: 'oTransitionEnd otransitionend',
            transition: 'transitionend'
        }

        for (var name in transEndEventNames) {
            if (el.style[name] !== undefined) {
                return { end: transEndEventNames[name] }
            }
        }

        return false // explicit for ie8 (  ._.)
    }

    // http://blog.alexmaccaw.com/css-transitions
    $.fn.emulateTransitionEnd = function (duration) {
        var called = false
        var $el = this
        $(this).one('bsTransitionEnd', function () { called = true })
        var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
        setTimeout(callback, duration)
        return this
    }

    $.support.transition = transitionEnd()

    if ($.support.transition) {

        $.event.special.bsTransitionEnd = {
            bindType: $.support.transition.end,
            delegateType: $.support.transition.end,
            handle: function (e) {
                if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
            }
        }
    }

    // END CSS TRANSITION SUPPORT


    /* jshint browser:true
    *
    * window-location-origin - version 0.0.1
    * Add support for browsers that don't natively support window.location.origin
    *
    * Authror: Kyle Welsby <kyle@mekyle.com>
    * License: MIT
    */
    (function (location) {
        'use strict';
        if (!location.origin) {
            var origin = location.protocol + "//" + location.hostname + (location.port && ":" + location.port);

            try {
                // Make it non editable
                Object.defineProperty(location, "origin", {
                    enumerable: true,
                    value: origin
                });
            } catch (e) {
                // IE < 8
                location.origin = origin;
            }
        }
    })(window.location);
}));