import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import React from "react";

export let BlogContext = createContext([]);

export function BlogContextProvider(props) {
  const [recentPost, setRecentPost] = useState([]);

  useEffect(() => {
    fetchRecentBlog();
  }, [props.data]);

  const fetchRecentBlog = async () => {
    const totalBlog = await axios.get("https://booky-3yva.onrender.com/blogs");
    const start = totalBlog.data.length - 4;
    const end = totalBlog.data.length;
    const response = await axios.get(
      `https://booky-3yva.onrender.com/blogs?_start=${start}&_end=${end}`
    );
    if (response.status === 200) {
      setRecentPost(response.data);
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <BlogContext.Provider
      value={{ recentPost, fetchRecentBlog: fetchRecentBlog() }}
    >
      {props.children}
    </BlogContext.Provider>
  );
}
