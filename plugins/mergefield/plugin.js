/**
 * @license Copyright (c) 2003-2014, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

/**
 * @fileOverview The "mergefield" plugin.
 *
 */

'use strict';

(function() {
    CKEDITOR.plugins.add('mergefield', {
        requires: 'widget,dialog',
        lang: 'en', // %REMOVE_LINE_CORE%
        icons: 'mergefield', // %REMOVE_LINE_CORE%

        onLoad: function() {
            CKEDITOR.addCss('.cke_mergefield{background-color:#ff0}');
        },

        init: function(editor) {

            var lang = editor.lang.mergefield;

            editor.addCommand('mergefield', new CKEDITOR.dialogCommand('mergefieldDialog'));
            editor.ui.addButton && editor.ui.addButton('CreateMergeField', {
                command: 'mergefield',
                toolbar: 'insert,5',
                icon: 'mergefield',
                label: 'Insert Value'
            });

            editor.widgets.add('mergefield', {
                // Widget code.
                dialog: 'mergefieldDialog',
                pathName: lang.pathName,
                // We need to have wrapping element, otherwise there are issues in
                // add dialog.
                template: '<span class="cke_mergefield" data-expr=""></span>',

                downcast: function() {
                    return new CKEDITOR.htmlParser.text(this.data.name);
                },

                init: function() {
                    // Note that placeholder markup characters are stripped for the name.
                    this.setData('name', this.element.getText());
                },

                data: function(data) {
                    this.element.setText(this.data.name);
                }
            });

            CKEDITOR.dialog.add('mergefieldDialog', this.path + 'dialogs/mergefield.js');
        },

        // This is the conversion from the raw HTML into the version displayed in the CKEditor
        afterInit: function(editor) {
            var mergefieldRegex = /\${[^}]+}/g;

            editor.dataProcessor.dataFilter.addRules({
                text: function(text, node) {
                    var dtd = node.parent && CKEDITOR.dtd[node.parent.name];

                    // Skip the case when placeholder is in elements like <title> or <textarea>
                    // but upcast placeholder in custom elements (no DTD).
                    if (dtd && !dtd.span)
                        return;

                    return text.replace(mergefieldRegex, function(match) {
                        // Creating widget code.
                        var widgetWrapper = null,
                            innerElement = new CKEDITOR.htmlParser.element('span', {
                                'class': 'cke_mergefield',
                                'data-expr': match
                            });

                        // Adds placeholder identifier as innertext.
                        innerElement.add(new CKEDITOR.htmlParser.text(match));
                        widgetWrapper = editor.widgets.wrapElement(innerElement, 'mergefield');

                        // Return outerhtml of widget wrapper so it will be placed
                        // as replacement.
                        return widgetWrapper.getOuterHtml();
                    });
                }
            });
        }
    });

})();