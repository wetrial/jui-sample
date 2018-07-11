define([], {
    options: {
        defaultSubpath: "overview",
        subviewChanged: function () {
            this.$spaMenu.jlistMenu("select", this.route.subview);
        },
        components: [{
            name: 'SpaMenu',
            widget: 'jlistMenu',
            data: [
                {
                    text: "概述", id: "overview", url: "#!spa!overview"
                }
                , {
                    text: "视图", id: "view", url: "#!spa!view"
                }
                , {
                    text: "路由", id: "route", url: "#!spa!route"
                }
                , {
                    text: "模块化", id: "requirejs", url: "#!spa!requirejs"
                }
                , {
                    text: "事件总线", id: "eventbus", url: "#!spa!eventbus"
                }
                , {
                    text: "实时更新", id: "realtime", url: "#!spa!realtime"
                }
            ],
            styleClass: "jlist-menu-line",
            itemCreated: function (e, ui) {
                if (!ui.itemData.url) {
                    ui.itemElem.addClass("ui-state-disabled");
                }
            }
        }]
    }
});