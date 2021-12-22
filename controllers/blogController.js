// aquí tendremos todas las funcionalidades que inicialmente escribimos en app.js

const blogs = require("../models/blog");
const uuid = require("uuid");

const blog_index = (req, res) => {
  res.render("index", { title: "Inicio", blogs });
};

const blog_details = (req, res) => {
  // con los dos puntos antes de id indicamos que id es un parámetro
  console.log(req.params.id);
  const blog = blogs.find((blog) => blog.id == req.params.id); // buscar el blog por un id
  // a través del método find de los arrays
  console.log(blog);
  res.render("detail", { title: blog.title, blog });
};

const blog_create_get = (req, res) => {
  // podemos escribir la ruta que
  // queramos, no tiene porqué coincidir con el nombre del archivo.
  res.render("create", { title: "Crea nueva entrada" });
};

const blog_create_post = (req, res) => {
  // el req.body es lo que tiene que ver con el urlencode extended.
  console.log(req.body); // este body se refiere al cuerpo del mensaje que
  // se envía a través del método POST del formulario.
  // const { title, resumen, body } = req.body; // esto es una desestructuración de objeto.
  const blog = { id: uuid.v4(), ...req.body }; // clonamos el objeto req.body
  // con el spread operator
  blogs.push(blog);
  console.log(blogs);
  res.redirect("/");
};

const blog_delete = (req, res) => {
  blogs.forEach((blog, index) => {
    if (blog.id == req.params.id) {
      blogs.splice(index, 1);
    }
  });
  // enviamos un json con una ruta a la que redireccionar después de eliminar
  res.json({ redirect: "/" });
};

// exportamos las funciones para poder usarlas en blogRoutes
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
};
