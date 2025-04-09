require("dotenv").config(); // Load environment variables

const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Hardcoded MongoDB URI
const MONGO_URI = "mongodb://127.0.0.1:27017/pencil_palette";  

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// Schema
const Artwork = mongoose.model("Artwork", new mongoose.Schema({
  artistName: String,
  imageUrl: String,
}));

// Image Storage (Multer)
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`),
});

const upload = multer({ storage });

// Upload API
app.post("/api/upload", upload.single("image"), async (req, res) => {
  try {
    const newArtwork = new Artwork({
      artistName: req.body.artistName,
      imageUrl: `/uploads/${req.file.filename}`,
    });
    await newArtwork.save();
    res.status(201).json({ message: "Artwork uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload artwork" });
  }
});

// Get Artworks API
app.get("/api/artworks", async (req, res) => {
  try {
    const artworks = await Artwork.find();
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artworks" });
  }
});

// Start Server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
