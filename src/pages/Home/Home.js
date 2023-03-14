import React from "react";

import "./css/Home.css";
import "./css/responsive.css";

import SliderHome from "../../components/SliderHome/SliderHome";
import BlogsHome from "../../components/BlogsHome/BlogsHome";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { MDBTypography } from "mdb-react-ui-kit";
import Category from "../../components/Category/Category";
import RecentPost from "../../components/RecentPost/RecentPost";
import ReactPaginate from "react-paginate";
import RecomenededPost from "../../components/RecomenededPost/RecomenededPost";

export default function Home(props) {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const [recomenededPost, setRecomenededPost] = useState([]);

  const [loading, setLoading] = useState(true);

  const [totalPages, setTotalPages] = useState(0);

  const [currentPage, setCurrentPage] = useState(0);

  let limit = 6;

  let forcePageObj = { currentPage };
  if (props.page === 0) {
    forcePageObj["forcePage"] = 0;
  }

  const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];

  useEffect(() => {
    setFilteredData(
      data.filter((val) => {
        if (searchValue === "") {
          return val;
        } else if (
          val.author.toLowerCase().includes(searchValue.toLowerCase()) ||
          val.title.toLowerCase().includes(searchValue.toLowerCase()) ||
          val.category.toLowerCase().includes(searchValue.toLowerCase())
        ) {
          return val;
        }
      })
    );
  }, [searchValue, data]);

  useEffect(() => {
    loadBlogsData();
  }, []);

  const loadBlogsData = async () => {
    setLoading(true);

    const response = await fetch(
      `https://booky-3yva.onrender.com/blogs?_page=1&_limit=${limit}`
    );
    const data = await response.json();
    if (response.status === 200) {
      setData(data);
      setLoading(false);
      setCurrentPage(0);

      const total = response.headers.get("x-total-count");

      setTotalPages(Math.ceil(total / limit));
    } else {
      toast.error("Something went wrong");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure that you wanted to delet that blog ?")) {
      const response = await axios.delete(
        `https://booky-3yva.onrender.com/blogs/${id}`
      );
      if (response.status === 200) {
        toast.success("Blog Deleted Successfully");
        loadBlogsData();
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const excerpt = (str) => {
    if (str.length > 80) {
      str = str.substring(0, 80) + " ... ";
    }
    return str;
  };

  const onInputChange = (e) => {
    setSearchValue(e.target.value);
    setCurrentPage(0);
  };

  const handleCategory = async (category) => {
    const response = await fetch(
      `https://booky-3yva.onrender.com/blogs?category=${category}`
    );
    const data = await response.json();

    const total = response.headers.get("x-total-count");

    setTotalPages(Math.ceil(total / limit));

    if (response.status === 200 || response.status === 200) {
      setData(data);
    } else {
      toast.error("Somthig went wrong");
    }
  };

  const handleCategoryAll = () => {
    loadBlogsData();
  };

  useEffect(() => {
    fetchPageClick();
  }, [currentPage]);

  const fetchPageClick = async (currentPage) => {
    const res = await fetch(
      `https://booky-3yva.onrender.com/blogs?_page=${currentPage}&_limit=${limit}`
    );
    const data = await res.json();
    return data;
  };

  const handlePageClick = async (data) => {
    let currentPage = data.selected + 1;

    const dataFormServer = await fetchPageClick(currentPage);

    setData(dataFormServer);
  };

  useEffect(() => {
    fetchsetRecomenededPost();
  }, []);

  const fetchsetRecomenededPost = async () => {
    let page = Math.floor(Math.random(4));

    const response = await axios.get(
      `https://booky-3yva.onrender.com/blogs?per_page=4&page=${page}`
    );
    if (response.status === 200) {
      setRecomenededPost(
        response.data
          .sort(function () {
            return 0.5 - Math.random();
          })
          .slice(0, 3)
      );
    } else {
      toast.error("Something went wrong");
    }
  };

  return (
    <props.context>
      {loading && loading ? (
        <div className="preloader-wrapper">
          <div className="spinner">
            <div className="double-bounce1"></div>
            <div className="double-bounce2"></div>
          </div>
        </div>
      ) : (
        <div>
          <SliderHome />
          {/* <!-- Main Area Start --> */}
          <main>
            <section className="blog-list-sidebar-area">
              <div className="container">
                <div className="row">
                  <div className="col-xl-8">
                    <div className="blog-list-wrapper">
                      <div className="row">
                        {/* blogs start */}
                        {filteredData.length === 0 ? (
                          <MDBTypography className="text-center mb-0" tag="h2">
                            No Blog Found
                          </MDBTypography>
                        ) : (
                          filteredData &&
                          filteredData.map((item, index) => (
                            <BlogsHome
                              key={index}
                              {...item}
                              excerpt={excerpt}
                              handleDelete={handleDelete}
                            />
                          ))
                        )}
                        {/* blogs start end */}
                      </div>
                    </div>
                  </div>
                  <div className="col-xl-4">
                    <div className="row blog-sidebar">
                      {/* search */}
                      <div className="col-xl-12 col-md-6">
                        <div className="sidebar-widget blog-search">
                          <form onSubmit={(e) => e.preventDefault()}>
                            <input
                              type="text"
                              placeholder="Search Blog Post"
                              onChange={onInputChange}
                            />
                            <button type="submit">
                              <i className="bi bi-search"></i>
                            </button>
                          </form>
                        </div>
                      </div>
                      {/* RecentPost */}
                      <div className="col-xl-12 col-md-6">
                        <div className="sidebar-widget recent-post">
                          <h3>Recent Post</h3>

                          <RecentPost />
                        </div>
                      </div>

                      {/* categorys list*/}
                      <Category
                        options={options}
                        handleCategory={handleCategory}
                        handleCategoryAll={handleCategoryAll}
                      />
                    </div>
                  </div>
                  <br />
                  <br />
                  <ReactPaginate
                    previousLabel={"previous"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    pageCount={totalPages} //num of page
                    marginPagesDisplayed={2} // num of Paginate start
                    pageRangeDisplayed={3} // num of Paginate center
                    onPageChange={handlePageClick}
                    containerClassName={
                      "pagination justify-content-center margin-top-5%"
                    }
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"page-item"}
                    previousLinkClassName={"page-link"}
                    nextClassName={"page-item"}
                    nextLinkClassName={"page-link"}
                    breakClassName={"page-item"}
                    breakLinkClassName={"page-link"}
                    activeClassName={"active"}
                    {...forcePageObj}
                    renderOnZeroPageCount={null}
                  />
                </div>
                <div className="row">
                  <div className="col-xl-12">
                    <div className="blog-recomended">
                      <h2>Recomeneded Post</h2>
                      <div className="row">
                        {recomenededPost &&
                          recomenededPost.map((item, index) => (
                            <RecomenededPost
                              key={index}
                              {...item}
                              excerpt={excerpt}
                            />
                          ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
          {/* <!-- Main Area End --> */}
        </div>
      )}
    </props.context>
  );
}
