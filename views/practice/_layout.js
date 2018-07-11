define([], {
    options: {
        defaultSubview: "overview",
        subviewChanged: function () {
            this.$cssMenu.jlistMenu("select", this.route.subview);
        }
    },
    props: function () {
        this.$cssMenu = this.element.find("#CssMenu");
    },
    bind: function () {
        this.bindEventList();
    },
    bindEventList: function () {
        var that = this;

        var cssMenuData = {
            Items: [
                {
                    text: "概述", subview: "overview", url: "#css!overview"
                }
                , {
                    text: "界面原则", subview: "principle", url: "#practice!principle"
                }
                , {
                    text: "Typography排版规范", subview: "color", url: "#practice!typography"
                }
                , {
                    text: "HTML/CSS规范", subview: "color", url: "#css!color"
                }
                , {
                    text: "Javascript规范", subview: "color", url: "#css!color"
                }
                , {
                    text: "单页应用代码结构", subview: "color", url: "#css!color"
                }
            ]
        };

        this.$cssMenu.bind("jlistmenuitemcreated", function (e, ui) {
            if (!ui.itemData.url) {
                ui.itemElem.addClass("ui-state-disabled");
            }
        });

        this.$cssMenu.jlistMenu({
            dataFunc: function () { return cssMenuData; },
            fields: { key: "subview" },
            selectable: {
                multiple: false,
                cascade: false,
                onlyleaf: false,
                selectOnClick: false
            },
            tree: {
                toggleOnClick: true
            },
            dataBound: function () {
                that.$cssMenu.jlistMenu("select", that.route.subview, true);
            }
        });

    }
});