define([], function () {
    var exports = {};

    exports.dateHelper = {
        //增加指定天数 并返回int类型的数值
        addDay: function (date, days) {
            var result;
            result = exports.dateHelper.getDate(date);
            if (days != 0) {
                result.setDate(result.getDate() + days);
            }
            return result.getTime();
        },
        //获取int形日期
        getTime: function (date) {
            var result = exports.dateHelper.getDate(date);
            return result.getTime();
        },
        //获取date形日期
        getDate: function (date) {
            var result;
            var type = $.type(date);
            if (type === "string") {
                result = new Date(date);
            } else if (type === "date") {
                result = new Date(exports.dateHelper.formatDate(date, 'yyyy-MM-dd'));
            } else if (type === "number") {
                result = new Date(exports.dateHelper.formatDate(new Date(date), 'yyyy-MM-dd'));
            }
            else {
                result = new Date(null);
            }
            result.setHours(0);
            result.setMinutes(0);
            result.setSeconds(0);
            return result;
        },
        //获取该月中最后一周的最后一天(周六)
        getLastWeekDayTimeByDate: function (date) {
            var result = exports.dateHelper.getLastDateOfMonth(date);
            return exports.dateHelper.getLastDayOfWeedTime(result);
        },
        //获取月的最后一天
        getLastDateOfMonth: function (date) {
            var result = exports.dateHelper.getDate(date);
            result = new Date(result.getFullYear(), result.getMonth() + 1, 0);
            return result;
        },
        //获取月的第一天
        getFirstDateOfMonth: function (date) {
            var result = exports.dateHelper.getDate(date);
            result = new Date(result.getFullYear(), result.getMonth(), 1);
            return result;
        },
        //获取下个月的第一天
        getNextDateOfMonth: function (date) {
            var result = exports.dateHelper.getDate(date);
            result = new Date(result.getFullYear(), result.getMonth() + 1, 1);
            return result;
        },
        //获取年的最后一天
        getLastYearOfMonth: function (date) {
            var result = exports.dateHelper.getDate(date);
            result = new Date(result.getFullYear() + 1, result.getMonth(), 0);
            //result.setDate(result.getDate()-1);
            return result;
        },
        //获取年的第一天
        getFirstDateOfYear: function (date) {
            var result = exports.dateHelper.getDate(date);
            result = new Date(result.getFullYear(), 1, 1);
            return result;
        },
        //获取周的最后一天
        getLastDayOfWeedTime: function (date) {
            var result = exports.dateHelper.getDate(date);
            while (result.getDay() < 6) {
                result.setDate(result.getDate() + 1);
            }
            return result.getTime();
        },
        //获取周的第一天
        getFirstDayOfWeedTime: function (date) {
            var result = exports.dateHelper.getDate(date);
            while (result.getDay() % 7 != 0) {
                result.setDate(result.getDate() - 1);
            }
            return result.getTime();
        },
        //获取下周的第一天
        getNextDateOfWeek: function (date) {
            var result = exports.dateHelper.getLastDayOfWeedTime(date);
            result = exports.dateHelper.getDate(result);
            result.setDate(result.getDate() + 1);
            return result;
        },
        //获取两个日期相差的天数
        getDayCount: function (date1, date2) {
            var date1Time = exports.dateHelper.getTime(date1);
            var date2Time = exports.dateHelper.getTime(date2);
            return (date2Time - date1Time) / dayMillSeconds;
        },
        //获取两个日期相差的周数
        getWeekCount: function (date1, date2) {
            var date1Time = exports.dateHelper.getTime(date1);
            var date2Time = exports.dateHelper.getTime(date2);
            return (date1Time - date2Time) / (24 * 60 * 60 * 1000 * 7);
        },
        //是否闰年
        isLeapYear: function (year) {
            return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
        },
        //获取指定年指定月的天数
        getMonthDays: function (year, month) {
            return [31, (exports.dateHelper.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month - 1];
        },
        //获取指定日期属于笨年第多少周
        getWeekNumber: function (date) {
            var targetDay = exports.dateHelper.getDate(date);
            var year = targetDay.getFullYear();
            var month = targetDay.getMonth();
            var days = targetDay.getDate();
            //该天是这一年中的第多少天
            for (var i = 1; i < month + 1; i++) {
                days += exports.dateHelper.getMonthDays(year, i);
            }
            //该年第一天是星期几
            var yearFirstDay = new Date(year, 0, 1).getDay();
            //计算是第几周
            days += yearFirstDay;
            var week = Math.ceil(days / 7);
            return week;
        },
        //日期格式化
        formatDate: function (pDate, pFormatStr) {
            var dFormat = "yyyy-MM-dd",//default date format
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
            } else if (typeof (str) == "object") {
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
        }
    }

    var displayFormat = "yyyy年MM月dd";
    var yyMM = "yyyy年MM月";
    var now = exports.dateHelper.getDate(new Date());
    var dayMillSeconds = 24 * 60 * 60 * 1000;

    //获取实际显示的日期区间块
    //{start:'Date',end:'Date'}
    /**
     * 根据最大日期和最小日期以及类型获取日期区间
     * @param {ranges} [object] {min:'',max:''}
     * @param {formatType} [string] day|week|month
     * @return {object} {start:'',end:''}
     */
    exports.getDateRange = function (minAndMaxDate, formatType) {
        var minDate = minAndMaxDate.min;
        var maxDate = minAndMaxDate.max;
        //如果周视图 需要最低夸84天
        //如果月视图 最低需要夸180天
        var ellipDays = exports.dateHelper.getDayCount(minDate, maxDate);
        if (formatType === "week") {
            if (ellipDays < 84) {
                var subDays = Math.ceil((84 - ellipDays) / 2);
                minDate = exports.dateHelper.addDay(minDate, -subDays);
                maxDate = exports.dateHelper.addDay(maxDate, subDays)
            }
        }
        else if (formatType === "month") {
            if (ellipDays < 180) {
                var subDays = Math.ceil((180 - ellipDays) / 2);
                minDate = exports.dateHelper.addDay(minDate, -subDays);
                maxDate = exports.dateHelper.addDay(maxDate, subDays)
            }
        }

        var result= {
            start: getStartDate(minDate, formatType),
            end: getEndDate(maxDate, formatType),
        }
        return result;
    }

    /**
     * 根据类型获取以日为单位的宽度
     * @param {string['day'|'week'|'month']} formatType
     * @return {int}
     */
    exports.getDayWidth = function (formatType) {
        //默认为day
        var result =18;
        switch (formatType) {
            case "week":
                result =12;
                break;
            case "month":
                result =6;
                break;
            default:
        }
        return result;
    }

    /** 获取右边区域数据结构
     *[
     *      {
     *          text: '',
     *          childrens: [
     *              {isCurrent:bool,text:''}
     *          ]
     *      }
     *  ]
     * */
    exports.getRangeAssetsDate = function (rangeDate, formatType) {
        var result = [];
        switch (formatType) {
            case "day": result = getRangeAssetsDateForDay(rangeDate.start, rangeDate.end); break;
            case "week": result = getRangeAssetsDateForWeek(rangeDate.start, rangeDate.end); break;
            case "month": result = getRangeAssetsDateForMonth(rangeDate.start, rangeDate.end); break;
            default:
        }

        return result;
    }

    /*
     * 获取两个指定日期之间相差的天数
     */
    exports.GetDistance = function (dateFrom, dateTo) {
        return Math.ceil((exports.dateHelper.getTime(dateTo) - exports.dateHelper.getTime(dateFrom)) / dayMillSeconds);
    }

    /*
     * 获取指定日期距左边的天数(考虑超最大值的情况)
     */
    exports.GetDistanceWithLimit = function (dateRange, dateTo) {
        return getDistInfoWithLimit(dateRange, dateTo);
    }


    /**
     * 获取任务的计划情况
     * @param {object} 任务对象
     * @return {object} 
     * {
     *  start:{distance:number,days:1},
     *  normal:{distance:number,days:number},
     *  end:{distance:number,days:1}
     * }
     */
    exports.getPlanBarProgress = function (task, rangeDate) {
        var result = {};
        var normal = getPlanRangeProgress(task, rangeDate);
        var start = getPlanStartProgress(task, rangeDate);
        var end = getPlanEndProgress(task, rangeDate);

        start && (result.start = start);
        end && (result.end = end);
        normal && (result.normal = normal);

        return result;
    }

    /**
     * 获取任务的实际情况
     * @param {object} 任务对象
     * @return {object} 
     * {
     *  start:{distance:number,days:1},
     *  normal:{distance:number,days:number},
     *  warn:{distance:number,days:number},
     *  delay:{distance:number,days:number},
     *  end:{distance:number,days:1}
     * }
     */
    exports.getActualBarProgress= function (task, rangeDate) {
        var result = {};

        var start = getActualStartProgress(task, rangeDate);
        var normal = getActualNormalProgress(task, rangeDate);
        var warn = getActualWarnProgress(task, rangeDate);
        var delay = getActualDelayProgress(task, rangeDate);
        var end = getActualEndProgress(task, rangeDate);

        start && (result.start = start);
        normal && (result.normal = normal);
        warn && (result.warn = warn);
        delay && (result.delay = delay);
        end && (result.end = end);
        return result;
    }

    /**
     * 获取任务的最大日期和最小日期
     * @param {array[object]} 任务列表
     * @return {object} {min:'日期',max:'日期'}
     */
    exports.getTaskMinAndMaxDate=function(tasks) {
        var dates = [];
        tasks.forEach(function (task) {
            AppendTaskDates(dates, task);
            task.Items && task.Items.forEach(function (sTask) {
                AppendTaskDates(dates, sTask);
            })
        })
        dates.sort();
        return {
            min: dates[0] || new Date(),
            max: dates[dates.length-1]||new Date()
        }
    }

    return exports;


    function getPlanStartProgress(task, rangeDate) {
        var result = null;
        if (task.PlanStartDate && !task.PlanEndDate) {
            var range = {
                startLeftDays: getDistInfoWithLimit(rangeDate, task.PlanStartDate)
            }
            if (range.startLeftDays >= 0) {
                result = {
                    days:1,
                    distance: range.startLeftDays
                }
            }
        }
        return result;
    }

    function getPlanRangeProgress(task, rangeDate) {
        var result = null;
        if (task.PlanStartDate && task.PlanEndDate) {
            var range = {
                startLeftDays: getDistInfoWithLimit(rangeDate, task.PlanStartDate),
                endLeftDays: getDistInfoWithLimit(rangeDate, task.PlanEndDate)
            }
            if (0<=range.startLeftDays&& range.startLeftDays <= range.endLeftDays) {
                result = {
                    days: range.endLeftDays - range.startLeftDays+1,
                    distance: range.startLeftDays
                }
            }
        }
        return result;
    }

    function getPlanEndProgress(task, rangeDate) {
        var result = null;
        if (!task.PlanStartDate && task.PlanEndDate) {
            var range = {
                endLeftDays: getDistInfoWithLimit(rangeDate, task.PlanEndDate)
            }
            if (range.endLeftDays >= 0) {
                result = {
                    days: 1,
                    distance: range.endLeftDays
                }
            }
        }
        return result;
    }

    //实际 开始
    function getActualStartProgress(task, rangeDate) {
        var result = null;
        if (task.ActualStartDate && !task.ActualCompletedDate) {
            var range = {
                startLeftDays: getDistInfoWithLimit(rangeDate, task.ActualStartDate)
            }
            if (range.startLeftDays >= 0) {
                result = {
                    days: 1,
                    distance: range.startLeftDays
                }
            }
        }
        return result;
    }

    //实际 正常部分
    function getActualNormalProgress(task, rangeDate) {
        var result = null;
        //完成状态
        if (task.ActualStartDate) {
            var normalRange = {
                startDateTime: exports.dateHelper.getTime(task.ActualStartDate),
            }

            if (task.ActualCompletedDate) {
                normalRange.endDateTime =Math.min(exports.dateHelper.getTime(task.ActualCompletedDate), exports.dateHelper.getTime(task.PlanEndDate || task.ActualCompletedDate))
            }
            else {
                normalRange.startDateTime = exports.dateHelper.addDay(normalRange.startDateTime, 1);
                normalRange.endDateTime = Math.min(exports.dateHelper.getTime(now), exports.dateHelper.getTime(task.PlanEndDate || now));
            }
            var range = {
                startLeftDays: getDistInfoWithLimit(rangeDate, normalRange.startDateTime),
                endLeftDays: getDistInfoWithLimit(rangeDate, normalRange.endDateTime)
            }
            if (0 <= range.startLeftDays && range.startLeftDays <= range.endLeftDays) {
                result = {
                    days: range.endLeftDays - range.startLeftDays + 1,
                    distance: range.startLeftDays
                }
            }
        }
        
        return result;
    }

    //实际 预警部分
    function getActualWarnProgress(task, rangeDate) {
        var result = null;
        //前置条件:尚未完成、有计划开始日期、计划完成、有设置实际开始日期
        // 取值方式 从实际开始日期 -(计划完成|今天)
        if (!task.ActualCompletedDate&&task.PlanStartDate &&task.PlanEndDate&& task.ActualStartDate) {
            var warnStart = Math.max(exports.dateHelper.getTime(task.ActualStartDate), exports.dateHelper.getTime(task.PlanStartDate));
            var warnRange = {
                startDateTime: exports.dateHelper.addDay(warnStart,1),
                endDateTime: Math.min(exports.dateHelper.getTime(task.PlanEndDate || now), exports.dateHelper.getTime(now))
            };
            var range = {
                startLeftDays: getDistInfoWithLimit(rangeDate, warnRange.startDateTime),
                endLeftDays: getDistInfoWithLimit(rangeDate, warnRange.endDateTime)
            }
            if (0 <= range.startLeftDays && range.startLeftDays <= range.endLeftDays) {
                result = {
                    days: range.endLeftDays - range.startLeftDays + 1,
                    distance: range.startLeftDays
                }
            }
        }        
        return result;
    }

    //实际 延期部分
    function getActualDelayProgress(task, rangeDate) {
        var result = null;
        if (task.PlanEndDate) {
            var compareEndDate = task.ActualCompletedDate || now;
            //如果有实际完成日期 跟实际完成日期比对，如果没 跟今天比对
            var range = {
                startLeftDays: getDistInfoWithLimit(rangeDate, exports.dateHelper.addDay(task.PlanEndDate,1)),
                endLeftDays: getDistInfoWithLimit(rangeDate, compareEndDate)
            }
            if (0 <= range.startLeftDays && range.startLeftDays <= range.endLeftDays) {
                result = {
                    days: range.endLeftDays - range.startLeftDays + 1,
                    distance: range.startLeftDays
                }
            }

        }

        return result;
    }

    //实际 结束
    function getActualEndProgress(task, rangeDate) {
        var result = null;
        if (!task.ActualStartDate && task.ActualCompletedDate) {
            var range = {
                endLeftDays: getDistInfoWithLimit(rangeDate, task.ActualCompletedDate)
            }
            if (range.endLeftDays >= 0) {
                result = {
                    days: 1,
                    distance: range.endLeftDays
                }
            }
        }
        return result;
    }

    


     /**
     * 获取指定日期距最左边的距离信息(天、夸的天)
     * @return {int}  天数:负数、0、正数
     */
    function getDistInfo(minDate, date) {
        var result = null;
        if (date && minDate) {
            return exports.dateHelper.getDayCount(minDate, date);
        }
        return result;
    }

     /**
     * 获取指定日期距最左边的距离信息(天、夸的天) -带范围限制
     * @param dateRange{start:'',end:''} 限制的范围值 如果给定的值不在改范围 将限定在改范围内
     * @return {int}  天数:负数、0、正数
     */
    function getDistInfoWithLimit(dateRange, dateTo) {
        dateRange.start = exports.dateHelper.getTime(dateRange.start);
        dateRange.end = exports.dateHelper.getTime(dateRange.end);
        dateTo = exports.dateHelper.getTime(dateTo);

        //确保计算的日期在最大&最小日期之间
        var rangeTo = Math.max(dateTo, dateRange.start);
        rangeTo = Math.min(rangeTo, dateRange.end);

        return Math.ceil((rangeTo - dateRange.start) / dayMillSeconds);
    }


    //获取日视图的 月、子日期
    function getRangeAssetsDateForDay(start, end) {
        var result = [];
        while (exports.dateHelper.getTime(start) <= exports.dateHelper.getTime(end)) {

            var rangeEnd = exports.dateHelper.getLastDateOfMonth(start);
            var item = {
                text: exports.dateHelper.formatDate(start, displayFormat) + '至' + exports.dateHelper.formatDate(rangeEnd, displayFormat),
                days: 0,
                childrens: []
            };

            while (exports.dateHelper.getTime(start) <= exports.dateHelper.getTime(rangeEnd)) {
                var children = {
                    isCurrent: exports.dateHelper.formatDate(now, displayFormat) === exports.dateHelper.formatDate(start, displayFormat),
                    text: exports.dateHelper.formatDate(start, "dd"),
                    days: 1
                };
                item.days += children.days;
                item.childrens.push(children);
                start = exports.dateHelper.addDay(start, 1);
            }
            result.push(item);
        }
        return result;
    }

    //获取周视图的 月、周数
    function getRangeAssetsDateForWeek(start, end) {
        var result = [];
        var nowTime = exports.dateHelper.getTime(now);
        while (exports.dateHelper.getTime(start) <= exports.dateHelper.getTime(end)) {

            var item = {
                text: exports.dateHelper.formatDate(start, yyMM),
                days:0,
                childrens: []
            };
            var rangeEnd = exports.dateHelper.getLastWeekDayTimeByDate(start);

            while (exports.dateHelper.getTime(start) <= exports.dateHelper.getTime(rangeEnd)) {

                var blockEndTime = exports.dateHelper.getLastDayOfWeedTime(start);

                var children={
                    isCurrent: (nowTime >= exports.dateHelper.getTime(start) && nowTime <= blockEndTime),
                    text: exports.dateHelper.formatDate(start, "MM-dd") + "至" + exports.dateHelper.formatDate(blockEndTime, "MM-dd"),
                    days: 7
                }
                item.days += children.days;
                item.childrens.push(children);

                start = exports.dateHelper.getNextDateOfWeek(start);
            }
            result.push(item);
        }
        return result;
    }

    //获取周视图的 月、月数
    function getRangeAssetsDateForMonth(start, end) {
        var result = [];
        var nowTime = exports.dateHelper.getTime(now);
        start = exports.dateHelper.getTime(start);
        end = exports.dateHelper.getTime(end);
        
        while (start <= end) {

            var item = {
                text: exports.dateHelper.formatDate(start, yyMM),
                days:0,
                childrens: []
            };

            var blockEndTime = exports.dateHelper.getLastDateOfMonth(start);

            var children = {
                isCurrent: (nowTime >= start && nowTime <= blockEndTime),
                text: exports.dateHelper.formatDate(start, "MM-dd") + "至" + exports.dateHelper.formatDate(blockEndTime, "MM-dd"),
                days: exports.dateHelper.getDayCount(start, blockEndTime)+1
            };
            item.days += children.days;
            item.childrens.push(children);

            start = exports.dateHelper.getNextDateOfMonth(start);

            result.push(item);
        }
        return result;
    }


    //根据类型获取开始日期
    function getStartDate(vDate, formatType) {
        //处理没有获取到最小日期的情况使用当期日期往前推7天
        if (!vDate) {
            vDate = new Date();
            vDate.setDate(-7);
        }

        vDate = exports.dateHelper.getDate(vDate);
        if (formatType == 'day') {
           vDate = exports.dateHelper.getFirstDateOfMonth(vDate);
        }
        else if (formatType == 'week') {
            vDate = exports.dateHelper.getDate(exports.dateHelper.getFirstDayOfWeedTime(vDate));
        }
        else if (formatType == 'month') {
            vDate = exports.dateHelper.getDate(exports.dateHelper.getFirstDateOfMonth(vDate));
        }
        return vDate;
    }

    //根据类型获取结束日期
    function getEndDate(vDate, formatType) {
        //处理没有获取到最大日期的情况使用当期日期往后推7天
        if (!vDate) {
            vDate = new Date();
            vDate.setDate(7);
        }

        vDate = exports.dateHelper.getDate(vDate);
        if (formatType == 'day') {
            vDate = exports.dateHelper.getLastDateOfMonth(vDate);
        }
        else if (formatType == 'week') {
            vDate = exports.dateHelper.getDate(exports.dateHelper.getLastDayOfWeedTime(vDate));
        }
        // Set to last day of current Month
        else if (formatType == 'month') {
            vDate = exports.dateHelper.getDate(exports.dateHelper.getLastDateOfMonth(vDate));
        }

        return vDate;
    }
       

    //添加任务中的日期(计划开始、计划结束、实际开始、实际结束)
    function AppendTaskDates(result, task) {
        appendIfNotNull(result, task.PlanStartDate);
        appendIfNotNull(result, task.PlanEndDate);
        appendIfNotNull(result, task.ActualStartDate);
        appendIfNotNull(result, task.ActualCompletedDate);
    }
    //如果有值则添加
    function appendIfNotNull(result, date) {
        if (date && result.indexOf(date) == -1) {
            result.push(date);
        }
    }
})