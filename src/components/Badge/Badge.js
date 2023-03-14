import React from "react";

import { MDBBadge } from "mdb-react-ui-kit";

const Badge = ({ children }) => {
  const colorKey = {
    Fashion: "primary",
    Travel: "success",
    Fitness: "danger",
    Food: "warning",
    Tech: "info",
    Sports: "dark",
  };

  return (
    <h5>
      <MDBBadge className="blog-category" color={colorKey[children[0]]}>
        {children}
      </MDBBadge>
    </h5>
  );
};

export default Badge;
