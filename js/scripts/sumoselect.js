$(document).ready(function () {
    'use strict';

    $("select.sumoselect").each(function () {
        let data = $(this).data();

        $(this).SumoSelect({
            search: data.search,
            searchText: data.searchText,
            selectAll: data.selectAll,
            okCancelInMulti: data.okCancelInMulti,
        });
    });
});
