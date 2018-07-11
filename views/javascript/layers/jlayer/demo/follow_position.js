define([], {
    options: {
        components: function () {
            var view = this;

            return [
                {
                    name: 'TopLeftBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function (event) {
                            $('<div></div>').jlayer({
                                align: 'top left',
                                follow: '#TopLeftBtn',
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
                                follow: '#TopBtn',
                                template: '<div class="popbox p-a-lg">我是层内容<div>',
                                closeOnClickDoc: true
                            });
                        }
                    }
                },
                {
                    name: 'TopRightBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function (event) {
                            $('<div></div>').jlayer({
                                align: 'top right',
                                follow: '#TopRightBtn',
                                template: '<div class="popbox p-a-lg">我是层内容<div>',
                                closeOnClickDoc: true
                            });
                        }
                    }
                },
                {
                    name: 'LeftTopBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function (event) {
                            $('<div></div>').jlayer({
                                align: 'left top',
                                follow: '#LeftTopBtn',
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
                                follow: '#LeftBtn',
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
                                follow: '#LeftBottomBtn',
                                template: '<div class="popbox p-a-lg">我是层内容<div>',
                                closeOnClickDoc: true
                            });
                        }
                    }
                },
                {
                    name: 'BottomLeftBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function (event) {
                            $('<div></div>').jlayer({
                                align: 'bottom left',
                                follow: '#BottomLeftBtn',
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
                                follow: '#BottomBtn',
                                template: '<div class="popbox p-a-lg">我是层内容<div>',
                                closeOnClickDoc: true
                            });
                        }
                    }
                },
                {
                    name: 'BottomRightBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function (event) {
                            $('<div></div>').jlayer({
                                align: 'bottom right',
                                follow: '#BottomRightBtn',
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
                                follow: '#RightTopBtn',
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
                                follow: '#RightBtn',
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
                                follow: '#RightBottomBtn',
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