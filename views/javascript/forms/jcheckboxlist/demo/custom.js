define([], {
    options: {
        components: function () {
            var view = this;
            return [
                {
                    name: 'CheckboxList',
                    widget: 'jcheckboxlist',
                    label: '爱好',
                    data: 1,
                    sourceList: {
                        type: 'tree',
                        style: 'list',
                        templates: {
                            item: '<li><span class="jlist-item-toggle square-icon"></span><span class="jlist-item-checker square-icon"></span>{{text}}</li>'
                        },
                        data: [
                            {
                                text: '唱歌', value: 1,
                                children: [
                                    { text: '流行', value: 4 },
                                    { text: '美声', value: 5 }
                                ]
                            },
                            {
                                text: '跳舞', value: 2
                            },
                            {
                                text: '旅游', value: 3
                            }
                        ]
                    }
                },
                {
                    name: 'GetValueBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function () {
                            console.log(view.$CheckboxList.getValue());
                        }
                    }
                }
            ]
        }
    }
});