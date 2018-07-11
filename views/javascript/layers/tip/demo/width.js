define([], {
    _afterRender: function () {
        $.jui.tip.info({
            message: '自适应内容宽度',
            tipElem: '#ContentWidth',
            duration: false

        });

        $.jui.tip.info({
            message: '100% 宽度',
            tipElem: '#FullWidth',
            styleClass: 'jtip-full',
            duration: false
        });

        $.jui.tip.info({
            message: '自适应内容宽度带关闭按钮',
            tipElem: '#ContentWidthClose',
            showClose: true,
            duration: false
        });

        $.jui.tip.info({
            message: '100% 宽度带关闭按钮',
            tipElem: '#FullWidthClose',
            styleClass: 'jtip-full',
            showClose: true,
            duration: false
        });
    }
});