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
      return sParameterName[1] === undefined ?
        true :
        decodeURIComponent(sParameterName[1]);
    }
  }
};

namaAdmin = getUrlParameter("nama");
usernameAdmin = getUrlParameter("username");
passwordAdmin = getUrlParameter("password");
idAdmin = getUrlParameter("id");
var dataPemesanan = "";

String.prototype.toProperCase = function () {
  return this.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
};
$(document).ready(function () {
  function getPemesanan() {
    let link = baseURL + "api/pemesanan";
    $.ajax({
      url: link,
      type: "get",
      data: {
        petugas: namaAdmin
      },
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Loading...",
          textVisible: true
        });
      },
      success: function (dataObject) {
        $("#list-pemesanan").html("");
        dataPemesanan = dataObject.data;
        var append = "";
        dataPemesanan.forEach(e => {
          // console.log(e);
          let tes = Object.keys(e)
            .map(val => e[val])
            .join(";");
          append += `<li><a href="javascript:" id="pemesanan" data-id="${e.id_pemesanan}" data-lengkap="${btoa(tes)}">
            <input type="hidden" value="${btoa(tes)}" id="lengkap">
            <h2>${e.nama_pelanggan.toProperCase()}</h2>
            <p><i>${e.tanggal_masuk}</i></p>`;
          if (e.status == "Selesai") {
            append += `<p class="success italic">Selesai</p></a></li>`;
          } else if (e.status == "Belum Diproses") {
            append += `<p class="danger italic">Belum Diproes</p></a></li>`;
          } else {
            append += `<p class="warning italic">${e.status}</p></a></li>`;
          }
        });
        $("#list-pemesanan").append(append);
        $("#list-pemesanan").listview("refresh");
      },
      complete: function () {
        $.mobile.loading("hide");
      }
    });
  }

  // $(document).ready(function() {
  getPemesanan();
  // });

  $(document).on("click", "#pemesanan", function () {
    window.location.href = '#page-two'
    dataPemesanan = atob($(this).data("lengkap")).split(";");
    let link = baseURL + "api/Rincian";
    $("#detail-pemesanan").html('');
    $.ajax({
      url: link,
      type: "get",
      data: {
        id: $(this).data("id")
      },
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Loading...",
          textVisible: true
        });
      },
      success: function (dataObject) {
        dataObject = dataObject.data;
        // console.log(dataPemesanan);
        // return
        var append = `<p><b>Nama Pelanggan : </b>${dataPemesanan[1].toProperCase()}</p>
        <p><b>Nama Petugas : </b>${dataPemesanan[2].toProperCase()}</p>
        <p><b>Total Harga : </b>${dataPemesanan[3]}</p>
        <p><b>Tanggal Masuk : </b>${dataPemesanan[4]}</p>
        <p><b>Tanggal Keluar : </b></td><td>${dataPemesanan[5]}</p>
        <p><b>Status : </b>${dataPemesanan[6]}</p>`;
        append += `<div style="width:100%"><table data-role="table" id="table-column-toggle" data-mode="columntoggle" class="ui-responsive table-stroke ui-body-d"><thead><tr>
        <th>No</th><th>Barang</th><th>Jumlah</th><th>Harga</th><tr></thead><tbody>`;
        let i = 1;
        dataObject.forEach(e => {
          append += `<tr>
        <td>${i++}</td>
        <td>${e.nama}</td>
        <td>${e.jumlah}</td>
        <td>${e.harga}</td>
        </tr>`;
        });
        append += `</tbody></table></div>`;
        if (dataPemesanan[6] == "Sedang Diproses") {
          append += `<button  id="btn-selesai" data-id="${dataPemesanan[0]}" class="ui-btn ui-corner-all">Selesaikan Laundry</button>`;
          //diubah ke default
        } else if (dataPemesanan[2] == "") {
          //nama data petugasnya pake default
          append += `<button  id="btn-ambil" data-id="${dataPemesanan[0]}" data-petugas="${idAdmin}" class="ui-btn ui-corner-all">Ambil Orderan Laundry</button>`;
        }
        $("#detail-pemesanan").append(append);
      },
      complete: function () {
        $.mobile.loading("hide");
      }
    });
  });

  $(document).on("click", "#btn-selesai", function () {
    var temp = $(this).data("id");
    let link = baseURL + "api/pemesanan";
    $.ajax({
      url: link,
      type: "PUT",
      data: {
        id: temp,
        status: "Selesai"
      },
      success: function () {
        getPemesanan();
        window.location.replace("#page-one");
      },
      error: function () {
        console.log(temp);
      }
    });
  });

  $(document).on("click", "#btn-ambil", function (event) {
    event.preventDefault();
    var temp = $(this).data("id");
    //ini harus diubah ke id petugas nya
    var temp2 = $(this).data("petugas");
    let link = baseURL + "api/pemesanan";
    $.ajax({
      url: link,
      type: "put",
      "content-type": "application/json; charset=utf-8",
      data: {
        id: temp,
        status: "Sedang Diproses",
        id_petugas: temp2
      },
      success: function () {
        getPemesanan();
        window.location.replace("#page-one");
      },
      error: function () {
        console.log(temp2);
      }
    });
  });

  $(document).on("click", "#keluar", function () {
    localStorage.clear();
    window.location.href = "./index.html";
  });
});