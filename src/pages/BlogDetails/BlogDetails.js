import React from "react";

import author1 from "../../images/blog-list/author-1.png";

import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBIcon } from "mdb-react-ui-kit";
import Badge from "../../components/Badge/Badge";
import RecentPost from "../../components/RecentPost/RecentPost";

export default function BlogDetails(props) {
  const [blog, setBlog] = useState();
  const [relatedPost, setRelatedPost] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getSingleBlog();
    }
  }, [id]);

  const getSingleBlog = async () => {
    const response = await axios.get(
      `https://booky-3yva.onrender.com/blogs/${id}`
    );
    const relatedPostData = await axios.get(
      `https://booky-3yva.onrender.com/blogs?category=${response.data.category}&_start=0&_end=3`
    );
    if (response.status === 200 || relatedPostData.status === 200) {
      setBlog(response.data);
      setRelatedPost(relatedPostData.data);
    } else {
      toast.error("Somthig went wrong");
    }
  };

  const excerpt = (str) => {
    if (str.length > 80) {
      str = str.substring(0, 80) + " ... ";
    }
    return str;
  };

  return (
    <props.context>
      <main>
        <section className="blog-list-sidebar-area">
          <Link to="/">
            <strong
              style={{ color: "black", paddingLeft: "5px" }}
              className="mt-0"
            >
              <MDBIcon fas icon="arrow-left" style={{ paddingRight: "5px" }} />
              Go Back
            </strong>
          </Link>
          <div className="container">
            <div className="row">
              <div className="col-xl-8">
                <div className="blog-details">
                  <img src={blog && blog.imageUrl} alt={blog && blog.title} />
                  <div className="blog-list-meta">
                    <span className="blog-author" href="#">
                      <img src={author1} alt="Blog Author" />
                      <span>{blog && blog.author}</span>
                    </span>
                    <Badge>{blog && blog.category} </Badge>
                  </div>
                  <MDBIcon fas icon="calendar-alt" />
                  <strong
                    style={{
                      paddingLeft: "5px",
                    }}
                  >
                    {blog && blog.date}
                  </strong>
                  <div className="blog-text">
                    <h2>{blog && blog.title}</h2>

                    <p>{blog && blog.description}</p>
                  </div>
                </div>
              </div>
              <div className="col-xl-4">
                <div className="row blog-sidebar">
                  {/* RecentPost */}
                  <div className="col-xl-12 col-md-6">
                    <div className="sidebar-widget recent-post">
                      <h3>Recent Post</h3>

                      <RecentPost />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {relatedPost && relatedPost.length > 0 && (
              <div className="row">
                <div className="col-xl-12">
                  <div className="blog-recomended">
                    {relatedPost.length > 1 && <h2>Related Post</h2>}

                    <div className="row">
                      {relatedPost
                        .filter((item) => item.id != id)
                        .map((item, index) => (
                          <div key={index} className="col-xl-4 col-md-6">
                            <div className="single-recomended-post single-blog-list">
                              <img src={item.imageUrl} alt="Single Blog" />
                              <div className="blog-list-meta">
                                <a className="blog-author" href="#">
                                  <img src={author1} alt="Blog Author" />
                                  <span>{item.author}</span>
                                </a>
                              </div>
                              <div className="blog-text">
                                <h3>{item.title}</h3>
                                <p>{excerpt(item.description)}</p>

                                <Link
                                  className="blog-list-btn"
                                  to={`/blogdetails/${item.id}`}
                                >
                                  {" "}
                                  Read More...
                                </Link>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
    </props.context>
  );
}
