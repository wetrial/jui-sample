define([], {
    options: {
        defaultSubpath: "overview",

        components: function () {
            var view = this;

            return [{
                name: 'JavascriptMenu',
                widget: 'jlistMenu',
                data: function () { return view.javascriptMenuData; },
                styleClass: "active-line bg-light",
                type: 'tree',
                itemCreated: function (e, ui) {
                    if (!ui.itemData.url) {
                        ui.itemElem.addClass("ui-state-disabled");
                    }
                }
            }]
        }
    },
    _beforeRender: function () {
        this.javascriptMenuData = [
            { text: "概述", id: "overview", url: "#!javascript!overview" },
            { text: "基础", id: "base", url: "#!javascript!base" },
            {
                text: "弹出层", id: "", url: "javascript:void(0);",
                children: [
                    { text: "jlayer", id: "layers/jlayer", url: "#!javascript!widget?type=layers/jlayer" },
                    { text: "jpop", id: "layers/jpop", url: "#!javascript!widget?type=layers/jpop" },
                    { text: "modal", id: "layers/modal", url: "#!javascript!widget?type=layers/modal" },
                    { text: "alert", id: "layers/alert", url: "#!javascript!widget?type=layers/alert" },
                    { text: "tip", id: "layers/tip", url: "#!javascript!widget?type=layers/tip" },
                    { text: "loading", id: "layers/loading", url: "#!javascript!widget?type=layers/loading" }
                ]
            },
            {
                text: "列表", url: 'javascript:void(0);',
                children: [
                    { text: "jlist", id: "lists/jlist", url: "#!javascript!widget?type=lists/jlist" },
                    { text: "jlistMenu", id: "lists/jlistMenu", url: "#!javascript!widget?type=lists/jlistMenu" },
                    { text: "jlistTabs", id: "lists/jlistTabs", url: "#!javascript!widget?type=lists/jlistTabs" },
                    { text: "jlistSteps", id: "lists/jlistSteps", url: "#!javascript!widget?type=lists/jlistSteps" },
                    { text: "jlistCommands", id: "lists/jlistCommands", url: "#!javascript!widget?type=lists/jlistCommands" }
                ]
            },
            {
                text: "表单控件", id: "", url: "javascript:void(0);",
                children: [
                    { text: "jcheckbox", id: "forms/jcheckbox", url: "#!javascript!widget?type=forms/jcheckbox" },
                    { text: "jtextbox", id: "forms/jtextbox", url: "#!javascript!widget?type=forms/jtextbox" },
                    { text: "jtextarea", id: "forms/jtextarea", url: "#!javascript!widget?type=forms/jtextarea" },
                    { text: "jdatepicker", id: "forms/jdatepicker", url: "#!javascript!widget?type=forms/jdatepicker" },
                    { text: "jnumberbox", id: "forms/jnumberbox", url: "#!javascript!widget?type=forms/jnumberbox" },
                    { text: "jradiolist", id: "forms/jradiolist", url: "#!javascript!widget?type=forms/jradiolist" },
                    { text: "jcheckboxlist", id: "forms/jcheckboxlist", url: "#!javascript!widget?type=forms/jcheckboxlist" },
                    { text: "jselect", id: "forms/jselect", url: "#!javascript!widget?type=forms/jselect" },
                    { text: "jinputrepeat", id: "forms/jinputrepeat", url: "#!javascript!widget?type=forms/jinputrepeat" },
                    { text: "jinputgroup", id: "forms/jinputgroup", url: "#!javascript!widget?type=forms/jinputgroup" },
                    { text: "jtagbox", id: "forms/jtagbox", url: "#!javascript!widget?type=forms/jtagbox" }
                ]
            },
            {
                text: '其他', id: "", url: "",
                children: [
                    { text: "jcollapse", id: "misc/jcollapse", url: "#!javascript!widget?type=misc/jcollapse" },
                    { text: "jpager", id: "misc/jpaber", url: "#!javascript!widget?type=misc/jpager" }
                ]
            }
        ];
    },
    _subpathChanged: function () {
        this.$JavascriptMenu.select(this.route.paths[this.subLevel]);
        this.$JavascriptMenu.select(this.route.query.type);
    },
    _queryChanged: function () {
        this.$JavascriptMenu.select(this.route.query.type);
    }
});