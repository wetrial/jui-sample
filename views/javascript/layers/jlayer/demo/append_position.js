define([], {
    options: {
        components: function () {
            var view = this;

            return [
                {
                    name: 'LeftTopBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function (event) {
                            $('<div></div>').jlayer({
                                align: 'left top',
                                template: '<div class="popbox p-a-lg">我是层内容<div>',
                                closeOnClickDoc: true
                            });
                        }
                    }
                },
                {
                    name: 'TopBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function (event) {
                            $('<div></div>').jlayer({
                                align: 'top',
                                template: '<div class="popbox p-a-lg">我是层内容<div>',
                                closeOnClickDoc: true
                            });
                        }
                    }
                },
                {
                    name: 'RightTopBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function (event) {
                            $('<div></div>').jlayer({
                                align: 'right top',
                                template: '<div class="popbox p-a-lg">我是层内容<div>',
                                closeOnClickDoc: true
                            });
                        }
                    }
                },
                {
                    name: 'LeftBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function (event) {
                            $('<div></div>').jlayer({
                                align: 'left',
                                template: '<div class="popbox p-a-lg">我是层内容<div>',
                                closeOnClickDoc: true
                            });
                        }
                    }
                },
                {
                    name: 'LeftBottomBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function (event) {
                            $('<div></div>').jlayer({
                                align: 'left bottom',
                                template: '<div class="popbox p-a-lg">我是层内容<div>',
                                closeOnClickDoc: true
                            });
                        }
                    }
                },
                {
                    name: 'BottomBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function (event) {
                            $('<div></div>').jlayer({
                                align: 'bottom',
                                template: '<div class="popbox p-a-lg">我是层内容<div>',
                                closeOnClickDoc: true
                            });
                        }
                    }
                },
                {
                    name: 'RightBottomBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function (event) {
                            $('<div></div>').jlayer({
                                align: 'right bottom',
                                template: '<div class="popbox p-a-lg">我是层内容<div>',
                                closeOnClickDoc: true
                            });
                        }
                    }
                },
                {
                    name: 'RightBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function (event) {
                            $('<div></div>').jlayer({
                                align: 'right',
                                template: '<div class="popbox p-a-lg">我是层内容<div>',
                                closeOnClickDoc: true
                            });
                        }
                    }
                }
            ];
        }
    }

});