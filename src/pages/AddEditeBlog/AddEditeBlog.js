import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import React from "react";

import {
  MDBValidation,
  MDBValidationItem,
  MDBTextArea,
  MDBInput,
  MDBBtn,
} from "mdb-react-ui-kit";
import { useNavigate, useParams } from "react-router-dom";
//av33bw3b

const initialState = {
  title: "",
  description: "",
  category: "",
  imageUrl: "",
  author: "",
};

const options = ["Travel", "Fashion", "Fitness", "Sports", "Food", "Tech"];

export default function AddEditeBlog() {
  const [formValue, setFormValue] = useState(initialState);
  const [categoryErrMsg, setCategoryErrMsg] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const { author, title, description, category, imageUrl } = formValue;

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setEditMode(true);
      getSingleBlog(id);
    } else {
      setEditMode(false);
      setFormValue({ ...initialState });
    }
  }, [id]);

  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(
      `https://booky-3yva.onrender.com/blogs/${id}`
    );
    if (singleBlog.status === 200) {
      setFormValue({ ...singleBlog.data });
    } else {
      toast.error("Somthig went wrong");
    }
  };

  const getDate = () => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;
    return today;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!category) {
      setCategoryErrMsg("please slect a category");
    }

    const imageValidation = !editMode ? imageUrl : true;
    if (title && description && imageUrl && category && author) {
      const currentDate = getDate();
      //not in editMode
      if (!editMode) {
        const updateBlogData = { ...formValue, date: currentDate };
        const response = await axios.post(
          "https://booky-3yva.onrender.com/blogs",
          updateBlogData
        );
        if (response.status === 201) {
          toast.success("blog created successfully");
        } else {
          toast.error("Somthig went wrong");
        }
      } else {
        // in editMode
        const response = await axios.put(
          `https://booky-3yva.onrender.com/blogs/${id}`,
          formValue
        );
        if (response.status === 200) {
          toast.success("blog Updated successfully");
        } else {
          toast.error("Somthig went wrong");
        }
      }
      setFormValue({
        title: "",
        description: "",
        imageUrl: "",
        category: "",
        author: "",
      });
      navigate("/");
    }
  };

  const onInputChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };

  const onUploadImage = async (files) => {
    const formData = new FormData();
    formData.append("file", files);
    formData.append("upload_preset", "mhcwsdi5");

    const data = await fetch(
      "https://api.cloudinary.com/v1_1/amradham/image/upload",
      {
        method: "POST",
        body: formData,
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        toast.error("somthig went wrong");
      })
      .then((res) => {
        console.log(res.secure_url);

        toast.info("Image Upload Successfully");
        setFormValue({ ...formValue, imageUrl: res.secure_url });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onCategoryChange = (e) => {
    setCategoryErrMsg(null);
    setFormValue({ ...formValue, category: e.target.value });
  };

  return (
    <MDBValidation
      className="row g-3"
      style={{
        marginTop: "100px",
        textAlign: "center",
        bsGutterX: "0rem !important",
      }}
      noValidate
      onSubmit={handleSubmit}
    >
      <p className="fs-2 fw-bold">{editMode ? "Update Blog" : "Add Blog"}</p>

      <div
        style={{
          margin: "auto",
          padding: "15px",
          maxWidth: "400px",
          alignContent: "center",
        }}
      >
        <MDBValidationItem
          feedback="Please provide a author."
          invalid
          className="col-md-12"
        >
          <MDBInput
            value={author || ""}
            name="author"
            type="text"
            onChange={onInputChange}
            required
            label="Author"
          />
        </MDBValidationItem>
        <br />

        <MDBValidationItem
          feedback="Please provide a title."
          invalid
          className="col-md-12"
        >
          <MDBInput
            value={title || ""}
            name="title"
            type="text"
            onChange={onInputChange}
            required
            label="Title"
          />
        </MDBValidationItem>
        <br />
        <MDBValidationItem
          feedback="Please provide a description."
          invalid
          className="col-md-12"
        >
          <MDBTextArea
            value={description || ""}
            name="description"
            label="description"
            id="validationTextarea"
            onChange={onInputChange}
            row={4}
            required
          />
        </MDBValidationItem>
        <br />
        {!editMode && (
          <>
            <MDBValidationItem
              feedback="Please provide a file."
              invalid
              className="col-md-12"
            >
              <MDBInput
                type="file"
                onChange={(e) => onUploadImage(e.target.files[0])}
                required
              />
            </MDBValidationItem>
          </>
        )}

        <br />

        <select
          className="categoryDropdown"
          onChange={onCategoryChange}
          value={category}
          style={categoryErrMsg && { borderColor: "#dc3545" }}
        >
          <option>Please select category</option>
          {options.map((option, index) => (
            <option value={option || ""} key={index}>
              {option}
            </option>
          ))}
        </select>
        {categoryErrMsg && (
          <div className="categoryErrormsg">{categoryErrMsg}</div>
        )}
        <br />
        <br />
        <MDBBtn type="subnit" style={{ marginRight: "10px" }}>
          {editMode ? "Update" : "Add"}
        </MDBBtn>
        <MDBBtn
          color="danger"
          style={{ marginRight: "10px" }}
          onClick={() => navigate("/")}
        >
          Go Back
        </MDBBtn>
      </div>
    </MDBValidation>
  );
}
