import React from "react";

export default function Footer() {
  return (
    <div>
      {/* <!-- Footer Area Start --> */}
      <footer className="footer-area">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xl-6 col-md-6">
              <div className="copyright-text">
                <p>All Rights Reserved & copy AmrAdham 2022</p>
              </div>
            </div>
            <div className="col-xl-6 col-md-6">
              <div className="footer-social">
                <ul>
                  <li>
                    <a href="#">
                      <i className="bi bi-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-instagram"></i>
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-youtube"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* <!-- Footer Area End --> */}
    </div>
  );
}
