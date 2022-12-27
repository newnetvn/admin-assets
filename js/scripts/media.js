$(document).ready(function () {
    "use strict"; // Start of use strict

    $('body')
        .on('change', 'input[type="file"].inputFileMedia', function (e) {
            e.preventDefault();

            let $file = $(this);

            $file.prev().show();

            const mediaName = $file.data('media-name');

            let formData = new FormData();
            Array.prototype.forEach.call(this.files, function (file) {
                formData.append('file', file);
            });

            let token = $('meta[name="csrf-token"]').attr('content');
            formData.append('_token', token);

            $.ajax({
                url: adminPath + '/media/upload',
                data: formData,
                type: 'POST',
                processData: false,
                contentType: false,
                xhr: function () {
                    var jqXHR = null;
                    if (window.ActiveXObject) {
                        jqXHR = new window.ActiveXObject("Microsoft.XMLHTTP");
                    } else {
                        jqXHR = new window.XMLHttpRequest();
                    }

                    jqXHR.upload.addEventListener("progress", function (evt) {
                        if (evt.lengthComputable) {
                            var percentComplete = Math.round((evt.loaded * 100) / evt.total);

                            $file.prev().find('.progress-bar').css('width', percentComplete + '%');
                        }
                    }, false);

                    return jqXHR;
                },
                success: function (e) {
                    $file.val('');

                    const f = e.file || e.files[0];
                    const html = `<img src="${f.thumb}" alt="Image" class="img-thumbnail"><input type="hidden" name="${mediaName}" value="${f.id}"><a href="#" class="remove-media"><i class="fas fa-times-circle"></i></a>`;

                    $file.closest('.media-form-group').find('.media-preview').html(html);

                    $file.prev().find('.progress-bar').css('width', '0%');
                    $file.prev().hide();
                },
                error: function (e) {
                    $file.val('');
                    $file.prev().find('.progress-bar').css('width', '0%');
                    $file.prev().hide();

                    let text;

                    if (e.responseJSON && e.responseJSON.message) {
                        text = e.responseJSON.message
                    } else {
                        text = e.statusText || 'Không thể xử lý';
                    }

                    swal({title: 'Error', text, type: 'error'});
                }
            })
        })
        .on('click', '.media-preview .remove-media', function (e) {
            e.preventDefault();

            $(this).closest('.media-preview').html('');
        });
});
