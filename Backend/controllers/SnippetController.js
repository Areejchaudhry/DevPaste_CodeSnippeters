import Snippet from "../models/Snippets.js";

// ==========================================
// Create Snippet
// ==========================================
export const createSnippet = async (req, res) => {
  try {
    const { title, language, description, code, tags, visibility } = req.body;

    const snippet = await Snippet.create({
      title,
      language,
      description,
      code,
      tags,
      visibility,
      owner: req.user._id,
    });

    res.status(201).json(snippet);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// Get All Public Snippets
// ==========================================
export const getSnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({ visibility: "public" })
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.json(snippets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// Get Logged-in User Snippets
// ==========================================
export const getMySnippets = async (req, res) => {
  try {
    const snippets = await Snippet.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(snippets);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// Get Single Snippet
// ==========================================
export const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id).populate(
      "owner",
      "name email"
    );

    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }

    res.json(snippet);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// Update Snippet
// ==========================================
export const updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }

    if (snippet.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedSnippet = await Snippet.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.json(updatedSnippet);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// ==========================================
// Delete Snippet
// ==========================================
export const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({
        message: "Snippet not found",
      });
    }

    if (snippet.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await snippet.deleteOne();

    res.json({
      message: "Snippet deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


export const toggleFavorite = async (req, res) => {

    try {

        const snippetId = req.params.id;

        const alreadyFavorite = req.user.favorites.some(
            favorite => favorite.toString() === snippetId
        );

        if (alreadyFavorite) {

            req.user.favorites = req.user.favorites.filter(
                favorite => favorite.toString() !== snippetId
            );

            await req.user.save();

            return res.json({
                message: "Removed from favorites"
            });

        }

        req.user.favorites.push(snippetId);

        await req.user.save();

        res.json({
            message: "Added to favorites"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};

export const getFavorites = async (req, res) => {

    try {

        const user = await req.user.populate("favorites");

        res.status(200).json(user.favorites);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};