// llamar express
const express = require("express");
const app = express();
const morgan = require("morgan");
const uuid = require("uuid");

// montar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("servidor arrancado"));

// registrar el motor de plantillas
app.set("view engine", "ejs");
// la extensión de los documentos html los cambiamos por .ejs

// middleware con next
// app.use((req, res, next) => {
//   console.log("hay una petición");
//   console.log("host: ", req.hostname);
//   console.log("path: ", req.path);
//   console.log("method: ", req.method);
//   next();
// });

// app.use((req, res, next) => {
//   console.log("Estoy en el segundo middleware");
//   next();
// });

// // ejemplo de un middleware de terceros. Morgan es un logger
// // de http request.
// app.use(morgan("tiny"));

app.use(express.static("public"));

const blogs = [
  {
    id: 1,
    title: "Primer blog",
    resumen: "Bla bla bla, ble ble, bloblobló.",
    body: "pouiwhgHI",
  },
  {
    id: 2,
    title: "Segundo blog",
    resumen: "Ble bla bla, ble ble, bloblobló.",
    body: "kajgh",
  },
  {
    id: 3,
    title: "Tercer blog",
    resumen: "Blibliblbi bla, ble ble, bloblobló.",
    body: "iahgro",
  },
];

// vamos montando las peticiones de páginas:
app.get("/", (req, res) => {
  res.render("index", { title: "Inicio", blogs });
});

// OJO QUE ESTO DEL POST ME HA SALIDO MAL. MIRAR GITHUB PROFE
app.post("/", (req, res) => {
  const blog = { id: uuid.v4(), ...req.body }; // clonamos el objeto req.body con el spread operator
  blogs.push(blog);
  console.log(req.body);
  console.log(blogs);
  res.redirect("/");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Acerca de" });
});

app.get("/blog/create", (req, res) => {
  // podemos escribir la ruta que
  // queramos, no tiene porqué coincidir con el nombre del archivo.
  res.render("create", { title: "Crea nueva entrada" });
});

app.get("/blog/:id", (req, res) => {
  console.log(req.params);
});

app.use((req, res) => {
  // como status hace lo que tiene que hacer sobre el objeto y devuelve una
  // referencia a sí mismo, podemos concatenar métodos
  res.status(404).render("404", { title: "vaya..." });
});
