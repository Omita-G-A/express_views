const express = require("express");

// exportamos la clase Router de express para poder manejar las rutas.
const router = express.Router();

const blogController = require("../controllers/blogController");

router.get("/", blogController.blog_index);

router.post("/", blogController.blog_create_post);

router.get("/create", blogController.blog_create_get);

router.get("/:id", blogController.blog_details);

router.get("/update/:id", blogController.blog_update_get);

router.post("/update/:id", blogController.blog_update_post);

router.delete("/:id", blogController.blog_delete);

// exportamos la const router para poder usarla en app
module.exports = router;