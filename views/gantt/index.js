define(['/views/gantt/assets/vue-gantt-core.js', '/views/gantt/assets/vue-gantt.js'], function (ganttCore) {
    return {
        _afterRender: function () {
            var that = this;
            var filter="all";
            that.getGanttData(filter,function(ganttData){
                
                var assetsDateRange = ganttCore.getTaskMinAndMaxDate(ganttData);

                that.vuePage = new Vue({
                    el: '#viewPageContainer',
                    data: {
                        //页面需要的数据
                        filter:filter,
                        datePickerRange:[assetsDateRange.min,assetsDateRange.max],
                        assetsDateRange: assetsDateRange, //右边块的日期范围(修改为自定义获取 不从任务列表中获取)
                        list: ganttData, //甘特图需要的数据
                        type: 'day', //day week month
                        pickerOptions:{
                            shortcuts: [{
                                text: '最近三个月',
                                onClick(picker) {
                                  const end = new Date();
                                  const start = new Date();
                                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                                  picker.$emit('pick', [start, end]);
                                }
                              },
                              {
                                text: '最近六个月',
                                onClick(picker) {
                                  const end = new Date();
                                  const start = new Date();
                                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 180);
                                  picker.$emit('pick', [start, end]);
                                }
                              },
                              {
                                text: '最近一年',
                                onClick(picker) {
                                  const end = new Date();
                                  const start = new Date();
                                  start.setTime(start.getTime() - 3600 * 1000 * 24 * 365);
                                  picker.$emit('pick', [start, end]);
                                }
                              }]
                        }
                    },
                    methods: {
                        //用于设置高度(实际内容部分的高度)
                        setHeight:function(){
                            return $(window).height() - 230;// 95;
                        },
                        toggleType:function(type){
                            if(this.type!==type){
                                this.type=type;
                            }
                        },
                        changeDatePickerRange:function(){
                            Vue.set(this, "assetsDateRange", {
                                min:ganttCore.dateHelper.getDate(this.datePickerRange[0]),
                                max:ganttCore.dateHelper.getDate(this.datePickerRange[1])
                            });
                        },
                        handleChangeFilter:function(e){
                            that.getGanttData(that.vuePage.filter,function(gd){
                                assetsDateRange = ganttCore.getTaskMinAndMaxDate(gd);

                                Vue.set(this.vuePage, "datePickerRange", [assetsDateRange.min,assetsDateRange.max]);
                                Vue.set(this.vuePage, "assetsDateRange", assetsDateRange);
                                Vue.set(that.vuePage, "list", gd);
                            })                            
                        },
                        //用于打开任务详情之类的
                        viewTask: function (task) {
                           console.log(task);
                        }
                    }
                });
            });
        },
        getData: function (type) {
            return $.jui.getJson({
                url: $.jui.utils.format('/views/gantt/assets/data/{0}.json',type),
                method: 'get',
                loading:false
            })
        },
        convetToGanttData: function (list) {
            var result = [];
            list.forEach(function (item, index) {
                var level1Task = {
                    Id: item.Id,
                    ParentId: '',//父节点Id
                    EventNodeName: item.EventNodeName, //节点名称
                    PlanStartDate: item.PlanStartDate, //计划开始日期
                    PlanEndDate: item.PlanEndDate, //计划结束日期
                    ActualStartDate: item.ActualStartDate, //实际开始日期
                    ActualCompletedDate: item.CompletedDate, //实际完成日期
                    Percent: 0,//完成百分比
                    EventStatus: item.EventStatus,
                    Users: item.AssignationUsers, //责任人 {FullName:'',Id:''...}
                    IsMileStone: item.IsMileStone,
                    Open: true,//展示子节点
                    HasSubItems: false, //这里如果存在动态加载子节点的情况 需要自己处理下
                    Items: []
                }


                item.Children && item.Children.forEach(function (sItem, sIndex) {
                    var level2Task = {
                        Id: sItem.Id,
                        ParentId: level1Task.Id,//父节点Id
                        EventNodeName: sItem.EventNodeName, //节点名称
                        PlanStartDate: sItem.PlanStartDate, //计划开始日期
                        PlanEndDate: sItem.PlanEndDate, //计划结束日期
                        ActualStartDate: sItem.ActualStartDate, //实际开始日期
                        ActualCompletedDate: sItem.CompletedDate, //实际完成日期
                        Percent: 0,//完成百分比
                        EventStatus: sItem.EventStatus,
                        IsMileStone: sItem.IsMileStone,
                        HasSubItem: sItem.Children && sItem.Children.length > 0,
                        //ChildrenPercent: Math.ceil((sItem.FinishedChildrenCount / sItem.ChildrenCount) * 100),
                        Users: sItem.AssignationUsers //责任人 {FullName:'',Id:''...}
                    }
                    if (!level1Task.HasSubItems) {
                        level1Task.HasSubItems = true;
                    }
                    level1Task.Items.push(level2Task);
                })
                result.push(level1Task);
            });
            return result;
        },
        getGanttData(type,callback){
            var that=this;
            that.getData(type).done(function(rep){
                var ganttData=that.convetToGanttData(rep.Data.data);
                callback(ganttData);
            });
        },
        _destroy: function () {
            this.vuePage.$destroy(); //销毁vue组件 因为里面绑定了浏览器滚动事件
            this._super();
        }
    };
});
