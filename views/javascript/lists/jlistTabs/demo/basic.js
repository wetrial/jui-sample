define([], {
    options: {
        components: [
            {
                name: 'Tabs',
                widget: 'jlistTabs',
                data: [
                    { id: 'tab-content1', text: 'tab1' },
                    { id: 'tab-content2', text: 'tab2' }
                ],
                activeKey: 'tab-content1',
                selectable: {
                    selectOnClick: true
                }
            },
        ]
    }
});