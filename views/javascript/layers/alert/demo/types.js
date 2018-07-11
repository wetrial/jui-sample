define([], {
    options: {
        components: [
            {
                name: 'InfoBtn',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.alert.info({
                            message: '信息警告标题文案'
                        })
                    }
                }
            },
            {
                name: 'SuccessBtn',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.alert.success({
                            message: '成功警告标题文案'
                        })
                    }
                }
            },
            {
                name: 'WarningBtn',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.alert.warning({
                            message: '警告警告标题文案'
                        })
                    }
                }
            },
            {
                name: 'ErrorBtn',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.alert.info({
                            message: '错误警告标题文案'
                        })
                    }
                }
            }
        ]
    }
});

