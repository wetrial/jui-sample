define([], {
    options: {
        components: [
            {
                name: 'Info',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.tip.info({
                            message: '信息提示的文案'
                        })
                    }
                }
            },
            {
                name: 'Success',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.tip.success({
                            message: '成功提示的文案'
                        })
                    }
                }
            },
            {
                name: 'Warning',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.tip.warning({
                            message: '警告提示的文案'
                        })
                    }
                }
            },
            {
                name: 'Error',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.tip.error({
                            message: '错误提示的文案'
                        })
                    }
                }
            }
        ]
    }
});