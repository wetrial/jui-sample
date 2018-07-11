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
                data: 1,
                styleClass: 'jselect-plain',
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