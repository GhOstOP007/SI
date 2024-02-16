import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { requireSignIn } from "../middlewares/authMiddleware.js";
//router objects
const router = express.Router();

//routing

//REGISTER || POST
router.post("/register", registerController);

//LOGIN || POST
router.post("/login", loginController);

//testroutes

router.get("/test", requireSignIn, testController);

//protedctd routes
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});

export default router;
