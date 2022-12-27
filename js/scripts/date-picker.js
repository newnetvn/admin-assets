$(document).ready(function () {
    "use strict"; // Start of use strict

    $('.date-picker').each(function () {
        var $this = $(this);

        var options = $this.data('options');
        $this.daterangepicker(Object.assign({
            singleDatePicker: true,
            showDropdowns: true,
            autoUpdateInput: false,
            locale: {
                format: 'YYYY-MM-DD'
            }
        }, options || {}), function (start) {
            $this.val(start.format('YYYY-MM-DD'));
        });
    });

    $('.datetime-picker').each(function () {
        var $this = $(this);

        var options = $this.data('options');
        $this.daterangepicker(Object.assign({
            timePicker: true,
            timePicker24Hour: true,
            singleDatePicker: true,
            showDropdowns: true,
            autoUpdateInput: false,
            locale: {
                format: 'YYYY-MM-DD HH:mm:ss'
            }
        }, options || {}), function (start) {
            $this.val(start.format('YYYY-MM-DD HH:mm:ss'));
        });
    });

    $('.daterange-picker').each(function () {
        var $this = $(this);

        var options = $this.data('options');
        $this.daterangepicker(Object.assign({
            timePicker: true,
            timePicker24Hour: true,
            showDropdowns: true,
            autoUpdateInput: false,
            locale: {
                format: 'YYYY/MM/DD'
            }
        }, options || {}), function (start, end) {
            $this.val(start.format('YYYY/MM/DD') + ' - ' + end.format('YYYY/MM/DD'));
        });
    });

    $('.datetimerange-picker').each(function () {
        var $this = $(this);

        var options = $this.data('options');
        $this.daterangepicker(Object.assign({
            timePicker: true,
            timePicker24Hour: true,
            showDropdowns: true,
            autoUpdateInput: false,
            locale: {
                format: 'YYYY/MM/DD HH:mm'
            }
        }, options || {}), function (start, end) {
            $this.val(start.format('YYYY/MM/DD HH:mm') + ' - ' + end.format('YYYY/MM/DD HH:mm'));
        });
    });
});
