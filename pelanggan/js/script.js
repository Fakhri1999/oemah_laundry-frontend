const link = 'http://localhost/';

//-------------------------------- utility ----------------------------------------

//panel swiper
$(document).on("swiperight", function (e) {
    if ($(".ui-page-active").jqmData("panel") !== "open") {
        if (e.type === "swiperight") {
            $("#left-panel").panel("open");
        }
    }
});

//navigation
$('#nav-home').on('click', function (e) {
    e.preventDefault()
    window.location.replace("./home.html")
})
$('#nav-profile').on('click', function (e) {
    e.preventDefault()
    window.location.replace("./profile.html")
})

//tambah pesanan
$('#tambah-pesanan').on('click', function () {
    alert('oioioi')
})

//--------------------------------- auth -------------------------------------------

var check = {
    authCheck: function () {
        if (localStorage.getItem('status') == 0) {
            window.location.replace("./index.html")
        } else {
            window.localStorage.replace("./home.html")
        }
    }
}

$('#form-login').submit(function () {
    localStorage.setItem('status', 1)
    window.location.replace("./home.html")
})



//----------------------------------------------------------------------------------