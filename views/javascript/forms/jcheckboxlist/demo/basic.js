define([], {
    options: {
        components: [
            {
                name: 'CheckboxList',
                widget: 'jcheckboxlist',
                label: '爱好',
                data: 1,
                sourceList: {
                    data: [
                        {
                            text: '唱歌', value: 1
                        },
                        {
                            text: '跳舞', value: 2
                        },
                        {
                            text: '旅游', value: 3
                        }
                    ]
                }
            }
        ]
    }
});