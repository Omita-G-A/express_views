// llamar express
const express = require("express");
const app = express();

// montar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("servidor arrancado"));

// registrar el motor de plantillas
app.set("view engine", "ejs");
// la extensión de los documentos html los cambiamos por .ejs

// vamos montando las peticiones de páginas:
app.get("/", (req, res) => {
  const blogs = [
    { title: "Primer blog", resumen: "Bla bla bla, ble ble, bloblobló." },
    { title: "Segundo blog", resumen: "Ble bla bla, ble ble, bloblobló." },
    { title: "Tercer blog", resumen: "Blibliblbi bla, ble ble, bloblobló." },
  ];
  res.render("index", { title: "Inicio", blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Acerca de" });
});

app.get("/blog/create", (req, res) => { // podemos escribir la ruta que 
    // queramos, no tiene porqué coincidir con el nombre del archivo.
  res.render("create", { title: "Crea nueva entrada" });
});
app.use((req, res) => {
  // como status hace lo que tiene que hacer sobre el objeto y devuelve una
  // referencia a sí mismo, podemos concatenar métodos
  res.status(404).render("404", { title: "vaya..." });
});
