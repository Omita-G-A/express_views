const mongoose = require('mongoose');

// creamos el esquema de datos
const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  resume: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
}, {timestamps: true}); // timestamp es una opción de mongoose que te permite
// poner una fecha cada vez que actualizas los datos.

// creamos el modelo en base al esquema que hemos creado. Pasamos dos parámetros:
// el nombre que queremos darle al modelo (que mongoose utilizará para crear la
// colección --> modelo blog, colección blogs), y el esquema que queremos usar.
const Blog = mongoose.model('blog', blogSchema);

module.exports = Blog;
