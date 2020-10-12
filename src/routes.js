import pkg from "express";
import { login, register } from "./services/users.js";

const { Router } = pkg;
const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
