$(function () {
  const productos = [
    "banana",
    "cebollas",
    "pimentón",
    "papas",
    "lechuga",
    "tomate",
  ];
  const productosEnCarrito = [];

  const cuentaElementosCarrito = $(".hero_ver_carrito_cuenta");
  const modal = new bootstrap.Modal(document.getElementById("modal"));
  const btnShowCarrito = $("#btn_show_carrito");
  const cuerpoModal = $("#cuerpo-modal");

  btnShowCarrito.on("click", () => {
    if (productosEnCarrito.length > 0) {
      cuerpoModal.html(renderizarContenidoModal(productosEnCarrito));
    }
    modal.show();
  });

  $(".boton_agregar_carrito").each(function (indexInArray, valueOfElement) {
    $(this).on("click", () => {
      alert(`Producto ${productos[indexInArray]} agregado`);
      productosEnCarrito.push(productos[indexInArray]);

      if (productosEnCarrito.length > 0) {
        cuentaElementosCarrito.css("display", "inline-block");
        cuentaElementosCarrito.html(productosEnCarrito.length);
      } else {
        cuentaElementosCarrito.css("display", "none");
      }
    });
  });

  deleteElement = (elemento, index) => {
    $(elemento).remove();
    productosEnCarrito.splice(index, 1);

    cuerpoModal.html(renderizarContenidoModal(productosEnCarrito));
    if (productosEnCarrito.length > 0) {
      cuentaElementosCarrito.html(productosEnCarrito.length);
    } else {
      cuentaElementosCarrito.css("display", "none");
    }
  };
});

function renderizarContenidoModal(productosEnCarrito) {
  let elementoProducto = "";

  if (productosEnCarrito.length > 0) {
    productosEnCarrito.forEach((element, index) => {
      elementoProducto += `
             
      <div class='modal-card'>
          <div class='modal_card_delete' onclick='deleteElement(this,${index})'><i class="fa-solid fa-circle-xmark modal_card_delete_icono"></i></div>
          <img src='/public/${element}.png' alt='${element}'/>
          <p>${element}</p>
      </div>`;
    });
  } else {
    elementoProducto += "No hay productos en el carrito 🙁";
  }
  return elementoProducto;
}
