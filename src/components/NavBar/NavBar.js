import { Link } from "react-router-dom";
import React from "react";

export default function NavBar() {
  return (
    <div>
      {/* // <!-- Header Area Start --> */}
      <header className="header-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-md-6 col-6">
              <div className="logo">
                <a href="/">Blog.</a>
              </div>
            </div>
            <div className="col-xl-6 col-md-6 col-6 text-end">
              <nav className="main-menu">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/addBlog">Add Blog</Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </header>
      {/* <!-- Header Area End --> */}
    </div>
  );
}
