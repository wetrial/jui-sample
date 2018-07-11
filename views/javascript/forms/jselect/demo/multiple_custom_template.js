define([], {
    options: {
        components: [
            {
                name: 'MultipleCustomTemplate',
                widget: 'jselect',
                multiple: true,
                fields: {
                    text: "Name",
                    value: "Id"
                },
                showArrow: false,
                value: 2,
                styleClass: null,
                minItemsForSearch: 0,
                selectedList: {
                    templates: {
                        item: '<img src="/assets/img/avatar.png" style="width:40px;" class="r-circle">',
                        lastAddOn: '<a id="AddBtn" href="javascript:;"><img src="/assets/img/plus.png" style="width:40px;" class="r-circle"></a>',
                        empty: null
                    }
                },
                sourceList: {
                    data: [
                        { Name: '张三', Id: 1 },
                        { Name: '李四', Id: 2 },
                        { Name: '王五', Id: 3 },
                        { Name: '路人甲', Id: 4 },
                        { Name: '路人乙', Id: 5 }
                    ],
                    templates: {
                        item: '<a class="hcard" href="javascript:;"><div class="hcard-bd"><img src="/assets/img/avatar.png" style="width:40px;" class="r-circle"> {{Name}}</div><div class="hcard-ft"><i class="jlist-item-checker"></i></div></a>'
                    }
                },
                pop: {
                    trigger: '#AddBtn',
                    layer: {
                        size: {
                            width: 300
                        }
                    }
                }
            }
        ]
    }
});