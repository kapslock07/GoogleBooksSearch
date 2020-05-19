const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/books"
router.route("/books")
  .post(booksController.create)
  .get(booksController.findAll);


// Matches with "/api/saved"
router.route("/saved")
  .get(booksController.findAll)
  .delete(booksController.remove);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .put(booksController.update)
  .delete(booksController.remove);

module.exports = router;
