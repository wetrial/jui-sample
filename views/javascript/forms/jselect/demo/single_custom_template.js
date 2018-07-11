define([], {
    options: {
        components: [
            {
                name: 'SingleCustomTemplate',
                widget: 'jselect',
                multiple: false,
                singleTemplate: '<div class="colorItem" style="background:{{color}}">&nbsp;</div>',
                fields: {
                    text: "color",
                    value: "id"
                },
                sourceList: {
                    data: [
                        { color: '#5484ED', id: 1 },
                        { color: '#A4BDFC', id: 2 },
                        { color: '#7AE7BF', id: 3 },
                        { color: '#51B749', id: 4 },
                        { color: '#FBD75B', id: 5 }
                    ],
                    templates: {
                        item: '<li><a href="javascript:;" class="hbox-fit jlist-item-clk"><div class="col-fit" style="background:{{color}}">&nbsp;</div><i class="jlist-item-checker"></i></a></li>'
                    }
                },
                minItemsForSearch: 5
            }
        ]
    }
});