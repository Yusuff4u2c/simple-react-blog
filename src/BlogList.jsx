import { Link } from "react-router-dom";
const BlogList = ({ blogs }) => {
  const reversedBlog = [...blogs].reverse();
  return (
    <div className="blog-list">
      {reversedBlog.map((blog) => (
        <div className="blog-preview" key={blog._id}>
          <Link to={`/blogs/${blog._id}`}>
            <h2>{blog.title}</h2>
            <p>{blog.author}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
