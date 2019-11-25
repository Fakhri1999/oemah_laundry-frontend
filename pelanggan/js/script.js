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
$('#nav-logout').on('click', function (e) {
    e.preventDefault()
    localStorage.setItem('status', 0)
    window.location.replace("./index.html")
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
        }
    }
}

$('#form-login').submit(function () {
    let username = $('input#username').val()
    let pass = $('input#pass').val()


    localStorage.setItem('status', 1)
    let data = {
        'username': username,
    }
    localStorage.setItem('userdata', JSON.stringify(data))
    //cara pakai => JSON.parse(localStorage.getItem('userdata'))
    window.location.replace("./home.html")
})

//----------------------------------- pesanan ---------------------------------------

var pesanan = {
    load: function () {
        $.ajax({
            url: link,
            type: 'get',
            beforeSend: function () {
                $.mobile.loading('show', {
                    text: 'Loading data...',
                    textVisible: true
                })
            },
            success: function (dataObject) {
                $dataobject = {
                    1: {
                        'id': 1,
                        'barang_cucian': 'kaos'
                    },
                    2: {
                        'id': 2,
                        'barang_cucian': 'kaos aaa'
                    },
                    3: {
                        'id': 3,
                        'barang_cucian': 'kaos'
                    },
                    4: {
                        'id': 4,
                        'barang_cucian': 'kaos aaa'
                    },
                }
                dataObject.forEach(element => {
                    let data = `<li><a href="#detail-pesanan?id=${element.id}" target="_self" id="detail-pesanan" data-psn="${element.id}"><h2>${element.barang_cucian}</h2></a></li>`
                    $('#list-pesanan').append(data)
                });

                $('#list-pesanan').listview('refresh')
            },
            complete: function () {
                $.mobile.loading('hide')
            }
        })
    }
}