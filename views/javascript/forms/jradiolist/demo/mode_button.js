define([], {
    options: {
        components: [
            {
                name: 'Radiolist',
                widget: 'jradiolist',
                label: '性别',
                data: 1,
                mode: 'button',
                sourceList: {
                    data: [
                        {
                            text: '男', value: 0
                        },
                        {
                            text: '女', value: 1
                        }
                    ]
                }
            }
        ]
    }
});