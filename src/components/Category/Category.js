import React from "react";

const Category = ({ handleCategoryAll, handleCategory, options }) => {
  return (
    <div className="col-xl-12 col-md-6">
      <div className="sidebar-widget blog-category-list">
        <h3>Blog Category list</h3>
        <ul>
          <li style={{ cursor: "pointer" }} onClick={() => handleCategoryAll()}>
            <a>All</a>
          </li>
          {options.map((item, index) => (
            <li
              style={{ cursor: "pointer" }}
              key={index}
              onClick={() => handleCategory(item)}
            >
              <a>{item}</a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Category;
