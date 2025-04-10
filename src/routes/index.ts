import express from "express";
import { githubProxyRouter } from "./githubProxy.route.js";

const router = express.Router();

router.use("/github", githubProxyRouter);

export default router;
