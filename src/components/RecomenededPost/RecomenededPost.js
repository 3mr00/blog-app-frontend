import React from "react";
import author1 from "../../images/blog-list/author-1.png";
import Badge from "../Badge/Badge";

import { Link } from "react-router-dom";

const RecomenededPost = ({
  author,
  title,
  category,
  description,
  id,
  imageUrl,
  excerpt,
  index,
}) => {
  return (
    <div index={index} className="col-xl-4 col-md-6">
      <div className="single-recomended-post single-blog-list">
        <img src={imageUrl} alt={title} />
        <div className="blog-list-meta">
          <a className="blog-author" href="#">
            <img src={author1} alt="Blog Author" />
            <span>{author}</span>
          </a>
          <Badge>{category} </Badge>
        </div>
        <div className="blog-text">
          <h3>{title}</h3>
          <p>{excerpt(description)}</p>
          <Link className="blog-list-btn" to={`/blogdetails/${id}`}>
            Read More...
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecomenededPost;
