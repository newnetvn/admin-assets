$(document).ready(function () {
    "use strict"; // Start of use strict

    tinymce.init({
        selector: '.tinymce-editor',
        min_height: 500,
        branding: false,
        menubar: false,
        entity_encoding: 'raw',
        hidden_input: false,
        language: 'vi',
        plugins: 'autoresize preview paste importcss searchreplace autolink autosave save directionality codemirror visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons',
        toolbar: 'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen  preview save print | insertfile image media template link anchor codesample | ltr rtl | code',
        toolbar_sticky: true,
        toolbar_mode: 'sliding',
        autosave_ask_before_unload: true,
        autosave_interval: '30s',
        autosave_prefix: '{path}{query}-{id}-',
        autosave_restore_when_empty: false,
        autosave_retention: '2m',
        image_advtab: true,
        imagetools_toolbar: 'imageoptions',
        importcss_append: false,
        automatic_uploads: true,
        relative_urls: false,
        images_upload_url: window.adminPath + '/media/upload',
        images_upload_handler: function (blobInfo, success, failure, progress) {
            var xhr, formData;

            xhr = new XMLHttpRequest();
            xhr.withCredentials = false;
            xhr.open('POST', window.adminPath + '/media/upload');

            xhr.setRequestHeader('X-CSRF-TOKEN', $('meta[name="csrf-token"]').attr('content'));

            xhr.upload.onprogress = function (e) {
                progress(e.loaded / e.total * 100);
            };

            xhr.onload = function() {
                var json;

                if (xhr.status < 200 || xhr.status >= 300) {
                    failure('HTTP Error: ' + xhr.status);
                    return;
                }

                json = JSON.parse(xhr.responseText);

                if (!json || typeof json.link != 'string') {
                    failure('Invalid JSON: ' + xhr.responseText);
                    return;
                }

                success(json.link);
            };

            xhr.onerror = function () {
                failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
            };

            formData = new FormData();
            formData.append('file', blobInfo.blob(), blobInfo.filename());
            formData.append('response', 'tinymce');
            xhr.send(formData);
        },
        template_cdate_format: '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
        template_mdate_format: '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
        image_caption: true,
        quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
        noneditable_noneditable_class: 'mceNonEditable',
        contextmenu: 'link image table',
        extended_valid_elements:"style,script,link[href|rel]",
        custom_elements:"style,script,link,~link",
        fontsize_formats: '8px 9px 10px 11px 12px 13px 14px 15px 16px 17px 18px 19px 20px 21px 22px 23px 24px 25px 26px 27px 28px 29px 30px',
        // content_css: '/vendor/newnet-admin/css/tinymce.content.css',
        // content_css: 'writer,/vendor/newnet-admin/css/tinymce.content.css',
        content_style: 'img{max-width: 100%;height: auto;display: block;} figure figcaption{margin-top: 0;}',
        rel_list: [
            {title: 'Default', value: ''},
            {title: 'Dofollow', value: 'dofollow'},
            {title: 'Nofollow', value: 'nofollow'},
        ],
        codemirror: {
            indentOnInit: false,
            fullscreen: false,
            path: 'codemirror',
            config: {
                mode: 'application/x-httpd-php',
                lineNumbers: true
            },
            width: 800,
            height: 600,
            saveCursorPosition: true,
            jsFiles: [
                'mode/clike/clike.js',
                'mode/php/php.js'
            ]
        }

    });

    $('.fixed.enable-megamenu').removeClass('fixed');
});
