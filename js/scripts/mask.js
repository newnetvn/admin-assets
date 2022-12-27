$(document).ready(function () {
    "use strict"; // Start of use strict

    $('input[data-mask]').each(function () {
        let data = $(this).data();

        let maskType = null;
        if (typeof data.mask === "string") {
            maskType = data.mask;
        } else if (typeof data.mask === "object") {
            maskType = data.mask.mask;
        }

        if (maskType === 'money') {
            $(this).mask('000.000.000.000.000', {reverse: true});
        } else {
            $(this).mask(data.mask, data.maskOption);
        }
    }).closest('form').on('submit', function (e) {
        $('input[data-mask]').unmask();
    })
});
