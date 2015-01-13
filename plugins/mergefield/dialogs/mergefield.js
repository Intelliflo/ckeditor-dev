/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/**
 * @fileOverview Definition for placeholder plugin dialog.
 *
 */

'use strict';

CKEDITOR.dialog.add('mergefieldDialog', function(editor) {
    return {
        title: 'Merge Field',
        minWidth: 300,
        minHeight: 80,
        contents: [{
            id: 'info',
            label: 'Merge Field',
            title: 'Merge Field',
            elements: [{
                id: 'expr',
                type: 'select',
                label: 'Expression',
                items: [
                    ['Client First Name', '${Client.FirstName}'],
                    ['Client Last Name', '${Client.LastName}']
                ],
                setup: function(widget) {
                    this.setValue(widget.data.name);
                },
                commit: function(widget) {
                    widget.setData('name', this.getValue());
                }
            }]
        }]
    };
});