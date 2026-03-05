const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection String with URL-encoded password
const MONGO_URI = "mongodb+srv://r8rishav:Pass8026%40@cluster0.xqdbh9l.mongodb.net/blogDB?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected Successfully for Rishav Raj!"))
    .catch(err => console.error("❌ Database Connection Error:", err));

// Schema for Blog Posts
const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, default: "Rishav Raj" },
    createdAt: { type: Date, default: Date.now }
});

const Post = mongoose.model('Post', postSchema);

// API to Publish a Blog
app.post('/api/posts', async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = new Post({ title, content });
        await newPost.save();
        res.status(201).json({ message: "Post saved to Cloud Database!" });
    } catch (error) {
        res.status(500).json({ error: "Database save failed." });
    }
});

// API to Fetch All Blogs
app.get('/api/posts', async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 });
        res.json(posts);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch posts." });
    }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));