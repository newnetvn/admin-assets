$(document).ready(function () {
    "use strict"; // Start of use strict

    let $galleryList = $('.gallery-list');

    $galleryList.sortable({placeholder: 'gallery-item gallery-highlight'});
    $galleryList.disableSelection();
    $galleryList.on('click', '.remove-media', function (e) {
        e.preventDefault();

        $(this).closest('.gallery-item').remove();
    });

    function fixWidthWrap() {
        if ($galleryList.width() > 500 && $galleryList.width() < 800) {
            $galleryList.addClass('list-md');
        } else if ($galleryList.width() > 800) {
            $galleryList.addClass('list-lg');
        }
    }

    fixWidthWrap();
    $(window).on('resize', function () {
        fixWidthWrap();
    });

    $('input[type="file"].inputFileGallery').on('change', function (e) {
        e.preventDefault();

        let $file = $(this);

        $file.prev().show();

        const galleryName = $file.data('gallery-name');

        let formData = new FormData();
        Array.prototype.forEach.call(this.files, function (file) {
            formData.append('file[]', file);
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

                let html = [];

                e.files.map(function (f) {
                    html.push(`<div class="gallery-item ui-sortable-handle"><img src="${f.thumb}" alt="Image"><input type="hidden" name="${galleryName}[]" value="${f.id}"><a href="#" class="remove-media" title="Delete Image"><i class="fas fa-times-circle"></i></a></div>`);
                });

                $file.closest('.gallery-form-group').find('.gallery-list').append(html.join("\n"));

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
    });

    $('.gallery-list').on('click', '.gallery-item img', function () {
        let media_id = $(this).find('input').val();
        let alt = $(this).data('alt');

        let newAlt = prompt("Nhập thẻ ALT của hình ảnh:", alt);
        if (newAlt !== null) {
            $(this).data('alt', newAlt);

            let token = $('meta[name="csrf-token"]').attr('content');

            $.ajax({
                url: window.adminPath + '/media/media-tag',
                type: 'POST',
                data: {
                    media_id: media_id,
                    label: newAlt,
                    _token: token,
                },
                success: function (e) {
                    toastr.options = {
                        "debug": false,
                        "newestOnTop": false,
                        "positionClass": "toast-bottom-right",
                        "closeButton": true,
                        "toastClass": "animated fadeInDown"
                    };

                    if (e.success) {
                        toastr.success(e.message || 'Đã cập nhật thành công!');
                    } else {
                        toastr.error(e.message || 'Đã xảy ra lỗi!');
                    }
                }
            });
        }
    });
});
