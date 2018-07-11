define([], {
    options: {
        components: function () {
            var view = this;

            return [
                {
                    name: 'InputGroup',
                    widget: 'jinputgroup',
                    components: [
                        {
                            name: 'Name',
                            widget: 'jtextbox',
                            label: '姓名',
                            required: true
                        },
                        {
                            name: 'Age',
                            widget: 'jnumberbox',
                            label: '年龄',
                            required: true
                        },
                        {
                            name: 'Gender',
                            widget: 'jradiolist',
                            label: '性别',
                            required: true,
                            sourceList: {
                                data: [
                                    { text: '男', value: 0 },
                                    { text: '女', value: 1 }
                                ]
                            }
                        },
                        {
                            name: 'Hobbies',
                            widget: 'jcheckboxlist',
                            label: '爱好',
                            sourceList: {
                                data: [
                                    { text: '唱歌', value: 1 },
                                    { text: '跳舞', value: 2 },
                                    { text: '旅游', value: 3 }
                                ]
                            }
                        },
                        {
                            name: 'EducationExperiences',
                            widget: 'jinputrepeat',
                            label: '教育经历',
                            itemComponents: [
                                {
                                    name: 'Degree',
                                    widget: 'jselect',
                                    label: '学历',
                                    fields: {
                                        text: "name",
                                        value: "value"
                                    },
                                    sourceList: {
                                        data: [
                                            { name: '博士', value: 1 },
                                            { name: '硕士', value: 2 },
                                            { name: '本科', value: 3 },
                                            { name: '大专', value: 4 },
                                            { name: '高中', value: 5 },
                                            { name: '中专/技校', value: 6 },
                                            { name: '初中', value: 7 },
                                            { name: '小学', value: 8 }
                                        ]
                                    },
                                    required: true
                                },
                                {
                                    name: 'School',
                                    widget: 'jtextbox',
                                    label: '学校名称',
                                    required: true
                                },
                                {
                                    name: 'StartYear',
                                    widget: 'jnumberbox',
                                    label: '入学年份',
                                    required: true,
                                }
                            ]
                        },
                        {
                            name: 'WorkExperiences',
                            widget: 'jinputrepeat',
                            label: '工作经历',
                            layoutMode: 'flow',
                            itemComponents: [
                                {
                                    name: 'Company',
                                    widget: 'jtextbox',
                                    label: '公司名称',
                                    required: true
                                },
                                {
                                    name: 'Province',
                                    widget: 'jselect',
                                    label: '所在地',
                                    required: true,
                                    fields: {
                                        text: "Name",
                                        value: "Value"
                                    },
                                    sourceList: {
                                        data: [
                                            { Name: '北京', Value: 1 },
                                            { Name: '上海', Value: 2 },
                                            { Name: '广州', Value: 3 }
                                        ]
                                    }
                                },
                                {
                                    name: 'StartDate',
                                    widget: 'jdatepicker',
                                    label: '开始时间',
                                    required: true
                                },
                                {
                                    name: 'EndDate',
                                    widget: 'jdatepicker',
                                    label: '结束时间',
                                    required: true
                                }
                            ]
                        }
                    ]
                },
                {
                    name: 'SaveBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function () {
                            console.log(view.$InputGroup.getValue());
                            view.$InputGroup.validate();
                        }
                    }
                }
            ]
        }
    }
})