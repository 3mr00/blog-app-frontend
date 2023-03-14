import { Link } from "react-router-dom";
import { MDBBtn, MDBIcon } from "mdb-react-ui-kit";
import author1 from "../../images/blog-list/author-1.png";
import Badge from "../Badge/Badge";
import React from "react";

export default function BlogsHome({
  author,
  title,
  category,
  description,
  id,
  imageUrl,
  excerpt,
  handleDelete,
}) {
  return (
    <div className="col-xl-6 col-md-6">
      <div className="single-blog-list">
        <img src={imageUrl} alt={title} />
        <div className="blog-list-meta">
          <span className="blog-author" href="#">
            <img src={author1} alt="Blog Author" />
            <span>{author}</span>
          </span>
          {/*categoryBadge*/}

          <Badge>{category} </Badge>
        </div>
        <div className="blog-text">
          <h3>{title}</h3>
          <p>{excerpt(description)}</p>

          <Link className="blog-list-btn" to={`/blogdetails/${id}`}>
            Read More...
          </Link>
        </div>
        <br />

        <span>
          <MDBBtn
            className="mt-1"
            tag="a"
            color="none"
            style={{ marginRight: "11%" }}
            onClick={() => handleDelete(id)}
          >
            <MDBIcon fas icon="trash" style={{ color: "#dd4b39" }} size="lg" />
          </MDBBtn>

          <Link to={`/editblog/${id}`}>
            <MDBIcon
              fas
              icon="edit"
              style={{ color: "#55acee", marginLeft: "10px" }}
              size="lg"
            />
          </Link>
        </span>
      </div>
    </div>
  );
}
