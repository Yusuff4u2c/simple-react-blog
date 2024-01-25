import { useQuery } from "@tanstack/react-query";

import BlogList from "./BlogList";
import { apiClient } from "./api/client";
import axios from "axios";
// import Blog from "./db";

// import useFetch from "./useFetch";

const Home = () => {
  const fetchBlogs = async () => {
    try {
      let response = await axios.get("http://localhost:8001/blogs");
      console.log(response);
      return response.data;
    } catch (error) {
      console.log(error.message);
    }
  };
  const { data, isPending, isError } = useQuery({
    queryKey: ["blogposts"],
    queryFn: fetchBlogs,
  });

  return (
    <div className="home">
      {isPending && <div>Loading...</div>}
      {isError && <div>{isError}</div>}
      {data && <BlogList blogs={data} />}
    </div>
  );
};

export default Home;
