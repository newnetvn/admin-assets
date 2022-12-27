(function ($) {
    $.fn.autoResize = function (obj) {
        return this.each(function() {
            // $(this).css("overflow-y", "hidden");

            let defaultRows = $(this).attr('rows');

            $(this).keyup(function () {
                let arr = $(this).val().split("\n");
                let rows = Math.max(arr.length, defaultRows);
                $(this).attr("rows", rows);

                if (obj && "step" in obj) {
                    obj.step({count: arr.length - 1});
                }
            });

            $(this).trigger('keyup');
        });
    };
})(jQuery);

$(document).ready(function () {
    "use strict"; // Start of use strict

    $('textarea.autoResize').autoResize();
});
