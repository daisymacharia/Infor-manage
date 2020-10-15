import pkg from "express";
import { login, register, getUser, signout } from "./services/users.js";

const { Router } = pkg;
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", getUser);
router.get("/logout", signout);

export default router;
