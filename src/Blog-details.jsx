import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { apiClient } from "./api/client";
import { useState, useEffect } from "react";

const BlogDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isEdited, setIsEdited] = useState(null);
  const [editedPost, setEditedPost] = useState("");
  const [editedTitle, setEditedTitle] = useState("");

  const fetchBlogDetails = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8001/blogs/${id}`);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data: blog,
    isError,
    isPending,
  } = useQuery({
    queryKey: ["blogdetails", id],
    queryFn: () => fetchBlogDetails(id),
  });

  const handleEdit = async () => {
    setIsEdited(true);
  };

  useEffect(() => {
    if (blog) {
      console.log("Before setEditedTitle, editedTitle:", editedTitle);
      setEditedPost(blog.body);
      setEditedTitle(blog.title);
      console.log("After setEditedTitle, editedTitle:", editedTitle);
      setEditedTitle(blog.title);
    }
  }, [blog]);

  const updateBlog = async ({ id, editedPost, editedTitle }) => {
    console.log("Sending data:", id, editedTitle, editedPost);

    const response = await apiClient.put("/blogs/" + id, {
      body: editedPost,
      title: editedTitle,
    });
    console.log("Update response:", response);
    navigate("/blogs");
    return response;
  };
  const updateMutation = useMutation({ mutationFn: updateBlog });

  const deleteBlog = async (id) => {
    const response = await apiClient.delete("/blogs/" + id);
    navigate("/blogs");
    return response;
  };
  const mutation = useMutation({ mutationFn: deleteBlog });

  return (
    <div className="blog-details">
      {isPending && <div> Loading...</div>}
      {isError && <div>{isError.message}</div>}

      {blog && (
        <article className="blog">
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          {!isEdited ? (
            <div>{blog.body}</div>
          ) : (
            <form
              className="edit-form"
              onSubmit={(e) => {
                e.preventDefault();
                updateMutation.mutate({
                  id: blog._id,
                  editedPost,
                  editedTitle,
                });
              }}
            >
              <div className="edit-input">
                {" "}
                <label htmlFor="edit-body" className="body-label">
                  Body
                </label>
                <textarea
                  autoFocus
                  rows={5}
                  className=""
                  id="edit-body"
                  value={editedPost}
                  onChange={(e) => {
                    // console.log("editedPost:", e.target.value);
                    setEditedPost(e.target.value);
                  }}
                ></textarea>
              </div>
              <div className="edit-input">
                <label htmlFor="edit-title" className="title-label">
                  Title
                </label>
                <input
                  className=""
                  id="edit-title"
                  value={editedTitle}
                  onChange={(e) => {
                    // console.log("editedTitle:", e.target.value);
                    setEditedTitle(e.target.value);
                  }}
                ></input>
              </div>
              <button type="submit" className="save-btn">
                Save Post
              </button>
            </form>
          )}
          {!isEdited && (
            <button onClick={() => mutation.mutate(blog._id)}>
              Delete Post
            </button>
          )}
          {!isEdited && (
            <button onClick={handleEdit} className="edit-btn">
              Edit Post
            </button>
          )}
        </article>
      )}
    </div>
  );
};

export default BlogDetails;
