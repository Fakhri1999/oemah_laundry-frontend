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
    window.location.replace("./pesanan_tambah.html")
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
localStorage.setItem('pesanan', 1)

$('#btn-tambah-barang').on('click', function (event) {
    event.preventDefault()
    localStorage.setItem('pesanan', (parseInt(localStorage.getItem('pesanan')) + 1))

    let container = document.getElementById('container')
    let block_container = document.createElement('div')
    block_container.className = 'ui-grid-a'
    let block1 = document.createElement('div')
    block1.className = 'ui-block-a'
    let block2 = document.createElement('div')
    block2.className = 'ui-block-b'
    let input = document.createElement('input')
    input.type = 'number'
    input.id = 'jumlah-' + localStorage.getItem('pesanan')
    input.style = 'text-align: center'
    input.placeholder = "Jumlah"
    let divInput = document.createElement('div')
    divInput.className = 'ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'
    let native = document.createAttribute("data-native-menu")
    native.value = 'false'
    input.setAttributeNode(native)
    let selectList = document.createElement('select')
    selectList.id = 'data-' + localStorage.getItem('pesanan')
    selectList.className = 'ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all ui-shadow'

    let options_str = ''
    let options = ['pakaian', 'selimut', 'boneka', 'seprei']
    options.forEach(function (opt) {
        options_str += '<option value="' + opt + '">' + opt + '</option>'
    })

    //joining all node togethaaa
    selectList.innerHTML = options_str
    block1.appendChild(selectList)
    divInput.appendChild(input)
    block2.appendChild(divInput)
    block_container.appendChild(block1)
    block_container.appendChild(block2)
    container.appendChild(block_container)
})

$('#form-pesanan').submit(function (event) {
    event.preventDefault()

    for (let i = 1; i <= parseInt(localStorage.getItem('pesanan')); i++) {
        let label = $('#data-' + i).val()
        let jumlah = $('#jumlah-' + i).val()
        console.log(`${label} = ${jumlah}`)
    }
})

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

//-----------------------------------------------------------------------------------