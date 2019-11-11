$(document).on("pagecreate", "#page-one", function () {
    $(document).on("swiperight", "#page-one", function (e) {
        if ($(".ui-page-active").jqmData("panel") !== "open") {
            if (e.type === "swiperight") {
                $("#left-panel").panel("open");
            }
        }
    });
});