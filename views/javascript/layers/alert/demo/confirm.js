define([], {
    options: {
        components: [
            {
                name: 'TBtn',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.alert.confirm({
                            message: '确定要删除吗？'
                        });
                    }
                }
            },
            {
                name: 'TDBtn',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.alert.confirm({
                            message: '确定要删除吗？',
                            description: '请慎重考虑。'
                        });
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

