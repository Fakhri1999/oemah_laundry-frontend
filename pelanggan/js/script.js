const base_url = 'http://localhost/';

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
$('#nav-name').html(`Hai, <b><u>${localStorage.getItem('username')}</u></b> !`)

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
$('#btn-back').on('click', function (event) {
    window.location.replace("./profile.html")
})

//tambah pesanan
$('#tambah-pesanan').on('click', function () {
    window.location.replace("./pesanan_tambah.html")
})

//--------------------------------- auth -------------------------------------------

//check status login
var check = {
    authCheck: function () {
        if (localStorage.getItem('status') == 0) {
            window.location.replace("./index.html")
        }
    }
}

//login process
$('#form-login').submit(function (event) {
    event.preventDefault()
    //input
    let username = $('input#username').val()
    let pass = $('input#pass').val()

    //init component
    let container = document.getElementById('notif')
    container.innerHTML = ''
    let grid_solo = document.createElement('div')
    grid_solo.className = 'ui-grid-solo'
    let grid_a = document.createElement('div')
    grid_a.className = 'ui-grid-a'
    let h4 = document.createElement('h4')
    h4.className = 'center red'

    //rule
    if (username != '' && pass != '') {
        console.log('tes')
        localStorage.setItem('status', 1)
        localStorage.setItem('username', username)
        window.location.replace("./home.html")
    } else {
        //join
        grid_a.appendChild(h4)
        grid_solo.appendChild(grid_a)
        container.appendChild(grid_solo)

        h4.innerHTML = 'Mohon lengkapi seluruh data yang tersedia'
    }
})

$('#form-register').submit(function (event) {
    event.preventDefault()
    //input
    let name = $('input#nama').val()
    let username = $('input#username').val()
    let pass1 = $('input#pass').val()
    let pass2 = $('input#pass2').val()

    //init component
    let container = document.getElementById('notif')
    container.innerHTML = ''
    let grid_solo = document.createElement('div')
    grid_solo.className = 'ui-grid-solo'
    let grid_a = document.createElement('div')
    grid_a.className = 'ui-grid-a'
    let h4 = document.createElement('h4')
    h4.className = 'center red'

    //join
    grid_a.appendChild(h4)
    grid_solo.appendChild(grid_a)
    container.appendChild(grid_solo)

    //rule
    if (name != '' && username != '' && pass1 != '' && pass2 != '') {
        //all input filled
        if (pass1.length >= 6) {
            if (pass1 == pass2) {
                //password matches
                $data = {
                    'nama': name,
                    'username': username,
                    'password': pass1
                }
                localStorage.setItem('status', 1)
                localStorage.setItem('username', username)
                window.location.replace('./home.html')
            } else {
                h4.innerHTML = 'Kedua password tidak cocok'
            }
        } else {
            h4.innerHTML = 'Password minimal 6 karakter'
        }
    } else {
        h4.innerHTML = 'Mohon lengkapi seluruh data yang tersedia'
    }
})

$('#link-register').on('click', function (event) {
    event.preventDefault()
    window.location.replace('./register.html')
})

$('#link-login').on('click', function (event) {
    event.preventDefault()
    window.location.replace('./index.html')
})

//----------------------------------- pesanan ---------------------------------------
localStorage.setItem('pesanan', 1)

//tambah barang cucian
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
    input.value = '1'
    let divInput = document.createElement('div')
    divInput.className = 'ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset'

    let selectList = document.createElement('select')
    selectList.id = 'data-' + localStorage.getItem('pesanan')
    selectList.className = 'ui-btn ui-icon-carat-d ui-btn-icon-right ui-corner-all ui-shadow'
    let native = document.createAttribute("data-native-menu")
    native.value = 'false'
    selectList.setAttributeNode(native)

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

//pesanan process
$('#form-pesanan').submit(function (event) {
    event.preventDefault()
    let data = {}
    for (let i = 1; i <= parseInt(localStorage.getItem('pesanan')); i++) {
        let label = $('#data-' + i).val()
        let jumlah = parseInt($('#jumlah-' + i).val())
        if (data[label] != null) {
            data[label] += jumlah
        } else {
            data[label] = jumlah
        }
    }
    console.log(data)
})

//dummy
var pesanan = {
    load: function () {
        let link = base_url
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
                $data = [{
                        'id': 1,
                        'barang_cucian': 'kaos'
                    },
                    {
                        'id': 2,
                        'barang_cucian': 'kaos aaa'
                    },
                    {
                        'id': 3,
                        'barang_cucian': 'kaos'
                    },
                    {
                        'id': 4,
                        'barang_cucian': 'kaos aaa'
                    }
                ]
                data.forEach(element => {
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

//------------------------------------ propil --------------------------------------

let profile = {
    init: function () {
        //setup profile
    }
}

//button edit profile pressed
$('#btn-edit-profile').on('click', function (event) {
    event.preventDefault()
    window.location.replace('./edit_profile.html')
})

//update profil data
$('#edit-profile').submit(function (event) {
    event.preventDefault()
    let nama = $('input#nama').val()
    let username = $('input#username').val()
    let password = $('input#pass').val()
    window.location.replace('./profile.html')
})

//----------------------------------------------------------------------------------