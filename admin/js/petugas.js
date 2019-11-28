var username_petugas, id_petugas, nama_petugas
$(window).load('pageinit', '#page-login', function () {})

$('#submit-login').on('click', function(){
  let username = $('#username').val()
  let password = $('#password').val()
  
  $.ajax({
    url : 'http://localhost/oemah_laundry-backend/Petugas/login',
    type: 'post',
    data : {
      username : username,
      password : password
    },
    success : function(res){
      if(res.status == true){
        // console.log()
        id_petugas = res.data.id_petugas
        username_petugas = res.data.username
        nama_petugas = res.data.nama
      }
    }
  })
})