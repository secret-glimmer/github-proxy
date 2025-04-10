import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import { OctokitClient } from "../clients/index.js";
import { GithubUserSort } from "../types/index.js";
import { GithubUserOrder } from "../types/index.js";
import createHttpError from "http-errors";
export class GithubProxyController {
  public async searchUsers(req: Request, res: Response, next: NextFunction) {
    try {
      const { q, sort, order, per_page, page } = req.query;
      const octokit = OctokitClient.getInstance();

      const response = await octokit.searchUsers(
        q as string,
        sort as GithubUserSort,
        order as GithubUserOrder,
        parseInt(per_page as string),
        parseInt(page as string)
      );

      const enrichedUsers = await Promise.all(
        response.data.items.map(async (user) => {
          const reposResponse = await octokit.getUserRepositories(
            user.login,
            "updated",
            5
          );
          return {
            ...user,
            recent_repositories: reposResponse.data,
          };
        })
      );

      return res.status(httpStatus.OK).json({
        ...response.data,
        items: enrichedUsers,
      });
    } catch (error) {
      if (error instanceof createHttpError.HttpError) {
        return res.status(error.statusCode).json({
          message: error.message,
        });
      } else {
        next(error);
      }
    }
  }
}
