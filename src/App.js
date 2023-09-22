import React, { useState, useEffect } from "react";
import axios from "axios";
import Posts from "./Posts";
import Pagination from "./Pagination";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoding] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postperPage, setPostperPage] = useState(10);
  useEffect(() => {
    fetchPost();
  }, []);

  const fetchPost = async () => {
    setLoding(true);
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/posts"
    );
    setPosts(response.data);
    setLoding(false);
  };

  const indexofLastPost = currentPage * postperPage;
  const indexofFirstPost = indexofLastPost - postperPage;
  const currentPosts = posts.slice(indexofFirstPost, indexofLastPost);
  console.log(posts);


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);

  }
  return (
    <div className="container">
      <h1>My vlog</h1>
      <Posts posts={currentPosts} loading={loading} />
      <Pagination
        postsPerPage={postperPage}
        totalPosts={posts.length}
        paginate={paginate}
      />
    </div>
  );
}

export default App;
