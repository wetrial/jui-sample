define([], {
    options: {
        components: [
            {
                name: 'Tabs',
                widget: 'jlistTabs',
                data: [
                    { id: 'tab-content1', text: 'tab1', route: 'javascript/forms/jinputgroup/demo/basic' },
                    { id: 'tab-content2', text: 'tab2', route: 'javascript/layers/loading/demo/loading_in_jlist' },
                    { id: 'tab-content3', text: 'tab3', route: 'javascript/layers/loading/demo/loading_in_jlist', cache: false }
                ],
                activeKey: 'tab-content1',
                selectable: {
                    selectOnClick: true
                }
            },
        ]
    }
});