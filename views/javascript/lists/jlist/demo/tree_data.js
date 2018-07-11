define([], {
    options: {
        components: [
            {
                name: 'Tree',
                widget: 'jlist',
                data: [
                    {
                        name: "职业", Children: [
                            {
                                name: "明星", Children: [
                                    { name: "演员" },
                                    { name: "歌手" }]
                            },
                            {
                                name: "挨踢", Children: [
                                    { name: "开发" },
                                    { name: "测试" }]
                            }]
                    }
                ],
                fields: { key: "name" },
                type: 'tree',
                templates: {
                    item: '<li>{{name}}</li>',
                    tree: {
                        children: '<ul></ul>'
                    }
                }
            }]
    }
});