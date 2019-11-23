var dataPemesanan = '';

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

$(document).ready(function(){
  $.ajax({
    url: 'http://localhost/oemahlaundry/api/pemesanan',
    type: 'get',
    data: {
      //ini harusnya ngambil dari data setelah login
      'petugas': 'hummam'
    },
    success: function(dataObject){
      dataPemesanan = dataObject.data;
      var append = '';
      dataPemesanan.forEach(e => {
        append += `<li><a href="#page-two" id="pemesanan" data-id="${e.id_pemesanan}">
        <h2>${e.nama_pelanggan.toProperCase()}</h2>
        <p><i>${e.tanggal_masuk}</i></p>`
        if (e.status == "Selesai") {
          append += `<p class="success italic">Selesai</p></a></li>`
        } else {
          append += `<p class="warning italic">${e.status}</p></a></li>`
        }
      });
      $('#list-pemesanan').append(append);
      $('#list-pemesanan').listview('refresh');
    }
  });
});

$(document).on('click', '#pemesanan', function(){
  // console.log($(this).data('id'));
  $.ajax({
    url: `http://localhost/oemahlaundry/api/pemesanan`,
    type: 'get',
    data: {
      'id': $(this).data('id'),
      'petugas': 'hummam'
    },
    success: function(dataObject){
      console.log(dataObject);
      dataPemesanan = dataObject.data;
      $('#detail-pemesanan').empty();
      var append = `<p><b>Nama Pelanggan : </b>${dataPemesanan[0].nama_pelanggan.toProperCase()}</p><br>
      <p><b>Nama Petugas : </b>${dataPemesanan[0].nama_petugas.toProperCase()}</p><br>
      <p><b>Tipe Cucian : </b>${dataPemesanan[0].tipe_cucian}</p><br>
      <p><b>Barang Cucian : </b>${dataPemesanan[0].barang_cucian}</p><br>
      <p><b>Berat : </b>${dataPemesanan[0].berat}</p><br>
      <p><b>Harga : </b>${dataPemesanan[0].harga}</p><br>
      <p><b>Tanggal Masuk : </b>${dataPemesanan[0].tanggal_masuk}</p><br>
      <p><b>Tanggal Keluar : </b></td><td>${dataPemesanan[0].tanggal_keluar}</p><br>
      <p><b>Status : </b>${dataPemesanan[0].status}</p>`
      $('#detail-pemesanan').append(append);
    }
  });
});
