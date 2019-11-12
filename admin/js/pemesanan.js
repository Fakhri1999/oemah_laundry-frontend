String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

let dataPemesanan;
$(document).ready(function () {
  $.ajax({
    url: 'http://localhost/oemah_laundry-backend/Pemesanan',
    type: 'get',
    success: function (res) {
      console.log(res.data)
      dataPemesanan = res.data
      let append = ''
      dataPemesanan.forEach(e => {
        append += `<li><a href="#page-detail-pemesanan" id="pemesanan" data-id="${e.id_pemesanan}">
        <h2>${e.nama_pelanggan.toProperCase()}</h2>
        <p><i>${e.tanggal_masuk}</i></p>`
        if (e.status == "selesai") {
          append += `<p class="success"><i>Selesai</i></p></a></li>`
        } else {
          append += `<p class="warning"><i>Belum selesai</i></p></a></li>`
        }
      });
      $('#list-pemesanan').append(append)
      $('#list-pemesanan').listview('refresh')
    }
  })

  $(document).on('click', '#pemesanan',function() {
    let id = $(this).data('id')
    console.log(id)
    let append = ''
    dataPemesanan.forEach(e => {
      if(e.id_pemesanan == id){
        $('#detail-pemesanan').empty()
        append += `<table data-role="table" id="table-column-toggle" data-mode="columntoggle" class="ui-responsive table-stroke">
        <thead><tr><th><b>Nama Pelanggan : </b></th><td>${e.nama_pelanggan.toProperCase()}</td></tr></thead>
        <tbody><tr><td><b>Nama Petugas : </b></td><td>${e.nama_petugas.toProperCase()}</td></tr>
        <tr><td><b>Tipe Cucian : </b></td><td>${e.tipe_cucian}</td></tr>
        <tr><td><b>Barang Cucian : </b></td><td>${e.barang_cucian}</td></tr>
        <tr><td><b>Berat : </b></td><td>${e.berat}</td></tr>
        <tr><td><b>Harga : </b></td><td>${e.harga}</td></tr>
        <tr><td><b>Tanggal Masuk : </b></td><td>${e.tanggal_masuk}</td></tr>
        <tr><td><b>Tanggal Keluar : </b></td><td>${e.tanggal_keluar}</td></tr>
        <tr><td><b>Status : </b></td><td>${e.status}</td></tr></tbody></table>`
      }
    });
    // console.log($('#detail-pemesanan'))
    $('#detail-pemesanan').append(append).trigger('create')
  })
})