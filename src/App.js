import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import BlogDetails from "./pages/BlogDetails/BlogDetails";
import AddEditeBlog from "./pages/AddEditeBlog/AddEditeBlog";
import NotFound from "./pages/NotFound/NotFound";
import React from "react";

import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { BlogContextProvider } from "./components/BlogContext/BlogContext";

function App() {
  return (
    <div className="App">
      <NavBar />
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Home context={BlogContextProvider} />} />
        <Route path="/addblog" element={<AddEditeBlog />} />
        <Route path="/editblog/:id" element={<AddEditeBlog />} />
        <Route
          path="/blogdetails/:id"
          element={<BlogDetails context={BlogContextProvider} />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
