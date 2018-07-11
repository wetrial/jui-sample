define([], {
    options: {
        components: [
            {
                name: 'WithButton',
                widget: 'jtextbox',
                button: {
                    text: 'Search',
                    styleClass: 'bg-primary',
                    click: function () {
                        $.jui.tip.info(this.getValue());
                    }
                }
            }
        ]
    }
});