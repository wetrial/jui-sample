define([], {
    options: {
        components: function () {
            var view = this;

            return [
                {
                    name: 'SimpleHideLayerBtn',
                    events: {
                        click: function (event) {
                            view.$SimpleLayer.hide();
                        }
                    }
                },
                {
                    name: 'SimpleShowLayerBtn',
                    events: {
                        click: function (event) {
                            view.$SimpleLayer.show();
                        }
                    }
                },
                {
                    name: 'SimpleLayer',
                    widget: 'jlayer',
                    showIf: true,
                    appendTo: null,
                    insertAfter: null,
                }
            ];
        }
    }

});