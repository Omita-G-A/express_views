// llamar express y las routas
const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const mongoose = require("mongoose");

const app = express();
// montamos el puerto
const PORT = process.env.PORT || 5000;


// conectamos MongoDB Atlas con nuestra aplicación a través de mongoose. Y además ponemos a escuchar el puerto del
// servidor dentro de la promesa de la conexión de mongoose (porque mongoose.connect devuelve una promesa), que si no se 
// conecta con Atlas el servidor no arranque (si comparamos con la rama del git en la que no usamos mongo con 
// mongoose el app.listen está fuera).
const url = `mongodb+srv://OmiGA:_Bliblibl0!@cluster0.w2tfo.mongodb.net/node-test?retryWrites=true&w=majority`;
mongoose.connect(url)
  .then((result) => {
    console.log("Conectado a Atlas satisfactoriamente.");
    app.listen(PORT, () => console.log("Servidor de Express arrancado."));
  }) 
  .catch((err) => console.log(err));


// registrar el motor de plantillas
app.set("view engine", "ejs");
// la extensión de los documentos html los cambiamos por .ejs

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // lo del urlencode extended: false
// es para que no nos salte un aviso relacionado con body parse. Investigar esto.

// vamos montando las peticiones de páginas:

// creamos una redirección de la raíz a una ruta llamada "/blog"
app.get("/", (req, res) => {
  res.redirect("/blog");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "Acerca de" });
});

// para poder usar las rutas del archivo de las rutas uso el método use. Y le decimos
// que todas las rutas de blogRoutes las maneje añadiendo "/blog" delante.
app.use("/blog", blogRoutes);

app.use((req, res) => {
  // como status hace lo que tiene que hacer sobre el objeto y devuelve una
  // referencia a sí mismo, podemos concatenar métodos
  res.status(404).render("404", { title: "vaya..." });
});
