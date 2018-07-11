define([], {
    options: {
        components: function () {
            return [
                {
                    name: 'Form',
                    widget: 'jinputgroup',
                    components: [
                        {
                            name: 'UserName',
                            widget: 'jtextbox',
                            label: '用户名',
                            wrapperClass: 'col-md-3'
                        },
                        {
                            name: 'Password',
                            widget: 'jtextbox',
                            label: '密码',
                            inputType: 'password',
                            wrapperClass: 'col-md-3'
                        },
                        {
                            name: 'LoginBtn',
                            widget: 'jcomponent',
                            events: {
                                click: function () {
                                    $.jui.postJson({
                                        url: 'postform',
                                        data: {
                                            user: 'test'
                                        },
                                        errorTip: {
                                            tipElem: '#ErrorTip'
                                        }
                                    });
                                    /*var loading = $.jui.tip.loading();
                                    setTimeout(function() {
                                        loading.close();
                                        $.jui.tip.success();
                                    }, 2000);      */
                                }
                            }
                        }
                    ]
                }
            ]
        }
    },

    _beforeRender: function () {
        Mock.setup({
            timeout: 1000
        })

        Mock.mock('postform', function (options) {
            
            eval('var body = ' + options.body);
            console.log(body);
            return {
                Success: false,
                Message: '发生了错误'
            }
        });
    }
})