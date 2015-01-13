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
                    ['First Name', '${data.FirstName}'],
                    ['Last Name', '${data.LastName}'],
                    ['Full Name', '${data.FulName}'],
                    ['Title', '${data.Title}'],
                    ['Email Address', '${data.Email}'],
                    ['Adviser - First Name', '${data.Adviser.FirstName}'],
                    ['Adviser - Last Name', '${data.Adviser.LastName}'],
                    ['Adviser - Full Name', '${data.Adviser.FulName}'],
                    ['Adviser - Title', '${data.Adviser.Title}'],
                    ['Adviser - Email Address', '${data.Adviser.Email}'],
                    ['Firm - Name', '${data.Firm.Name}'],
                    ['Firm - Address Line 1', '${data.Firm.AddressLine1}'],
                    ['Firm - Address Line 2', '${data.Firm.AddressLine2}'],
                    ['Firm - Address Line 3', '${data.Firm.AddressLine3}'],
                    ['Firm - Address Line 4', '${data.Firm.AddressLine4}'],
                    ['Firm - City', '${data.Firm.City}'],
                    ['Firm - County', '${data.Firm.County}'],
                    ['Firm - PostCode', '${data.Firm.PostCode}'],
                    ['Firm - Email Address', '${data.Firm.Email}'],
                    ['Date', '${data.Date}']
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