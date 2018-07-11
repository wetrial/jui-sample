define([], {
    options: {
        components: [
            {
                name: 'TableList',
                widget: 'jlist',
                data: [
                    {
                        name: "刘德华", sex: "男", job: "明星", intro: "男人哭吧不是罪"
                    },
                    {
                        name: "张学友", sex: "男", job: "明星", intro: "等你等到我心痛"
                    },
                    {
                        name: "林青霞", sex: "女", job: "明星", intro: "东方不败"
                    },
                    {
                        name: "Jerry", sex: "男", job: "码农", intro: "专业搬砖一百年"
                    },
                    {
                        name: "Tom", sex: "男", job: "PM", intro: "这个包质量不错哦"
                    },
                    {
                        name: "马云", sex: "男", job: "土豪", intro: "我是土豪，你们跟我做朋友吧"
                    }
                ],
                commands: {
                    itemStyleClass: 'btn-xs btn-link',
                    data: [
                        {
                            text: '', icon: 'fa fa-edit', cssClass: 'btn-link btn-xs', permission: '',
                            command: function () {

                            }
                        },
                        {
                            text: '', icon: 'fa fa-remove', cssClass: 'btn-link btn-xs', permission: '',
                            command: function (target) {
                                $.jui.tip({
                                    message: '确定删除 ' + target.itemData.name + '吗?'
                                });
                            }
                        }
                    ]
                }
            }
        ]
    }
});