define([], {
    options:{
        pageTitle:"视图"
    },
    bind:function () {
        var $simpleView = this.element.find("#SimpleView");
        Viewer.render($simpleView, 'views/spa/simpleview.html');
    }
});