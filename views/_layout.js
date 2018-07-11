define([], {
    options: {
        defaultSubpath: function () {
            return 'home';
        },
        components: function () {
            var view = this;
            return [
                {
                    name: 'MainTopMenu',
                    widget: 'jlistMenu',
                    type: 'tree',
                    data: function () { return view.mainTopMenuData; },
                    mode: 'h',
                    tree: {
                        toggleOnClick: true
                    }
                }
            ]
        }
    },

    _beforeRender: function () {
        this.mainTopMenuData = [
            { text: "开始使用", id: "getting-started", url: "#!getting-started" },
            { text: "样式", id: "css", url: "#!css!" },
            { text: "插件", id: "javascript", url: "#!javascript!" },
            { text: "单页应用", id: "spa", url: "#!spa!" },
            {
                text: "实例", id: "examples", url: "",
                children: [{ text: "插件", id: "javascript", url: "#!javascript!" },
                { text: "单页应用", id: "spa", url: "#!spa!" },
                { text: "实例", id: "examples", url: "#examples" }]
            }
        ];
    },

    _afterRender: function () {
        this.highlight();
    },

    _subpathChanged: function () {
        this.highlight();
    },

    highlight: function () {
        this.$MainTopMenu.select(this.route.paths[this.subLevel]);
    }
});