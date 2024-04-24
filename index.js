const express = require("express");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");

const PORT = process.env.PORT || 3000;

// helpers envuelve el texto Bievenidos a Mercado Web
app.engine(".hbs", exphbs.engine({ extname: ".hbs",
    helpers: {
      formatearNumber: function (numberString) {
        return (+numberString).toLocaleString();
      },
      primeraMayuscula: function (texto) {
        return texto.charAt(0).toUpperCase() + texto.slice(1);
      },
      boldHeroTitle: function (options) {
        return '<h1 class="fw-bold">' + options.fn(this) + "</h1>";
      },
    },
  })
);

app.set("view engine", ".hbs");
app.set("views", "./views");

app.listen(PORT, () => {
  console.log(`El servidor está inicializado en el puerto ${PORT}`);
});

// 5. Consumir los códigos fuentes de Bootstrap y jQuery a través de rutas o middlewares creados en el servidor. 
// Estas dependencias deben ser instaladas con NPM (1 punto)

app.use("/bootstrap_css", express.static("./node_modules/bootstrap/dist/css"));
app.use("/bootstrap_js", express.static("./node_modules/bootstrap/dist/js"));
app.use("/jquery", express.static("./node_modules/jquery/dist"));
app.use("/public", express.static("./public"));

// 1. Crear una ruta raíz que al ser consultada renderice una vista con un parcial “Dashboard” 
// enviándole en el render un arreglo con los nombres de los productos. 
// Se recomienda que estos coincidan con las imágenes de cada producto. (3 Puntos)
const datos = [
  { articulo: "banana", precio: "1590", medida: "1", unidad: "kg" },
  { articulo: "cebollas", precio: "390", medida: "1", unidad: "unidad" },
  { articulo: "pimenton", precio: "650", medida: "1", unidad: "unidad" },
  { articulo: "papas", precio: "1800", medida: "1", unidad: "kg" },
  { articulo: "lechuga", precio: "990", medida: "1", unidad: "unidad" },
  { articulo: "tomate", precio: "1250", medida: "1", unidad: "kg" },
];

app.get("/", (req, res) => {
  res.render("inicio", { datos });
});

// subido por el profesor para explicar los localStorage
// let productos = []
// let imagenes = document.querySelectorAll('img')
// let listaProductos = document.querySelector('#listaProductos')


// const eventListeners = () => {
//     document.addEventListener('DOMContentLoaded', () => {
//         productos = JSON.parse( localStorage.getItem('productos') ) || [];
//         console.log('productos-->', productos )

//         productos.forEach((element)=>{
//             listaProductos.innerHTML += `<img src="assets/img/${element}.png" alt="${element}"/>`
//         })

//     });
//     return productos
// }

// const sincronizarStorage = () => {
//     localStorage.setItem('productos', JSON.stringify(productos));
// }

// eventListeners();
// // console.log( 'Salida de productos-->', eventListeners() )

// imagenes.forEach( (element) => {
//     element.addEventListener('click', (e) => {
//         e.preventDefault()

//         let alt = e.target.alt
//         productos = [ ...productos, alt ];
//         console.log(productos)
//         sincronizarStorage();
//     })
// } )
