const baseURL = "https://oemah-laundry.herokuapp.com/";
// const baseURL = "http://localhost/oemah_laundry-backend/";

var Application = {
  initApplication: function () {
    $(window).load("pageinit", "#page-login", function () {
      //   // Application.initShowAdm();
    });
    // $(document).on("submit", "#form-login", function () {
    //   Application.initLogin();
    // });
    $('#form-login').submit(function (e) {
      e.preventDefault();
      Application.initLogin();

    })
  },

  initLogin: function () {
    let link = baseURL + "Petugas/login";
    $.ajax({
      url: link,
      type: "post",
      data: {
        username: $("#username").val(),
        password: $("#password").val()
      },
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Loading...",
          textVisible: true
        });
      },
      success: function (res) {
        console.log(res);
        if (res.status) {
          if (res.data.tipe == "Petugas Admin") {
            window.location.replace(
              `admin.html?username=${res.data.username}&password=${res.data.password}&nama=${res.data.nama}&id=${res.data.id_petugas}`
            );
          } else {
            window.location.replace(
              `petugas.html?username=${res.data.username}&password=${res.data.password}&nama=${res.data.nama}&id=${res.data.id_petugas}`
            );
          }
        } else {
          alert("Username / password salah");
        }
      },
      complete: function () {
        $.mobile.loading("hide");
      }
    });
  }
};