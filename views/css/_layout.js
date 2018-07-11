define([], {
    options: {
        defaultSubpath: "overview",
        subviewOptions: {
            afterRender: function () {
                this._find('.eg').each(function () {
                    var data = $(this).html();
                    var pre = $('<pre name="code" class="prettyprint linenums"></pre>').insertAfter(this);
                    pre.text(data).hide();
                });

                prettyPrint();
            }
        },
        subviewChanged: function () {
            this.$cssMenu.jlistMenu("select", this.route.subview);
        },
        components: function () {
            var view = this;

            return [{
                name: 'CssMenu',
                widget: 'jlistMenu',
                data: view.cssMenuData,
                type: 'tree',
                fields: { key: "subview" },
                styleClass: "active-line bg-light",
                tree: {
                    toggleOnClick: true
                },
                itemCreated: function (e, ui) {
                    if (!ui.itemData.url) {
                        ui.itemElem.addClass("ui-state-disabled");
                    }
                }
            }];
        }
    },
    _beforeRender: function () {
        this.cssMenuData = {
            Items: [
                {
                    text: "概述", subview: "overview", url: "#!css!overview"
                },
                {
                    text: "基本",
                    children: [
                        { text: "标准样式", subview: "", url: "" },
                        { text: "基础设置", subview: "", url: "" },
                        { text: "辅助类", subview: "", url: "" }]
                },
                {
                    text: "颜色", subview: "color", url: "#!css!color"
                },
                {
                    text: "尺寸",
                    children: [
                        { text: "高宽", subview: "size/wh", url: "#!css!size/wh" },
                        { text: "内补", subview: "size/padding", url: "#!css!size/padding" },
                        { text: "间距", subview: "size/margin", url: "#!css!size/margin" },
                        { text: "边框", subview: "size/border", url: "#!css!size/border" }]
                },
                {
                    text: "布局",
                    children: [
                        { text: "横向", subview: "layout/hbox", url: "#!css!layout/hbox" },
                        { text: "纵向", subview: "layout/vbox", url: "#!css!layout/vbox" },
                        { text: "导航条 navbar", subview: "layout/navbar", url: "#!css!layout/navbar" },
                        { text: "卡片 card", subview: "", url: "#!css!components/card" },
                        {
                            text: "列表 list", subview: "", url: "#!css!components/list",
                            children: [
                                { text: "纵向列表", subview: "layout/list/basic", url: "#!css!layout/list/basic" },
                                { text: "单行列表", subview: "layout/list/row", url: "#!css!layout/list/row" },
                                { text: "行块列表", subview: "layout/list/inline", url: "#!css!layout/list/inline" }
                            ]
                        },
                        {
                            text: "菜单 menu", subview: "", url: "#!css!components/menu",
                            children: [
                                { text: "纵向菜单", subview: "layout/menu/basic", url: "#!css!layout/menu/basic" },
                                { text: "横向菜单", subview: "layout/menu/row", url: "#!css!layout/menu/row" }
                            ]
                        },
                        { text: "部件 widget", subview: "", url: "#!css!components/widget" },
                        { text: "grid", subview: "", url: "#!css!layout/grid" }
                    ]
                },
                {
                    text: "元素扩展",
                    children: [
                        { text: "文本", subview: "", url: "" },
                        { text: "图片", subview: "", url: "" },
                        { text: "按钮", subview: "components/button", url: "#!css!components/button" }
                    ]
                },
                {
                    text: "组件",
                    children: [
                        { text: "badge", subview: "", url: "#!css!components/badge" },

                        { text: "图片", subview: "", url: "" },
                        { text: "按钮", subview: "", url: "" }
                    ]
                }
            ]
        };
    },
    _subpathChanged: function () {
        this.$CssMenu.select(this.route.paths[this.subLevel]);
    },
});