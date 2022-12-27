$(document).ready(function () {
    'use strict';

    $("select.select2").each(function () {
        let data = $(this).data();
        let placeholder = $(this).attr('placeholder');

        $(this).select2({
            allowClear: data.allowClear,
            placeholder: placeholder
        });
    });
});
