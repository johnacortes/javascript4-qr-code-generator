"user strict";

let urlIngresada;

function enviarUrl() {
  let urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

  let url = document.getElementById("input").value;

  urlIngresada = url;

  if (urlPattern.test(urlIngresada)) {
    let qrCode = new QRCode(document.getElementById("codigo"), {
      text: urlIngresada,
      width: 218,
      height: 218,
      colorDark: "#000000",
      colorLight: "#f2f5f9",
      correctLevel: QRCode.CorrectLevel.H,
    });

    document.getElementById("containerBarra").style.display = "none";
    document
      .getElementById("container-imagenQr-buttons")
      .classList.remove("display-none");
    document.getElementById("svg-fixed5").style.display = "flex";
  } else {
    alert("ingrese");
  }
}

function download() {
  // Obtiene el contenedor del código QR
  var container = document.getElementById("codigo");

  // Obtiene la imagen del código QR
  var img = container.querySelector("img");

  // Crea un enlace temporal para descargar la imagen
  var link = document.createElement("a");
  link.href = img.src;
  link.download = "codigo_qr.png";

  // Simula un clic en el enlace para iniciar la descarga
  link.click();
  setTimeout(() => {
    alert("Refresque la pagina para generar un nuevo QR!");
  }, 1000);
}

function share() {
  // Obtiene el contenedor del código QR
  var container = document.getElementById("codigo");

  // Obtiene la imagen del código QR
  var img = container.querySelector("img");

  // Convierte la imagen del código QR en un blob
  fetch(img.src)
    .then((response) => response.blob())
    .then((blob) => {
      // Comprueba si el navegador es compatible con la API Web Share
      if (navigator.share) {
        // Utiliza la API Web Share para compartir el blob de la imagen del código QR
        navigator
          .share({
            title: "QR Code",
            files: [new File([blob], "qr_code.png", { type: "image/png" })],
          })
          .then(() => console.log("Compartido exitosamente"))
          .catch((error) => console.error("Error al compartir:", error));
        setTimeout(() => {
          alert("Refresque la pagina para generar un nuevo QR!");
        }, 2000);
      } else {
        // Notifica al usuario si el navegador no es compatible con la API Web Share
        alert("Tu navegador no soporta la función de compartir.");
      }
    })
    .catch((error) => console.error("Error al obtener el blob:", error));
}
