// llamar express y las routas
const express = require("express");
const app = express();
const blogRoutes = require("./routes/blogRoutes");

// montar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("servidor arrancado"));

// registrar el motor de plantillas
app.set("view engine", "ejs");
// la extensión de los documentos html los cambiamos por .ejs

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true })); // lo del urlencode extended: false
// es para que no nos salte un aviso relacionado con body parse. Investigar esto.

// vamos montando las peticiones de páginas:

// creamos una redirección de la raíz a una ruta llamada "/blog"
app.get("/", (req,res) => {
  res.redirect("/blog")
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
