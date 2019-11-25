var dataObject = [{
    "id_petugas": "0",
    "nama": "ilham",
    "username": "ilham",
    "password": "qweasd123",
    "tipe": "Petugas Cuci"
}, {
    "id_petugas": "1",
    "nama": "baziyad",
    "username": "baziyad@oemah.com",
    "password": "123456789#",
    "tipe": "Petugas Admin"
}]

var cuciObject = [{
    "id_cuci": "1",
    "nama": "jaket",
    "harga": "3000",
    "lama": "1",
}, {
    "id_cuci": "2",
    "nama": "selimut",
    "harga": "4000",
    "lama": "2",
}, {
    "id_cuci": "3",
    "nama": "kemeja",
    "harga": "3000",
    "lama": "1",
}]


var Application = {
    initApplication: function () {
        $(window).load('pageinit', '#page-admin', function () {
            Application.initShowAdm();
        })
        $(document).on('click', '#detail-admin', function () {
            var id_admin = $(this).data('id');
            Application.initShowDetailAdm(id_admin);
        })
        $(window).load('pageinit', '#page-cucian', function () {
            Application.initShowCuci();
        })
        $(document).on('click', '#detail-cucian', function () {
            var id_cuci = $(this).data('id');
            Application.initShowDetailCuci(id_cuci);
        })
    },

    initShowAdm: function () {
        var appendList = '';
        dataObject.forEach(dataObject => {
            appendList += `<li><a href="#page-detail-admin?id=${dataObject.id_petugas}" target="_self" id="detail-admin" data-id="${dataObject.id_petugas}">
			<h2>${dataObject.nama}</h2>
			<p>${dataObject.username}</p>
            <p><b>${dataObject.tipe}</b></p>
            </a></li>`
        });
        $('#list-admin').append(appendList);
    },

    initShowDetailAdm: function (id) {
        var appendDetail = "";
        var tbdy = $("#table-detailAdmin tbody");
        tbdy.html("");
        dataObject.forEach(dataObject => {
            if (dataObject.id_petugas == id) {
                appendDetail = `<tr>
            <td><b class="ui-table-cell-label">ID Petugas</b>${dataObject.id_petugas}</td>
            <td><b class="ui-table-cell-label">Nama</b>${dataObject.nama}</td>
            <td><b class="ui-table-cell-label">Username</b>${dataObject.username}</td>
            <td><b class="ui-table-cell-label">Tipe Petugas</b>${dataObject.tipe}</td>
            </tr>`
            }
        });
        $('#table-detailAdmin').append(appendDetail);
    },
    initShowCuci: function () {
        var appendList = '';
        cuciObject.forEach(cuciObject => {
            appendList += `<li><a href="#page-detail-cucian?id=${cuciObject.id_cuci}" target="_self" id="detail-cucian" data-id="${cuciObject.id_cuci}">
			<h2>${cuciObject.nama}</h2>
			<p>${cuciObject.harga}</p>
            <p><b>${cuciObject.lama} hari</b></p>
            </a></li>`
        });
        $('#list-barang').append(appendList);
    },

    initShowDetailCuci: function (id) {
        var appendDetail = "";
        var tbdy = $("#table-detailCucian tbody");
        tbdy.html("");
        cuciObject.forEach(cuciObject => {
            if (cuciObject.id_cuci == id) {
                appendDetail = `<tr>
            <td><b class="ui-table-cell-label">ID cuci</b>${cuciObject.id_cuci}</td>
            <td><b class="ui-table-cell-label">Nama</b>${cuciObject.nama}</td>
            <td><b class="ui-table-cell-label">Harga</b>${cuciObject.harga}</td>
            <td><b class="ui-table-cell-label">Lama</b>${cuciObject.lama} hari</td>
            </tr>`
            }
        });
        $('#table-detailCucian').append(appendDetail);
    }
};