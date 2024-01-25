import mongoose from "mongoose";
const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String, required: true },
  author: { type: String, required: true },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

const Blog = mongoose.model("Blogposts", blogSchema);

module.exports = Blog;
