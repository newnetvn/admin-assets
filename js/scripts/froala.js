$(document).ready(function () {
    "use strict"; // Start of use strict

    new FroalaEditor('textarea.froala-editor', {
        key: '1C%kV\\MUYIbHIMF@EWBXIJ^BZLZF__MXQLj%( #==',
        attribution: false,
        dragInline: true,
        language: window.locale || 'en',
        heightMin: 200,
        toolbarSticky: true,
        toolbarStickyOffset: 70,
        requestHeaders: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        enter: FroalaEditor.ENTER_P,
        entities: '',
        imageAddNewLine: true,
        imageManagerLoadURL: window.adminPath + '/media/froala-load-images',
        imageDefaultWidth: false,
        imageUploadURL: window.adminPath + '/media/upload',
        imageUploadParams: {
            response: 'froala'
        },
        toolbarButtons: {
            'moreText': {
                'buttons': ['bold', 'italic', 'underline', 'fontFamily', 'fontSize', 'textColor', 'strikeThrough', 'subscript', 'superscript', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting'],
                'buttonsVisible': 6
            },
            'moreParagraph': {
                'buttons': ['alignLeft', 'alignCenter', 'alignJustify', 'alignRight', 'formatOLSimple', 'paragraphFormat', 'outdent', 'indent', 'quote', 'formatOL', 'formatUL', 'paragraphStyle', 'lineHeight'],
                'buttonsVisible': 6
            },
            'moreRich': {
                'buttons': ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
                'buttonsVisible': 4
            },
            'moreMisc': {
                'buttons': ['undo', 'redo', 'fullscreen', 'spellChecker', 'selectAll', 'html', 'help'],
                'align': 'right',
                'buttonsVisible': 2
            }
        },
        events: {
            'image.inserted': function ($img, response) {
                if (response) {
                    let parse = JSON.parse(response);
                    $img.attr('alt', parse.alt || parse.name);
                }
            }
        },
        htmlAllowedEmptyTags: ['textarea', 'a', 'iframe', 'object', 'video', 'style', 'script', '.fa', '.fr-emoticon', '.fr-inner', 'path', 'line', 'hr', 'div', 'span', 'strong', 'em'],
        htmlUntouched: true
    });
});
