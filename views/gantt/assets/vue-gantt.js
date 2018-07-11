define([
  "vue",
  "/views/gantt/assets/vue-gantt-core.js",
  "text!/views/gantt/assets/templates/gantt.html",
  "text!/views/gantt/assets/templates/gantt-bar.html"
], function(Vue, ganttCore, ganttTmpl, ganttBarTmpl) {
  var dayMillSeconds = 24 * 60 * 60 * 1000;

  Vue.component("gantt", {
    template: ganttTmpl,
    props: ["type", "list", "setHeight"],
    data: function() {
      return {
        //type: this.type, //day|week|month
        //list: this.list, //数据源列表
        //dateTables: ganttCore.getRangeAssetsDate(rangeDate, this.type),//右边日期结构
        height: this.getHeight(),
        rangeDate: ganttCore.getDateRange(this.list, this.type),
        vLeftWidth:
          (localStorage && localStorage.getItem("progressGantt.LeftWidth")) ||
          "450"
      };
    },
    methods: {
      handleEventNodeClick: function(task) {
        this.$emit("view-task", task);
      },
      getPercent: function(task) {
        var percent = 0;
        if (task.EventStatus === 1) {
          percent = 100;
        } else {
          if (task.HasSubItems) {
            var total = 0,
              completed = 0;
            task.Items.forEach(function(item) {
              total++;
              completed += item.EventStatus === 1 ? 1 : 0;
            });
            percent = Math.ceil((completed / total) * 100);
          }
        }

        return [percent];
      },
      limitUser: function(arr) {
        var len = 2;
        arr = arr || [];
        if (arr.length > len) {
          return arr.slice(0, len);
        }
        return arr;
      },
      //changeValue: function () {
      //    var defaultValue = this.defaultValue;
      //    this.$emit('changeDefaultDateTimeValue', defaultValue, this.index);
      //},
      //获取相差的天数
      getEllipsDays: function(planStartDate, planEndDate) {
        if (planStartDate && planEndDate) {
          var ellipsMillSeconds =
            ganttCore.dateHelper.getDate(planEndDate) -
            ganttCore.dateHelper.getDate(planStartDate);
          return Math.ceil(ellipsMillSeconds / dayMillSeconds) + 1;
        }
        return "";
      },
      //切换选中状态
      toggleCollapse: function(task) {
        task.Open = !task.Open;
      },
      getHeight: function() {
        if (this.setHeight) {
          return this.setHeight();
        }
        return $(window).height() - 200; // 95;
      },
      onScroll: function(panel) {
        var $this = $(this.$el);
        var $leftBody = $this.find(".gantt-left .gantt-body");
        var $leftHead = $this.find(".gantt-left .gantt-header");
        var $rightBody = $this.find(".gantt-right .gantt-body");
        var $rightHead = $this.find(".gantt-right .gantt-header");

        if (panel === "left") {
          var leftScrollLeft = $leftBody.scrollLeft();

          if (leftScrollLeft != $leftHead.scrollLeft()) {
            $leftHead.scrollLeft(leftScrollLeft);
          }
        } else if (panel === "right") {
          var rightScrollTop = $rightBody.scrollTop();
          var rightScrollLeft = $rightBody.scrollLeft();
          if (rightScrollTop != $leftBody.scrollTop()) {
            $leftBody.scrollTop(rightScrollTop);
          }

          if (rightScrollLeft != $rightHead.scrollLeft()) {
            $rightHead.scrollLeft(rightScrollLeft);
          }
        }
      },
      initResizeBar: function() {
        var $scrollTarget = $(".gantt-left>.gantt-inner");
        if (!$scrollTarget.resizable("instance")) {
          $scrollTarget.resizable({
            handles: "e",
            maxWidth: 740,
            resize: function(event, ui) {
              localStorage.setItem("progressGantt.LeftWidth", ui.size.width);
              this.vLeftWidth = ui.size.width;
            }
          });
        }
      },
      initBrowserResize: function() {
        var _this = this;
        $(window).on("resize.gantt", function() {
          _this.height = _this.getHeight();
        });
      },
      //自动滚动到当前
      autoScrollToNow: function() {
        var $scrollTarget = $(".gantt-right .gantt-body");
        var $currentDay = $(".current-day");
        var currentDayIndex = $currentDay.index();
        if (currentDayIndex) {
          //这里滚动可能会存在差了几个像素的情况
          $scrollTarget
            .stop()
            .animate(
              {
                scrollLeft:
                  currentDayIndex * $currentDay.width() -
                  $scrollTarget.width() / 2
              },
              800,
              "linear"
            );
        }
      },
      initHover: function() {
        $(this.$el)
          .on("mouseover.hover", ".gantt-body-container>.gantt-row", function(
            e
          ) {
            var $target = $(e.currentTarget);
            var id = $target.data("id");
            $(
              '.gantt-body-container>.gantt-row[data-id="' + id + '"]'
            ).addClass("hover");
          })
          .on("mouseout.hover", ".gantt-body-container>.gantt-row", function(
            e
          ) {
            var $target = $(e.currentTarget);
            var id = $target.data("id");
            $(
              '.gantt-body-container>.gantt-row[data-id="' + id + '"]'
            ).removeClass("hover");
          });
      }
    },
    mounted: function() {
      this.initResizeBar();
      this.autoScrollToNow();
      this.initHover();
      this.initBrowserResize();
    },
    watch: {
      type: function(val) {
        this.rangeDate = ganttCore.getDateRange(this.list, val);
      }
    },
    computed: {
      //根据当前类型获取单个格子的宽度、单位{width:'number',unit:'number'}
      dayWidth: function() {
        return ganttCore.getDayWidth(this.type);
      },
      //根据当前类型获取单位数据(二级标题数据)
      unitDatas: function() {
        var result = [];
        this.dateTables.forEach(function(item) {
          item.childrens.forEach(function(date) {
            result.push(date);
          });
        });
        return result;
      },
      dateTables: function() {
        return ganttCore.getRangeAssetsDate(this.rangeDate, this.type);
      }
    },
    updated: function() {
      this.autoScrollToNow();
    },
    destroyed: function() {
      $(window).off("resize.gantt");
    }
  });

  //甘特布完成度
  Vue.component("gantt-bar", {
    template: ganttBarTmpl,
    props: ["rangeDate", "dayWidth", "task"],
    methods: {
      //getMarginLeft: function (date) {
      //    var dis = ganttCore.GetDistanceWithLimit(this.rangeDate, date);
      //    return Math.ceil(dis*this.dayWidth);
      //},
      ////获取两个日期之间的距离 addDays:int 额外补偿天数
      //getDistance: function (date1, date2, addDays) {
      //    addDays = addDays || 0;
      //    var dis = ganttCore.GetDistance(date1, date2) + addDays;
      //    return Math.ceil(dis * this.dayWidth);
      //},
      getActualBarProgress: function(task) {
        return ganttCore.getActualBarProgress(task, this.rangeDate);
      },
      getPlanBarProgress: function(task) {
        return ganttCore.getPlanBarProgress(task, this.rangeDate);
      }
    }
  });

  /***********
        格式化日期时间
        value:要格式化的值
        format: [yyyy-MM-dd]格式
        */
  Vue.filter("formatDateTime", function(value, format) {
    format = format || "yyyy-MM-dd";
    return ganttCore.dateHelper.formatDate(value, format);
  });

  /* ********
        取字符串的指定长度
        v:['']字符串值,
        len:[12]取的长度,
        index:[0]开始下标
        */
  Vue.filter("limitStr", function(value, len, postFix) {
    value = value || "";
    postFix = postFix || "";
    len = len || 12;
    return value.substr(0, len);
  });

  /* ********
        取字符串的指定长度
        v:['']字符串值,
        len:[12]取的长度,
        index:[0]开始下标
        */
  Vue.filter("lastStr", function(value, len) {
    value = value || "";
    len = len || 2;
    if (value.length <= len) {
      return value;
    }
    return value.substr(value.length - len, len);
  });

  return Vue;
});
