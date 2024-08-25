const express = require("express");
const Book = require("../models/book");

const router = express.Router();

router.post("/registerBooks", async (req, res) => {
  try {
    const { name, author_id, pages } = req.body;
    const book = new Book({ name, author_id, pages });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/getBooks", async (req, res) => {
  try {
    const books = await Book.find().populate("author_id");
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("author_id");
    if (!book) return res.status(404).json({ message: "Livro não encontrado" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
