define([], {
    options: {
        components: function () {
            var view = this;

            return [
                {
                    name: 'RFCTable',
                    widget: 'jinputrepeat',
                    data: view.rfc,
                    layoutMode: 'custom',
                    templates: view.changedTemplates,
                    itemComponents: [
                        {
                            name: 'remark',
                            widget: 'jtextbox'
                        }
                    ],
                    getDataMode: 'getAll'
                },
                {
                    name: 'RepeatList',
                    widget: 'jlist',
                    data: view.repeatRfc,
                    itemDataBound: function (event, ui) {
                        var $addedList = ui.itemElem.find('#AddedList');
                        $addedList.jlist({
                            data: ui.itemData.added,
                            templates: {
                                item: '<div><div class="changed m-b-md"></div></div>'
                            },
                            itemDataBound: function (event, ui) {
                                var $changed = ui.itemElem.find('.changed');
                                $changed.jlist({
                                    data: ui.itemData.changed,
                                    templates: view.changedTemplates,
                                    itemComponents: [
                                        {
                                            name: 'remark',
                                            widget: 'jtextbox'
                                        }
                                    ]
                                });
                            }
                        });

                        var $updatedList = ui.itemElem.find('#UpdatedList');
                        $updatedList.jlist({
                            data: ui.itemData.updated,
                            templates: {
                                layout: '<div class="jlist-items"></div>',
                                item: '<div><div class="changed"></div></div>'
                            },
                            itemDataBound: function (event, ui) {
                                var $changed = ui.itemElem.find('.changed');
                                $changed.jlist({
                                    data: ui.itemData.changed,
                                    templates: view.changedTemplates,
                                    itemComponents: [
                                        {
                                            name: 'remark',
                                            widget: 'jtextbox'
                                        }
                                    ]
                                });
                            }
                        });

                        var $removedList = ui.itemElem.find('#RemovedList');
                        $removedList.jlist({
                            data: ui.itemData.removed,
                            templates: view.getRepeatRemovedLayout(view.getComponentOptions(ui.itemData.name).itemComponents)
                        });
                    }
                },
                {
                    name: 'SaveBtn',
                    widget: 'jcomponent',
                    events: {
                        click: function () {
                            console.log(view.$RFCTable.getValue());
                        }
                    }
                }
            ]
        }
    },

    _beforeRender: function () {
        this.rfc = [];
        this.repeatRfc = [];
        var rfc = this.layer.options.data.changed;
        for (var i = 0; i < rfc.length; i++) {
            var item = rfc[i];
            if (item.widget != 'jinputrepeat') {
                this.rfc.push(item);
            }
            else {
                this.repeatRfc.push(item);
            }
        }

        $.jui.template.helper('formatOldValue', function (data) {
            if (data.oldValueText) {
                return data.oldValueText;
            }
            else {
                if (data.oldValue != undefined) {
                    return data.oldValue.toString();
                }
            }
        });

        $.jui.template.helper('formatNewValue', function (data) {
            if (data.newValueText) {
                return data.newValueText;
            }
            else {
                if (data.newValue != undefined) {
                    return data.newValue.toString();
                }
            }
        });

        console.log(this.repeatRfc);

        this.changedTemplates = {};
        this.changedTemplates.layout =
            '<table class="jlistTable">\
                <thead>\
                    <tr>\
                        <th>数据项</th>\
                        <th>旧值</th>\
                        <th>新值</th>\
                        <th>修改原因</th>\
                    </tr>\
                </thead>\
                <tbody class="jlist-items"></tbody>\
            </table>';
        this.changedTemplates.item = this.changedTemplates.edit = '\
<tr>\
    <td>{{label}}</td>\
    <td>{{$helpers.formatOldValue($data)}}</td>\
    <td>{{$helpers.formatNewValue($data)}}</td>\
    <td>\
        <div name="remark"></div>\
    </td>\
</tr>';
    },

    getRepeatRemovedLayout: function (itemComponents) {
        var layout = '<table class="jlist-table table table-bordered"><thead><tr>';
        var item = '<tr>';

        for (var i = 0; i < itemComponents.length; i++) {
            var component = itemComponents[i];
            layout += '<td>' + component.label + '</td>';

            item += $.jui.utils.format('<td>{{{0}}}</td>', component.name);
        }

        layout += '</tr></thead><tbody class="jlist-items"></tbody></table>';

        item += '</tr>';

        return { layout: layout, item: item };
    },

    getComponentOptions: function (name) {
        var components = this.layer.options.data.components
        for (var i = 0; i < components.length; i++) {
            var component = components[i];

            if (component.name == name) {
                return component;
            }
        }
    }
});