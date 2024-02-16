import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import logo from "../upload.png";
import Navbar from "./Navbar";
import { useAuth } from "../context/auth.js";

const Homepage = () => {
  const [images, setImages] = useState([]);

  const [photo, setPhoto] = useState("");

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const imgData = new FormData();
      imgData.append("photo", photo);

      const { data } = axios.post("/api/v1/upload/create-image", imgData);

      if (data?.success) {
        toast.error(data?.message);
      } else {
        toast.success("Image Uploaded Successfully");
        console.log("Image Uploaded Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  };

  //getProduct
  const getAllImages = async () => {
    try {
      const { data } = await axios.get(`/api/v1/upload/all-img`);
      setImages(data.images);
    } catch (error) {
      console.log(error);
      toast.error("error in fetching");
    }
  };

  const [auth] = useAuth();

  useEffect(() => {
    getAllImages();
  }, []);

  return (
    <>
      <Navbar />
      <div className="upper-upload">
        <div className="upload">
          <div className="container">
            <label className="yo">
              <p>Click here to select image :</p>
              {photo ? photo.name : <img alt="logo" src={logo} />}
              <input
                type="file"
                name="photo"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files[0])}
                hidden
              />
            </label>
          </div>
          <div className="uploaded-img">
            {photo && (
              <div className="disp-img">
                <img
                  src={URL.createObjectURL(photo)}
                  alt="img_photo"
                  height={"400px"}
                  className="img"
                />
              </div>
            )}
          </div>
          <div className="">
            {!auth.user ? (
              <>
                <a className="btn lg" href="/login">
                  Login To Upload
                </a>
              </>
            ) : (
              <>
                <button className="btn" onClick={handleCreate}>
                  Upload
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="all-images">
        <h1 className="all-image-text">All Images in DataBase</h1>
        <div className="">
          {images?.map((p) => (
            <div className="image-card">
              <img
                src={`/api/v1/upload/img-photo/${p._id}`}
                class=""
                alt="Imae"
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
