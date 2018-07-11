define([], {
    options: {
        components: [
            {
                name: 'MultipleSelect',
                widget: 'jselect',
                multiple: true,
                fields: {
                    text: "Name",
                    value: "Id"
                },
                value: 2,
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
            }
        ]
    }
});