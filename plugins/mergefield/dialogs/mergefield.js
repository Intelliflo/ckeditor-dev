/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/**
 * @fileOverview Definition for placeholder plugin dialog.
 *
 */

'use strict';

CKEDITOR.dialog.add("mergefieldDialog", function(editor) {

    var fieldList = [];
    if(editor.config.templateFieldUrl)
    {
        var templateFieldUrl = editor.config.templateFieldUrl;
        $.ajax({
            type: 'GET',
            url: templateFieldUrl,
            async: false,
            success: function(data){
                fieldList = JSON.parse(data);
            }
        });     
    }   

    return {
        title: "Merge Field",
        minWidth: 300,
        minHeight: 80,
        contents: [{
            id: "info",
            label: "Merge Field",
            title: "Merge Field",
            elements: [{
                id: "expr",
                type: "select",
                label: "Expression",
                items: fieldList,
                setup: function(a) {
                    this.setValue(a.data.name)
                },
                commit: function(a) {
                    a.setData("name", this.getValue())
                }
            }]
        }]
    }
});