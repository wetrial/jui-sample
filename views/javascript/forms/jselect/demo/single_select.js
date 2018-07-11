define([], {
    options: {
        components: [
            {
                name: 'SingleSelect',
                widget: 'jselect',
                multiple: false,
                fields: {
                    text: "Name",
                    value: "Id"
                },
                width: 100,
                sourceList: {
                    data: [
                        { Name: '项目1', Id: 1 },
                        { Name: '项目2', Id: 2 },
                        { Name: '项目3', Id: 3 },
                        { Name: '项目4', Id: 4 },
                        { Name: '项目5', Id: 5 },
                        { Name: '项目6', Id: 6 },
                        { Name: '项目7', Id: 7 }
                    ]
                },
                minItemsForSearch: 5
            },
            {
                name: 'LongTextSelect',
                widget: 'jselect',
                multiple: false,
                fields: {
                    text: "Name",
                    value: "Id"
                },
                inputWrapperStyle: { width: 150 },
                sourceList: {
                    data: [
                        { Name: '中华人民共和国', Id: 1 },
                        { Name: '美利坚和众国', Id: 2 },
                        { Name: '大不列颠及爱尔兰英格兰苏格兰共和国', Id: 3 }
                    ]
                },
                minItemsForSearch: 5
            }
        ]
    }
});