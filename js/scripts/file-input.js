(function ($) {
    "use strict";
    var tableBasic = {
        initialize: function () {
            this.fileBrowser();
        },
        fileBrowser: function () {
            //Custom input file


            // Variables

            var $customInputFile = $('.custom-input-file');


            // Methods

            function change($input, $this, $e) {
                var fileName,
                    $label = $input.next('label'),
                    labelVal = $label.html();

                if ($this && $this.files.length > 1) {
                    fileName = ($this.getAttribute('data-multiple-caption') || '').replace('{count}', $this.files.length);
                } else if ($e.target.value) {
                    fileName = $e.target.value.split('\\').pop();
                }

                if (fileName) {
                    $label.find('span').html(fileName);
                } else {
                    $label.html(labelVal);
                }
            }

            function focus($input) {
                $input.addClass('has-focus');
            }

            function blur($input) {
                $input.removeClass('has-focus');
            }


            // Events

            if ($customInputFile.length) {
                $customInputFile.each(function () {
                    var $input = $(this);

                    $input.on('change', function (e) {
                        var $this = this,
                            $e = e;

                        change($input, $this, $e);
                    });

                    // Firefox bug fix
                    $input.on('focus', function () {
                        focus($input);
                    })
                        .on('blur', function () {
                            blur($input);
                        });
                });
            }

        },
    };
    // Initialize
    $(document).ready(function () {
        "use strict"; // Start of use strict
        tableBasic.initialize();
    });
}(jQuery));
