define([], {
    options: {
        components: [
            {
                name: 'Steps',
                widget: 'jlistSteps',
                data: [
                    { id: 'tab-content1', text: '第一步' },
                    { id: 'tab-content2', text: '第二步' },
                    { id: 'tab-content3', text: '第三步' }
                ],
                activeKey: 'tab-content1',
                selectable: {
                    selectOnClick: true
                }
            },
        ]
    }
});