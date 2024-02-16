import express from "express";
import { requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createPhoto,
  getImagePhotoController,
  deleteImgController,
  getAllImageController,
} from "../controllers/photoController.js";
import formidable from "express-formidable";

const router = express.Router();

//routes

//createimage
router.post("/create-image", requireSignIn, formidable(), createPhoto);

//get all photo
router.get("/all-img", getAllImageController);
//get photo
router.get("/img-photo/:pid", getImagePhotoController);

//delete photo
router.delete("/del-photo/:pid", deleteImgController);

export default router;
