define([], {
    options: {
        components: [
            {
                name: 'Default',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.tip.info({
                            message: '我是提示信息'
                        });
                    }
                }
            },
            {
                name: 'TopCenter',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.tip.info({
                            message: '我是提示信息',
                            align: 'top_center'
                        });
                    }
                }
            },
            {
                name: 'TopLeft',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.tip.info({
                            message: '我是提示信息',
                            align: 'top_left'
                        });
                    }
                }
            },
            {
                name: 'TopRight',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.tip.info({
                            message: '我是提示信息',
                            align: 'top_right'
                        });
                    }
                }
            },
            {
                name: 'BottomCenter',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.tip.info({
                            message: '我是提示信息',
                            align: 'bottom_center'
                        });
                    }
                }
            },
            {
                name: 'BottomLeft',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.tip.info({
                            message: '我是提示信息',
                            align: 'bottom_left'
                        });
                    }
                }
            },
            {
                name: 'BottomRight',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.tip.info({
                            message: '我是提示信息',
                            align: 'bottom_right'
                        });
                    }
                }
            }
        ]
    }
});