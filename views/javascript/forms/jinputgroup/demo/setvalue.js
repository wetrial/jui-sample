define([], {
    options: {
        components: function () {
            var view = this;

            return [
                {
                    name: 'InputGroup',
                    widget: 'jinputgroup',
                    data: {
                        Name: 'Jerry'
                    },
                    components: [
                        {
                            name: 'Name',
                            widget: 'jtextbox',
                            label: '姓名',
                            required: true
                        }
                    ]
                }
            ]
        }
    }
});

