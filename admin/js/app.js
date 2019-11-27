var Application = {
    initApplication: function () {
        $(window).load('pageinit', '#page-admin', function () {
            Application.initShowAdm();
        })
        $(document).on('click', '#detail-admin', function () {
            var id_admin = $(this).data('temp');
            Application.initShowDetailAdm(id_admin);
        })
        $(document).on('click', '#submit-petugas', function () {
            Application.initInsertAdm();
        })
        $(window).load('pageinit', '#page-cucian', function () {
            Application.initShowCuci();
        })
        $(document).on('click', '#detail-cucian', function () {
            var id_cuci = $(this).data('temp');
            Application.initShowDetailCuci(id_cuci);
        })
        $(document).on('click', '#submit-cucian', function () {
            Application.initInsertCuci();
        })
    },

    initShowAdm: function () {
        $.ajax({
            url: 'http://localhost/OemahLaundry-Backend/Petugas',
            type: 'get',
            success: function (res) {
                var dataObject = res.data;
                var appendList = '';
                $("#list-admin").html('')
                dataObject.forEach(dataObject => {
                    let datapetugas = Object.keys(dataObject).map((val) => dataObject[val]).join(';')
                    appendList += `<li><a href="#page-detail-admin?id=${dataObject.id_petugas}" target="_self" id="detail-admin" data-id="${dataObject.id_petugas}" data-temp="${datapetugas}">
                    <h2>${dataObject.nama}</h2>
                    <p>${dataObject.username}</p>
                    <p><b>${dataObject.tipe}</b></p>
                    </a></li>`
                });
                $('#list-admin').append(appendList);
                $('#list-admin').listview('refresh');
            }
        })
    },

    initShowDetailAdm: function (data) {
        var dataObject = data.split(';');
        var appendDetail = "";
        var tbdy = $("#table-detailAdmin tbody");
        tbdy.html("");
        appendDetail = `<tr>
        <td><b class="ui-table-cell-label">ID Petugas</b>${dataObject[0]}</td>
        <td><b class="ui-table-cell-label">Nama</b>${dataObject[1]}</td>
        <td><b class="ui-table-cell-label">Username</b>${dataObject[2]}</td>
        <td><b class="ui-table-cell-label">Tipe Petugas</b>${dataObject[3]}</td>
        </tr>`;
        $('#table-detailAdmin').append(appendDetail);
    },

    initInsertAdm: function () {
        var nama = $('#nama_pet').val();
        var username = $('#username_pet').val();
        var password = $('#pass_pet').val();
        var tipe = $('#tipe-petugas :selected').val();
        $.ajax({
            url: 'http://localhost/OemahLaundry-Backend/Petugas',
            type: 'post',
            data: {
                "nama": nama,
                "username": username,
                "password": password,
                "tipe": tipe,
                "usernameAdmin": "ilham",
                "passwordAdmin": "andri"
            },
            success: function () {
                Application.initShowAdm();
                $("#popup-petugas").click()
                setTimeout(function () {
                    $("#p_pet").popup("close");
                }, 3000);
                setTimeout(function () {
                    window.location.replace("#page-admin");
                }, 3500);
                setTimeout(function () {
                    location.reload()
                }, 4000);
            },
            error: function () {
                alert("Field ada yang Kosong!!!")
            }
        })
    },

    initShowCuci: function () {
        $.ajax({
            url: 'http://localhost/OemahLaundry-Backend/BarangCucian',
            type: 'get',
            success: function (res) {
                var dataObject = res.data;
                var appendList = '';
                $("#list-barang").html('')
                dataObject.forEach(dataObject => {
                    let datacuci = Object.keys(dataObject).map((val) => dataObject[val]).join(';')
                    appendList += `<li><a href="#page-detail-cucian?id=${dataObject.id}" target="_self" id="detail-cucian" data-id="${dataObject.id}" data-temp="${datacuci}">
                    <h2>${dataObject.nama}</h2>
                    <p>${dataObject.harga}</p>
                    <p><b>${dataObject.lama} hari</b></p>
                    </a></li>`
                });
                $('#list-cucian').append(appendList);
                $('#list-cucian').listview('refresh');
            }
        })
    },

    initShowDetailCuci: function (data) {
        var dataObject = data.split(';')
        var appendDetail = "";
        var tbdy = $("#table-detailCucian tbody");
        tbdy.html("");
        appendDetail = `<tr>
                <td><b class="ui-table-cell-label">ID Barang</b>${dataObject[0]}</td>
                <td><b class="ui-table-cell-label">Nama</b>${dataObject[1]}</td>
                <td><b class="ui-table-cell-label">Harga</b>${dataObject[2]}</td>
                <td><b class="ui-table-cell-label">Lama</b>${dataObject[3]} hari</td>
                </tr>`;
        $('#table-detailCucian').append(appendDetail);
    },

    initInsertCuci: function () {
        var barang = $('#nama_barang').val();
        var harga = $('#harga_barang').val();
        var lama = $('#lama_barang').val();
        $.ajax({
            url: 'http://localhost/OemahLaundry-Backend/BarangCucian',
            type: 'post',
            data: {
                "barang": barang,
                "harga": harga,
                "lama": lama,
                "usernameAdmin": "ilham",
                "passwordAdmin": "andri"
            },
            success: function () {
                Application.initShowCuci();
                $("#popup-cucian").click()
                setTimeout(function () {
                    $("#p_cuci").popup("close");
                }, 3000);
                setTimeout(function () {
                    window.location.replace("#page-cucian");
                }, 3500);
                $('#nama_barang').val('');
                $('#harga_barang').val('');
                $('#lama_barang').val('');
            },
            error: function () {
                alert("Field ada yang Kosong!!!")
            }
        })
    },
};