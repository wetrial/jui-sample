define([], {
    _afterRender: function () {
        $.jui.tip({
            message: '我是最原始的提示，关溜溜的，等你来打扮哦',
            tipElem: '#Tip',
            duration: false

        });

        $.jui.tip.info({
            message: '信息提示的文案',
            tipElem: '#InlineInfo',
            duration: false

        });

        $.jui.tip.success({
            message: '成功提示的文案',
            tipElem: '#InlineSuccess',
            duration: false

        });

        $.jui.tip.warning({
            message: '警告提示的文案',
            tipElem: '#InlineWarning',
            duration: false
        });

        $.jui.tip.error({
            message: '错误提示的文案',
            tipElem: '#InlineError',
            duration: false
        });

        $.jui.tip.success({
            message: '邮件已成功发送',
            tipElem: '#WithCommands',
            commands: {
                data: [
                    { text: '撤销', icon: 'fa fa-undo' }
                ]
            },
            duration: false
        });

        $.jui.tip.loading({
            tipElem: '#Loading',
            duration: false
        });

        $.jui.tip.loading({
            message: '努力加载中',
            tipElem: '#Loading',
            duration: false
        });
    }
});