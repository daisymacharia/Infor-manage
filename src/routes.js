import pkg from "express";
import { login, register, getUser, signout } from "./services/users.js";

const { Router } = pkg;
const router = Router();

router.post("/api/register", register);
router.post("/api/login", login);
router.get("/api/user", getUser);
router.post("/api/logout", signout);

export default router;
