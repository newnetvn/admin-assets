// (function ($) {
//     // Save Tab
//     $(document).ready(function () {
//         "use strict";
//
//         $('.save-tab').on('show.bs.tab', function(e) {
//             localStorage.setItem('activeTab', $(e.target).attr('href'));
//         });
//         var activeTab = localStorage.getItem('activeTab');
//         if(activeTab){
//             $('.save-tab[href="' + activeTab + '"]').tab('show');
//         }
//     });
// }(jQuery));

// Trigger Resize Screen When Change Tab
(function ($) {
    $(document).ready(function () {
        "use strict";

        $('a[data-toggle]').on('shown.bs.tab', function (e) {
            $(window).trigger('resize');
        });
    });
}(jQuery));
