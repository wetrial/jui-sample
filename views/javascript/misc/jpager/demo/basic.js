define([], {
    options: {
        components: [{
            name: 'Pager',
            widget: 'jpager',
            total: 100
        }]
    },

    _afterRender: function () {
        this.$Pager.bind();
    }

});