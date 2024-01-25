import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>The Yemi Blog</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/blogs">All Blogs</Link>
        <Link to="/create">New Blog</Link>
      </div>
    </nav>
  );
};

export default Navbar;
