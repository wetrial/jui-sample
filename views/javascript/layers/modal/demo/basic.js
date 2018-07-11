define([], {
    options: {
        components: [
            {
                name: 'ModalBtn',
                widget: 'jcomponent',
                events: {
                    click: function () {
                        $.jui.modal({
                            template: '\
                                <div class="modal">\
                                    <div class="modal-hd">\
                                        <div class="navbar">\
                                            <div class="navbar-hd">\
                                                <h4>我是标题</h4>\
                                            </div>\
                                            <div class="navbar-ft"><span data-dismiss="jlayer" class="jlayer-close"></span>\
                                            </div>\
                                        </div>\
                                    </div>\
                                    <div class="modal-bd">我是内容</div>\
                                    <div class="modal-ft">我是尾巴</div>\
                                <div>'
                        });
                    }
                }
            }
        ]
    }
})