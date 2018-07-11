define([], {
    options: {
        dataUrl: function () {
            return '/views/javascript/' + this.widgetType + '/demo.js';
        },
        components: function () {
            var view = this;

            return [
                {
                    name: 'WidgetType',
                    widget: 'jtmpl',
                    data: { WidgetType: view.widgetType.split('/')[1] }
                },
                {
                    name: 'Tabs',
                    widget: 'jlistTabs',
                    data: [
                        { id: 'demo', text: '示例' },
                        { id: 'doc', text: '文档' }
                    ],
                    selectable: {
                        selectOnClick: true
                    },
                    mode: 'h',
                    styleClass: 'jlistMenu-line'
                },
                {
                    name: "DemoMenu",
                    widget: 'jlistMenu',
                    data: view.data,
                    fields: { key: "name" },
                    styleClass: "jlistMenu-line",
                    itemClick: function (event, eventData) {
                        view._$DemoWrapper.scrollTop(0);

                        $.router.go({
                            query: {
                                demo: eventData.itemData.name
                            }
                        });
                    }
                },
                {
                    name: 'DemoRouter',
                    widget: 'jrouter',
                    url: this.demoUrl
                },
                {
                    name: 'Doc',
                    widget: 'jtmpl',
                    templateUrl: this.docUrl
                },
                {
                    name: 'DemoHtml',
                    widget: 'jtmpl',
                    templateUrl: this.demoHtmlUrl,
                    asHtml: false,
                    beforeRender: function () {
                        this.element.removeClass('prettyprinted');
                    },
                    afterRender: function () {
                        prettyPrint();
                    }
                },
                {
                    name: 'DemoJs',
                    widget: 'jtmpl',
                    templateUrl: this.demoJsUrl,
                    asHtml: false,
                    beforeRender: function () {
                        this.element.removeClass('prettyprinted');
                    },
                    afterRender: function () {
                        prettyPrint();
                    }
                },
                {
                    name: 'DemoWrapper'
                }
            ];
        }
    },

    _beforeCreate: function () {
        this.widgetType = this.route.query.type || 'jlist';
    },

    _beforeRender: function () {
        this.setUrls();
    },

    _afterRender: function () {
        this.$DemoMenu.select(this.route.query.demo || this.data[0].name);
        this.$Tabs.select('demo');
    },

    _queryChanged: function () {
        if (this.queryChanged('type')) {
            this.router.refresh();
        }
        else if (this.queryChanged('demo')) {
            this.setUrls();

            this.$DemoMenu.select(this.route.query.demo);
            this.$DemoRouter.go(this.demoUrl);
            this.$DemoHtml.refresh({
                templateUrl: this.demoHtmlUrl
            });
            this.$DemoJs.refresh({
                templateUrl: this.demoJsUrl
            });
        }
    },

    setUrls: function () {
        this.demo = this.route.query.demo || this.data[0].name;
        this.demoUrl = '/javascript/' + this.widgetType + '/demo/' + this.demo;
        this.demoHtmlUrl = 'views/' + this.demoUrl + '.html';
        this.demoJsUrl = 'views/' + this.demoUrl + '.js';
        this.docUrl = 'views/javascript/' + this.widgetType + '/doc.html';
    }
});