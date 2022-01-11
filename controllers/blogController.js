// aquí tendremos todas las funcionalidades que inicialmente escribimos en app.js

// ------AVISO PARA RAMA "con-mongo": como nos hemos cargado el array de blogs de Blog.js porque
// a partir de ahora conectaremos con la base de datos en Atlas, comentaré todas las líneas
// en las que aparezca "blogs".

// const blogs = require("../models/Blog");
// -------------

const Blog = require("../models/Blog");

// comentamos también el uuid porque el id único nos lo dará MongoDB
// const uuid = require("uuid");

const blog_index = (req, res) => {
  //mongoose tiene diferentes métodos estático (que aplicamos directamente sobre la clase)
  //
  Blog.find()
    .then((result) => res.render("index", { title: "Inicio", blogs: result }))
    .catch((err) => console.log(err));
};

const blog_details = (req, res) => {
  // console.log(blog);
  // res.render("detail", { title: blog.title, blog });
  Blog.findById(req.params.id)
    .then((blog) => res.render("detail", { title: blog.title, blog }))
    .catch((err) => {
      console.log(err);
      res.render("404", { title: "No encontrado" });
    });
};

const blog_create_get = (req, res) => {
  // podemos escribir la ruta que
  // queramos, no tiene porqué coincidir con el nombre del archivo.
  res.render("create", { title: "Crea nueva entrada" });
};

const blog_create_post = (req, res) => {
  // el req.body es lo que tiene que ver con el urlencode extended.
  // Body se refiere al cuerpo del mensaje que
  // se envía a través del método POST del formulario.
  const blog = new Blog(req.body);
  console.log(blog);
  blog
    .save()
    .then((result) => {
      console.log("Registro guardado");
      res.redirect("/");
    })
    .catch((err) => console.log(err));
};

const blog_update_get = (req, res) => {
  // buscar el blog con el id requerido dentro de blogs con el método find
  //-------------------
  // const blog = blogs.find((blog) => blog.id == req.params.id);
  // -----------------
  // renderizamos en la ruta que le decimos
  Blog.findById(req.params.id)
    .then((blog) => res.render("update", { title: "Editar entrada", blog }))
    .catch((err) => console.log(err));
};

const blog_update_post = (req, res) => {
  // recorremos blogs en busca del blog concreto para poder hacer
  // un splice para sustituir el blog modificado
  //-----------
  // blogs.forEach((blog, index) => {
  //   if (blog.id == req.params.id) {
  //     // Reasignamos lo que hemos sobreescrito en el formulario de actualizar simplemente con
  //     // el spread operator --> siempre manteniendo el mismo id, eso es muy importante. Y
  //     // con splice sustituimos un blog por el updated
  //     const blogUpdated = { id: blog.id, ...req.body };
  //     blogs.splice(index, 1, blogUpdated);
  //     // otra forma es reasignando a través del índice del array
  //     // blogs[index] = blogUpdated;
  //   }
  // });
  // -----------
  // redireccionamos a /blog/ + el id del blog que hemos modificado, el cual
  // tenemos recogido en el req.params.id
  Blog.findByIdAndUpdate(req.params.id)
    .then(res.redirect("/blog/" + req.params.id))
    .catch((err) => console.log(err));

  // res.redirect("/blog/" + req.params.id);
  // otra opción sería un render:
  // res.render("detail", { title: blog.title, blog });
};

const blog_delete = (req, res) => {
  // ---------------
  // blogs.forEach((blog, index) => {
  //   if (blog.id == req.params.id) {
  //     blogs.splice(index, 1);
  //   }
  // });
  // -------------------
  Blog.findByIdAndDelete(req.params.id)
    .then(res.json({ redirect: "/" }))
    .catch((err) => console.log(err));

  // enviamos un json con una ruta a la que redireccionar después de eliminar
  // res.json({ redirect: "/" });
};

// exportamos las funciones para poder usarlas en blogRoutes
module.exports = {
  blog_index,
  blog_details,
  blog_create_get,
  blog_create_post,
  blog_delete,
  blog_update_get,
  blog_update_post,
};
