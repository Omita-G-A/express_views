const express = require("express");
const blogController = require("../controllers/blogController");

// exportamos la clase Router de express para poder manejar las rutas.
const router = express.Router();

router.get("/", blogController.blog_index);

router.post("/", blogController.blog_create_post);

router.get("/create", blogController.blog_create_get);

router.get("/:id", blogController.blog_details);

router.delete("/:id", blogController.blog_delete);

// exportamos la const router para poder usarla en app
module.exports = router;