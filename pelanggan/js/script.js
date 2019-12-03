// const base_url = "https://oemah-laundry.herokuapp.com/";
const base_url = "http://localhost/oemah_laundry-backend/";

//-------------------------------- utility ----------------------------------------

//panel swiper
$(document).on("swiperight", function (e) {
  if ($(".ui-page-active").jqmData("panel") !== "open") {
    if (e.type === "swiperight") {
      $("#left-panel").panel("open");
    }
  }
});

//format output number
function formatNumber(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

//navigation
$("#nav-name").html(`Hai, <b><u>${localStorage.getItem("username")}</u></b> !`);

$("#nav-home").on("click", function (e) {
  e.preventDefault();
  window.location.replace("./home.html");
});
$("#nav-profile").on("click", function (e) {
  e.preventDefault();
  window.location.replace("./profile.html");
});
$("#nav-logout").on("click", function (e) {
  e.preventDefault();
  localStorage.clear();
  window.location.replace("./index.html");
});
$("#btn-back").on("click", function (event) {
  window.location.replace("./profile.html");
});
$("#btn-detail-back").on("click", function (event) {
  window.location.replace("./home.html");
});

//tambah pesanan
$("#tambah-pesanan").on("click", function () {
  window.location.replace("./pesanan_tambah.html");
});

//--------------------------------- auth -------------------------------------------

//check status login
var check = {
  authCheck: function () {
    if (localStorage.getItem("status") == 0) {
      window.location.replace("./index.html");
    }
  }
};

//login process
$("#form-login").submit(function (event) {
  event.preventDefault();
  //input
  let username = $("input#username").val();
  let pass = $("input#pass").val();

  //init component
  let container = document.getElementById("notif");
  container.innerHTML = "";
  let grid_solo = document.createElement("div");
  grid_solo.className = "ui-grid-solo";
  let grid_a = document.createElement("div");
  grid_a.className = "ui-grid-a";
  let h4 = document.createElement("h4");
  h4.className = "center red";

  let link = base_url + "pelanggan/login";

  //join
  grid_a.appendChild(h4);
  grid_solo.appendChild(grid_a);
  container.appendChild(grid_solo);

  //rule
  if (username != "" && pass != "") {
    localStorage.setItem("status", 1);
    localStorage.setItem("username", username);
    user.init();
    $.ajax({
      url: link,
      type: "POST",
      "content-type": "application/json; charset=utf-8",
      data: {
        username: username,
        password: pass
      },
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Loading...",
          textVisible: true
        });
      },
      success: function (data) {
        window.location.replace("./home.html");
      },
      error: function (data) {
        switch (data.status) {
          case 404:
            h4.innerHTML = "Data pelanggan tidak ditemukan";
            break;
          case 401:
            h4.innerHTML = "Password salah";
            break;
        }
      },
      complete: function () {
        $.mobile.loading("hide");
      }
    });
  } else {
    h4.innerHTML = "Mohon lengkapi seluruh data yang tersedia";
  }
});

$("#form-register").submit(function (event) {
  event.preventDefault();
  //input
  let name = $("input#nama").val();
  let username = $("input#username").val();
  let pass1 = $("input#pass").val();
  let pass2 = $("input#pass2").val();

  //init component
  let container = document.getElementById("notif");
  container.innerHTML = "";
  let grid_solo = document.createElement("div");
  grid_solo.className = "ui-grid-solo";
  let grid_a = document.createElement("div");
  grid_a.className = "ui-grid-a";
  let h4 = document.createElement("h4");
  h4.className = "center red";

  //join
  grid_a.appendChild(h4);
  grid_solo.appendChild(grid_a);
  container.appendChild(grid_solo);

  //rule
  if (name != "" && username != "" && pass1 != "" && pass2 != "") {
    //all input filled
    if (pass1.length >= 6) {
      if (pass1 == pass2) {
        //password matches
        localStorage.setItem("status", 1);
        localStorage.setItem("username", username);

        let link = base_url + "pelanggan";

        $.ajax({
          url: link,
          type: "POST",
          "content-type": "application/json; charset=utf-8",
          data: {
            nama: name,
            username: username,
            password: pass1,
            telepon: "belum ada",
            alamat: "belum ada"
          },
          beforeSend: function () {
            $.mobile.loading("show", {
              text: "Loading...",
              textVisible: true
            });
          },
          success: function (data) {
            if (data.status) {
              localStorage.setItem("__userdata", JSON.stringify(data.data));
              window.location.replace("./home.html");
            } else {
              h4.innerHTML = data.message;
            }
          },
          error: function (data) {
            switch (data.status) {
              case 406:
                h4.innerHTML = "Pendaftaran gagal";
                break;
            }
          },
          complete: function () {
            $.mobile.loading("hide");
          }
        });
      } else {
        h4.innerHTML = "Kedua password tidak cocok";
      }
    } else {
      h4.innerHTML = "Password minimal 6 karakter";
    }
  } else {
    h4.innerHTML = "Mohon lengkapi seluruh data yang tersedia";
  }
});

$("#link-register").on("click", function (event) {
  event.preventDefault();
  window.location.replace("./register.html");
});

$("#link-login").on("click", function (event) {
  event.preventDefault();
  window.location.replace("./index.html");
});

//----------------------------------- pesanan ---------------------------------------
localStorage.setItem("pesanan", 1);

//tambah barang cucian
$("#btn-tambah-barang").on("click", async function (event) {
  event.preventDefault();
  localStorage.setItem(
    "pesanan",
    parseInt(localStorage.getItem("pesanan")) + 1
  );

  let container = document.getElementById("container");
  let block_container = document.createElement("div");
  block_container.className = "ui-grid-a";
  let block1 = document.createElement("div");
  block1.className = "ui-block-a";
  let block2 = document.createElement("div");
  block2.className = "ui-block-b";

  let input = document.createElement("input");
  input.type = "number";
  input.className = "text";
  input.id = "jumlah-" + localStorage.getItem("pesanan");
  input.style = "text-align: center";
  input.placeholder = "Jumlah";
  input.value = "1";
  let divInput = document.createElement("div");
  divInput.className =
    "ui-input-text ui-body-inherit ui-corner-all ui-shadow-inset";

  let selectList = document.createElement("select");
  selectList.id = "data-" + localStorage.getItem("pesanan");
  let native = document.createAttribute("data-native-menu");
  native.value = "false";
  selectList.setAttributeNode(native);

  let options_str = "";
  let options = pilihan;
  options.forEach(function (opt) {
    options_str += `<option value="${opt[0]}">${opt[0]}${opt[1]}</option>`;
  });

  //joining all node togethaaa
  selectList.innerHTML = options_str;
  block1.appendChild(selectList);
  divInput.appendChild(input);
  block2.appendChild(divInput);
  block_container.appendChild(block1);
  block_container.appendChild(block2);
  container.appendChild(block_container);
  $(`#${selectList.id}`).selectmenu();
});

//pesanan process
$("#form-pesanan").submit(function (event) {
  event.preventDefault();
  let data = {}
  for (let i = 1; i <= parseInt(localStorage.getItem("pesanan")); i++) {
    let label = $("#data-" + i).val();
    let jumlah = parseInt($("#jumlah-" + i).val());
    if (data[label] != null) {
      data[label] += jumlah;
    } else {
      data[label] = jumlah;
    }
  }

  console.log(data)
  return
  let today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  today = yyyy + "-" + mm + "-" + dd;

  let link = base_url + "pelanggan/pesanan";
  console.log(data);
  // return
  $.ajax({
    url: link,
    type: "POST",
    "content-type": "application/json; charset=utf-8",
    data: {
      id_pelanggan: JSON.parse(localStorage.getItem("__userdata")).id_pelanggan,
      pesanan: data,
      tanggal_masuk: today
    },
    beforeSend: function () {
      $.mobile.loading("show", {
        text: "Loading...",
        textVisible: true
      });
    },
    success: function (data) {
      console.log(data);
      window.location.replace("./home.html");
    },
    error: function (data) {
      console.log(data);
    },
    complete: function () {
      $.mobile.loading("hide");
    }
  });
});

//load pesanan
var pesanan = {
  load: function () {
    let link = base_url + "pelanggan/pesanan";
    let userdata = JSON.parse(localStorage.getItem("__userdata"));
    $.ajax({
      url: link,
      type: "get",
      data: {
        id: userdata.id_pelanggan
      },
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Loading...",
          textVisible: true
        });
      },
      success: function (dataObject) {
        console.log(dataObject)
        dataObject.data.forEach(element => {
          let list = `<li><a href="#page-two" id="pesanan-detail" data-id="${element.id_pemesanan}"><h4>Pesanan tanggal ${element.tanggal_masuk}</h4></a></li>`;
          $("#list-pesanan").append(list);
        });

        $("#list-pesanan").listview("refresh");
      },
      error: function () {
        let list = `<li><p>data pesanan tidak ditemukan</p></li>`;
        $("#list-pesanan").append(list);
        $("#list-pesanan").listview("refresh");
      },
      complete: function () {
        $.mobile.loading("hide");
      }
    });
  }
};

$(document).on("click", "#pesanan-detail", function () {
  let link = base_url + "pelanggan/detail";

  // window.location.replace('#page-two');
  let container = document.getElementById("detail-pesanan");
  let id = $(this).data("id")
  setTimeout(function () {
    $.ajax({
      url: link,
      type: "get",
      data: {
        id: id
      },
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Loading...",
          textVisible: true
        });
      },
      success: function (data) {
        // console.log(data.data)
        $("#detail-pesanan").empty();
        data = data.data;

        let div = document.createElement("div");
        div.className = "ui-btn ui-corner-all ui-shadow";
        let masuk = document.createElement("p");
        masuk.innerHTML = `Tanggal masuk : ${data[0].tanggal_masuk}`;
        let keluar = document.createElement("p");
        keluar.innerHTML = `Tanggal keluar : ${data[0].tanggal_keluar}`;
        let total_harga = document.createElement("p");
        total_harga.innerHTML = `Total biaya : ${formatNumber(data[0].total_harga)}`;
        let status = document.createElement("p");
        status.innerHTML = `Status cucian : ${data[0].status}`;
        div.appendChild(masuk);
        div.appendChild(keluar);
        div.appendChild(total_harga);
        div.appendChild(status);

        container.appendChild(div);

        data.forEach(function (item) {
          console.log(item);
          // component
          let div = document.createElement("div");
          div.className = "ui-btn ui-corner-all ui-shadow";
          let nama = document.createElement("p");
          nama.innerHTML = `Nama barang : ${item.nama}`;
          let jumlah = document.createElement("p");
          jumlah.innerHTML = `Jumlah : ${item.jumlah}`;
          let harga_barang = document.createElement("p");
          harga_barang.innerHTML = `Harga per barang : ${formatNumber(item.harga_barang)}`;
          let harga = document.createElement("p");
          harga.innerHTML = `Harga : ${formatNumber(item.harga)}`;


          div.appendChild(nama);
          div.appendChild(harga_barang);
          div.appendChild(jumlah);
          div.appendChild(harga);

          container.appendChild(div);
        });
      },
      complete: function () {
        $.mobile.loading("hide");
      }
    })
  }, 500);
});

//------------------------------------ propil --------------------------------------
let user = {
  init: function () {
    let link = base_url + "pelanggan";
    $.ajax({
      url: link,
      type: "GET",
      "content-type": "application/json; charset=utf-8",
      data: {
        id: localStorage.getItem("username")
      },
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Loading...",
          textVisible: true
        });
      },
      success: function (data) {
        localStorage.setItem("__userdata", JSON.stringify(data.data));
      },
      error: function (data) {
        switch (data.status) {
          case 404:
            console.log("data tidak ditemukan");
            break;
        }
      },
      complete: function () {
        $.mobile.loading("hide");
      }
    });
  }
};

let profile = {
  init: function () {
    let container = document.getElementById("profile-container");
    container.innerHTML = "";

    let link = base_url + "pelanggan";
    $.ajax({
      url: link,
      type: "GET",
      "content-type": "application/json; charset=utf-8",
      data: {
        id: localStorage.getItem("username")
      },
      beforeSend: function () {
        $.mobile.loading("show", {
          text: "Loading...",
          textVisible: true
        });
      },
      success: function (data) {
        for (let i = 1; i < Object.keys(data.data).length; i++) {
          localStorage.setItem("__userdata", JSON.stringify(data.data));
          if (Object.keys(data.data)[i] != "password") {
            let grid_solo = document.createElement("div");
            grid_solo.className = "ui-grid-solo";
            let grid_a = document.createElement("div");
            grid_a.className = "ui-grid-a";
            let h4 = document.createElement("h4");
            h4.className = "center";

            //join
            grid_a.appendChild(h4);
            grid_solo.appendChild(grid_a);
            container.appendChild(grid_solo);
            h4.innerHTML = `${Object.keys(data.data)[i]} : ${
              Object.values(data.data)[i]
            }`;
          }
        }
      },
      error: function (data) {
        switch (data.status) {
          case 404:
            console.log("data tidak ditemukan");
            break;
        }
      },
      complete: function () {
        $.mobile.loading("hide");
      }
    });
  }
};

let editProfile = {
  init: function () {
    let userdata = JSON.parse(localStorage.getItem("__userdata"));
    $("input#p_nama").val(userdata.nama);
    $("input#p_username").val(userdata.username);
    if (userdata.telepon != "belum ada") {
      $("input#p_telepon").val(userdata.telepon);
    }
    if (userdata.alamat != "belum ada") {
      $("input#p_alamat").val(userdata.alamat);
    }
  }
};

//button edit profile pressed
$("#btn-edit-profile").on("click", function (event) {
  event.preventDefault();
  window.location.replace("./edit_profile.html");
});

//update profil data
$("#edit-profile").submit(function (event) {
  // $('#btn-update-profile').on('click', function (event) {
  event.preventDefault();

  let id = JSON.parse(localStorage.getItem("__userdata")).id_pelanggan;
  let nama = $("#p_nama").val();
  let username = $("#p_username").val();
  let telepon = $("#p_telepon").val();
  let alamat = $("#p_alamat").val();
  let password = $("#p_pass").val();
  let data = {
    id_pelanggan: id,
    nama: nama,
    username: username,
    password: password,
    telepon: telepon,
    alamat: alamat
  };
  let link = base_url + "pelanggan";

  $.ajax({
    url: link,
    type: "put",
    data: {
      id: id,
      nama: nama,
      username: username,
      password: password,
      telepon: telepon,
      alamat: alamat
    },
    beforeSend: function () {
      $.mobile.loading("show", {
        text: "Loading...",
        textVisible: true
      });
    },
    success: function (res) {
      if (res.status) {
        localStorage.setItem("__userdata", JSON.stringify(data));
        window.location.replace("./profile.html");
      } else {
        alert(res.message)
      }
    },
    complete: function () {
      $.mobile.loading("hide");
    }
  });
});

//----------------------------------------------------------------------------------