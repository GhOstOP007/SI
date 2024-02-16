import imageModel from "../models/imageModel.js";
import fs from "fs";

export const createPhoto = async (req, res) => {
  try {
    const { photo } = req.files;

    if (!photo && photo.size < 1000000) {
      return res
        .status(500)
        .send({ error: "Photo is required & should be less than 1 MB" });
    }

    const image = new imageModel(photo);

    if (photo) {
      image.photo.data = fs.readFileSync(photo.path);
      image.photo.contentType = photo.type;
    }

    await image.save();

    res.status(201).send({
      success: true,
      message: "Image Uploaded Successfully",
      image,
    });
  } catch (error) {
    console.log(error);
    res.send(500).send({
      success: false,
      error,
      message: "Error in uploading image",
    });
  }
};

export const getAllImageController = async (req, res) => {
  try {
    const Img = await imageModel.find({}).limit(10).sort({ createdAt: -1 });
    res.status(200).send({
      count: Img.length,
      success: true,
      message: "All images",
      Img,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sucess: false,
      error: error.message,
      message: "Error in getting books",
    });
  }
};

export const getImagePhotoController = async (req, res) => {
  try {
    const Img = await imageModel.findById(req.params.pid);
    if (Img.photo.data) {
      res.set("Content-type", Img.photo.contentType);
      return res.status(200).send(Img.photo.data);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while getting image",
      error,
    });
  }
};

export const deleteImgController = async (req, res) => {
  try {
    await imageModel.findByIdAndDelete(req.params.pid);
    res.status(200).send({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      sucess: false,
      error: error.message,
      message: "Error in deleting image",
    });
  }
};
