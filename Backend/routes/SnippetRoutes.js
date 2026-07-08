import express from "express";

import {
  createSnippet,
  getSnippets,
  getMySnippets,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  getFavorites,
  toggleFavorite
} from "../controllers/SnippetController.js";

import { protect } from "../middleware/authmiddleware.js";

const router = express.Router();

router.get("/", getSnippets);

router.get("/my", protect, getMySnippets);
router.get("/favorites", protect, getFavorites); // <-- BEFORE /:id


router.get("/:id", getSnippetById);

router.post("/", protect, createSnippet);

router.put("/:id", protect, updateSnippet);

router.delete("/:id", protect, deleteSnippet);

router.post("/:id/favorite", protect, toggleFavorite);

export default router;