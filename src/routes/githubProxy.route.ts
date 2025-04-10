import { Router } from "express";
import { GithubProxyController } from "../controllers/index.js";
import { validateQuery, searchUsersSchema } from "../validations/index.js";

const githubProxyController = new GithubProxyController();

export const githubProxyRouter = Router();

githubProxyRouter.get(
  "/search/users",
  validateQuery(searchUsersSchema),
  githubProxyController.searchUsers
);
