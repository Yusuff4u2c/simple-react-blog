import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiClient } from "./api/client";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Select author");
  const navigate = useNavigate();

  const createBlog = async (blog) => {
    try {
      await apiClient.post("/blogs", blog);
    } catch (error) {
      console.log(error.message);
    }
  };

  const mutation = useMutation({
    mutationFn: createBlog,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const blogpost = { title, body, author };
    mutation.mutate(blogpost);
    toast.success("Blog post created");
    navigate("/");
  };

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label> Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>

        <label htmlFor="">Blog author</label>
        <select
          value={author}
          onChange={(e) => {
            setAuthor(e.target.value);
          }}
        >
          <option value="hj">Select Author</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
          <option value="Chris Johnson">Chris Johnson</option>
          <option value="Emma Brown">Emma Brown</option>
        </select>

        <button type="submit">Add blog</button>
        {mutation.isPending && (
          <button type="submit" disabled>
            Adding blog...
          </button>
        )}
      </form>
    </div>
  );
};

export default Create;
