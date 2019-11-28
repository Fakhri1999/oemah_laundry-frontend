var Application = {
    initApplication: function () {
        $(window).load('pageinit', '#page-login', function () {
            // Application.initShowAdm();
        })
        $(document).on('click', '#submit-login', function () {
            Application.initLogin();
        })
    },

    initLogin: function () {
        $.ajax({
            url: 'http://localhost/oemah_laundry-backend/Petugas/login',
            type: 'post',
            data: {
                'username': $('#username').val(),
                'password': $('#password').val()
            },
            beforeSend:function(){
                console.log($('#username').val())
            },
            success: function (res) {
                console.log(res)
                if (res.status) {
                    if(res.data.tipe == "Petugas Admin"){
                        window.location.replace(`admin.html?username=${res.data.username}&password=${res.data.password}&nama=${res.data.nama}&id=${res.data.id_petugas}`)
                    } else {
                        window.location.replace(`petugas.html?username=${res.data.username}&password=${res.data.password}&nama=${res.data.nama}&id=${res.data.id_petugas}`)
                    }
                } else {
                    alert('Username / password salah')
                }
            }
        })
    },
};