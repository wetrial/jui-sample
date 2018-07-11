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
            { text: "甘特图", id: "gantt", url: "#!gantt/index" },
            { text: "表单设计", id: "formDesign", url: "#!formDesign/index" }
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