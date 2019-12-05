baseURL = "https://oemah-laundry.herokuapp.com/";
// baseURL = "http://localhost/oemah_laundry-backend/";
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split("&"),
    sParameterName,
    i;

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split("=");

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined
        ? true
        : decodeURIComponent(sParameterName[1]);
    }
  }
};
namaAdmin = getUrlParameter("nama");
usernameAdmin = getUrlParameter("username");
passwordAdmin = getUrlParameter("password");
idAdmin = getUrlParameter("id");
var Application = {
  initApplication: async function() {
    // console.log('tes')
    // $.mobile.loading("show", {
    //   text: "Loading...",
    //   textVisible: true
    // });
    // $.mobile.loading("hide");
    setTimeout(function() {}, 1000);
    $(window).load("pageinit", "#page-home", function() {
      $("#judul-nama-admin").html(namaAdmin);
      Application.initShowAdm();
      Application.initShowCuci();

      //   // }, 500);
    });
    $(document).on("click", "#ke-page-admin", function() {});
    $(document).on("click", "#detail-admin", function() {
      var data = $(this).data("temp");
      Application.initShowDetailAdm(data);
    });
    $(document).on("click", "#submit-petugas", function() {
      Application.initInsertAdm();
    });
    $(document).on("click", "#ke-page-cucian", function() {});
    $(document).on("click", "#detail-cucian", function() {
      var id_cuci = $(this).data("temp");
      Application.initShowDetailCuci(id_cuci);
    });
    $(document).on("click", "#submit-cucian", function() {
      Application.initInsertCuci();
    });
    $(document).on("click", "#back-to-menu", function() {
      $("#judul-nama-admin").html(namaAdmin);
    });
    $(document).on("click", "#keluar", function() {
      window.location.href = "index.html";
    });
    $(document).on("click", "#update-admin", function() {
      var data = $("#data-for-update-admin").val();
      Application.initShowUpdateAdm(data);
    });
    $(document).on("click", "#submit-update-admin", function() {
      Application.initUpdateAdm();
    });
  },

  initShowAdm: function() {
    let link = baseURL + "Petugas";
    $.ajax({
      url: link,
      type: "get",
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Loading...",
          textVisible: true
        });
      },
      success: function(res) {
        var dataObject = res.data;
        var appendList = "";
        $("#list-admin").html("");
        dataObject.forEach(dataObject => {
          let datapetugas = Object.keys(dataObject)
            .map(val => dataObject[val])
            .join(";");
          appendList += `<li><a href="#page-detail-admin?id=${dataObject.id_petugas}" target="_self" id="detail-admin" data-id="${dataObject.id_petugas}" data-temp="${datapetugas}">
                    <h2>${dataObject.nama}</h2>
                    <p>${dataObject.username}</p>
                    <p><b>${dataObject.tipe}</b></p>
                    </a></li>`;
        });
        $("#list-admin").append(appendList);
        $.mobile.loading("hide");
        $("#list-admin").listview("refresh");
        $("#page-admin").bind("pageinit", function() {
          $("#list-admin").listview("refresh");
          $.mobile.loading("hide");
        });
      },
      complete: function() {}
    });
  },

  initShowDetailAdm: function(data) {
    var dataObject = data.split(";");
    var appendDetail = "";
    var tbdy = $("#table-detailAdmin tbody");
    tbdy.html("");
    appendDetail = `<tr>
        <td><b class="ui-table-cell-label">ID Petugas</b>${dataObject[0]}</td>
        <td><b class="ui-table-cell-label">Nama</b>${dataObject[1]}</td>
        <td><b class="ui-table-cell-label">Username</b>${dataObject[2]}</td>
        <td><b class="ui-table-cell-label">Tipe Petugas</b>${dataObject[3]}</td>
        <input type="hidden" value="${data}" id="data-for-update-admin">
        </tr>`;
    $("#table-detailAdmin").append(appendDetail);
  },

  initInsertAdm: function() {
    let link = baseURL + "Petugas";
    var nama = $("#nama_pet").val();
    var username = $("#username_pet").val();
    var password = $("#pass_pet").val();
    var tipe = $("#tipe-petugas :selected").val();
    $.ajax({
      url: link,
      type: "post",
      data: {
        nama: nama,
        username: username,
        password: password,
        tipe: tipe,
        usernameAdmin: usernameAdmin,
        passwordAdmin: passwordAdmin
      },
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Loading...",
          textVisible: true
        });
      },
      success: function(res) {
        // console.log(res)
        // return
        if (res.status) {
          $("#popup-petugas").click();
          setTimeout(function() {
            $("#p_pet").popup("close");
          }, 2000);
          setTimeout(function() {
            window.location.href = "#page-admin";
          }, 2800);
          setTimeout(function() {
            window.location.reload();
          }, 3000);
        } else {
          alert(res.message);
        }
      },
      error: function() {
        alert("Field ada yang Kosong!!!");
      },
      complete: function() {
        $.mobile.loading("hide");
      }
    });
  },

  initShowUpdateAdm: function(data){
    let dataObject = data.split(';');
    // console.log(dataObject)
    $('#p_nama').val(dataObject[1])
    $('#p_username').val(dataObject[2])
    let pil = ['Petugas Admin', 'Petugas Cuci']
    let append = ''
    pil.forEach(e => {
      if(e == dataObject[3]){
        append += `<option value="${e}" selected>${e}</option>`
      } else {
        append += `<option value="${e}">${e}</option>`
      }
    });
    $('#edit-profile-admin').append(`<input type="hidden" value="${data[0]}" id="id-update-profile">`)
    $('#tipe-petugas-update').append(append).selectmenu('refresh')
  },

  initUpdateAdm: function() {
    let id = $('#id-update-profile').val();
    let nama = $("#p_nama").val();
    let username = $("#p_username").val();
    var tipe = $("#tipe-petugas-update :selected").val();
    let link = baseURL + "Petugas";

    $.ajax({
      url: link,
      type: "put",
      data: {
        id: id,
        nama: nama,
        username: username,
        tipe : tipe,
        usernameAdmin: usernameAdmin,
        passwordAdmin: passwordAdmin
      },
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Loading...",
          textVisible: true
        });
      },
      success: function(res) {
        if (res.status) {
          $.mobile.loading("hide");
          setTimeout(function() {
            window.location.href = "#page-admin";
          }, 500);
          setTimeout(function() {
            window.location.reload();
          }, 800);
        } else {
          alert(res.message);
        }
      },
      // complete: function() {
      // }
    });
  },
  initShowCuci: function() {
    let link = baseURL + "BarangCucian";
    $.ajax({
      url: link,
      type: "get",
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Loading...",
          textVisible: true
        });
      },
      success: function(res) {
        var dataObject = res.data;
        var appendList = "";
        $("#list-cucian").html("");
        dataObject.forEach(dataObject => {
          let datacuci = Object.keys(dataObject)
            .map(val => dataObject[val])
            .join(";");
          appendList += `<li><a href="#page-detail-cucian?id=${dataObject.id}" target="_self" id="detail-cucian" data-id="${dataObject.id}" data-temp="${datacuci}">
                    <h2>${dataObject.nama}</h2>
                    <p>${dataObject.harga}</p>
                    <p><b>${dataObject.lama} hari</b></p>
                    </a></li>`;
        });
        $("#list-cucian").append(appendList);
        $("#list-cucian").listview("refresh");
        $.mobile.loading("hide");
        $("#page-cucian").bind("pageinit", function() {
          $("#list-cucian").listview("refresh");
          $.mobile.loading("hide");
        });
      },
      complete: function() {}
    });
  },

  initShowDetailCuci: function(data) {
    var dataObject = data.split(";");
    var appendDetail = "";
    var tbdy = $("#table-detailCucian tbody");
    tbdy.html("");
    appendDetail = `<tr>
                <td><b class="ui-table-cell-label">ID Barang</b>${dataObject[0]}</td>
                <td><b class="ui-table-cell-label">Nama</b>${dataObject[1]}</td>
                <td><b class="ui-table-cell-label">Harga</b>${dataObject[2]}</td>
                <td><b class="ui-table-cell-label">Lama</b>${dataObject[3]} hari</td>
                </tr>`;
    $("#table-detailCucian").append(appendDetail);
  },

  initInsertCuci: function() {
    var barang = $("#nama_barang").val();
    var harga = $("#harga_barang").val();
    var lama = $("#lama_barang").val();
    let link = baseURL + "BarangCucian";
    $.ajax({
      url: link,
      type: "post",
      data: {
        barang: barang,
        harga: harga,
        lama: lama,
        usernameAdmin: usernameAdmin,
        passwordAdmin: passwordAdmin
      },
      beforeSend: function() {
        $.mobile.loading("show", {
          text: "Loading...",
          textVisible: true
        });
      },
      success: function(res) {
        // console.log(res)
        if (res.status) {
          $("#popup-cucian").click();
          setTimeout(function() {
            $("#p_cuci").popup("close");
          }, 2000);
          setTimeout(function() {
            window.location.href = "#page-cucian";
            location.reload();
          }, 2800);
          // setTimeout(function () {
          // }, 2900);
        } else {
          alert(res.message);
        }
        // $("#nama_barang").val("");
        // $("#harga_barang").val("");
        // $("#lama_barang").val("");
      },
      error: function() {
        alert("Field ada yang Kosong!!!");
      },
      complete: function() {
        $.mobile.loading("hide");
      }
    });
  }
};
