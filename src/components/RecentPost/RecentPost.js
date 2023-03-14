import React, { useContext } from "react";
import { Link } from "react-router-dom";

import { BlogContext } from "../../components/BlogContext/BlogContext";

const RecentPost = () => {
  let { recentPost } = useContext(BlogContext);

  return (
    <>
      {recentPost &&
        recentPost.map((item, index) => (
          <div key={index} className="single-recent-post">
            <Link to={`/blogdetails/${item.id}`}>
              <span>
                <img src={item.imageUrl} alt={item.title} />
                <span>{item.title}</span>
              </span>
            </Link>
          </div>
        ))}
    </>
  );
};

export default RecentPost;
