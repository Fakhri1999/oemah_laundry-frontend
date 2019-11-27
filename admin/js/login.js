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
            url: 'http://localhost/OemahLaundry-Backend/Petugas/login',
            type: 'post',
            data: {
                'username': $('#username').val(),
                'password': $('#password').val()
            },
            success: function (res) {
                console.log(res)
                if (res.status) {

                    // return
                    window.location.replace(`admin.html?username=${res.data.username}&password=${res.data.password}&nama=${res.data.nama}$id=${res.data.id}`)
                } else {
                    alert('Username / password salah')
                }
            }
        })
    },
};