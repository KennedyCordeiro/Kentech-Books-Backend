import { Router } from "express";
import Author, { find, findById } from "../models/author";

const router = Router();

router.post("/registerAuthors", async (req, res) => {
  try {
    const { name, email } = req.body;
    const author = new Author({ name, email });
    await author.save();
    res.status(201).json(author);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/getAuthors", async (req, res) => {
  try {
    const authors = await find();
    res.json(authors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/authors/:id", async (req, res) => {
  try {
    const author = await findById(req.params.id);
    if (!author)
      return res.status(404).json({ message: "Autor não encontrado" });
    res.json(author);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
