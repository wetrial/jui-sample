define([], {
    options: {
        components: [
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
    }
})