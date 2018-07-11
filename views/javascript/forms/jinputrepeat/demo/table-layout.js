define([], {
    options: {
        components: [
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
                ],
                valueChanged: function(){
                    console.log('value changed');
                }
            }
        ]
    }
})