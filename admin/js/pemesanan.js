// var pemesanan = [
//   {
//     'id_pemesanan' : 1,
//     'pelanggan' : 'Boruto',
//     'petugas' : 'Naruto',
//     'tipe_cucian' : ''
//   }
// ]

$(document).ready(function(){
  $('#detail-pemesanan').on('click', function() {
    let id = $(this).data('id')
    console.log(id)
  })
})