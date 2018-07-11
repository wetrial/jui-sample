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
                                    var loading = $.jui.tip.loading();
                                    setTimeout(function() {
                                        loading.close();
                                        $.jui.tip.success();
                                    }, 2000);                                    
                                }
                            }
                        }
                    ]
                }
            ]
        }
    }
})