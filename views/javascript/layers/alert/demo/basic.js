define([], {
    options: {
        components: [
            {
                name: 'BasicTipBtn',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.alert({
                            message: '我是最普通的tip'
                        })
                    }
                }
            },
            {
                name: 'TDBtn',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.alert({
                            message: '我是标题',
                            description: '我是描述',
                            commands: {
                                data: [
                                    {
                                        text: '确定'
                                    }
                                ]
                            }
                        })
                    }
                }
            },
            {
                name: 'TIBtn',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.alert({
                            message: '你是一个好人',
                            icon: 'fa fa-user t-success'
                        });
                    }
                }
            },
            {
                name: 'TDIBtn',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.alert({
                            message: '我不想做一个好人',
                            description: '好人有好报吗？',
                            icon: 'fa fa-user t-danger'
                        });
                    }
                }
            }
        ]
    }
});