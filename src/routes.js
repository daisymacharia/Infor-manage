import pkg from "express";
import { login, register } from "./services/users.js";

const { Router } = pkg;
const router = Router();

router.post("/register", register);
router.get("/login", login);

export default router;
