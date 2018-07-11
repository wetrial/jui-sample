define([], {
    options: {
        components: [
            {
                name: 'BasicCommands',
                widget: 'jlistCommands',
                data: [
                    {
                        text: '查看',
                        command: function () {
                            $.jui.tip({
                                message: '查看'
                            });
                        }
                    },
                    { text: '编辑', icon: 'fa fa-edit' },
                    { text: '删除' },
                    {
                        text: '其他',
                        children: [
                            { text: '移动', disabled: true },
                            { text: '拷贝' },
                        ]
                    }
                ]
            }
        ]
    }
})