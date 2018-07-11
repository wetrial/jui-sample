define([], {
    options: {
        components: [
            {
                name: 'MenuCommands',
                widget: 'jlistCommands',
                mode: 'menu-row',
                data: [
                    {
                        text: '查看',
                        command: function () {
                            $.jui.tip({
                                message: '查看'
                            })
                        }
                    },
                    { text: '编辑', icon: 'fa fa-edit' },
                    { text: '删除' },
                    {
                        text: '其他',
                        children: [
                            { text: '移动' },
                            { text: '拷贝' },
                        ]
                    }
                ]
            }
        ]
    }
})