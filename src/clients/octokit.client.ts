import { Octokit } from "octokit";
import { octokitConfig } from "../configs/index.js";
import httpStatus from "http-status";
import createError from "http-errors";

export class OctokitClient {
  private static instance: OctokitClient;
  private octokit: Octokit;

  private constructor() {
    this.octokit = new Octokit(octokitConfig);
  }

  public static getInstance(): OctokitClient {
    if (!OctokitClient.instance) {
      OctokitClient.instance = new OctokitClient();
    }
    return OctokitClient.instance;
  }

  public getOctokit(): Octokit {
    return this.octokit;
  }

  private handleError(error: any) {
    if (error.response) {
      throw createError(
        httpStatus.BAD_GATEWAY,
        "Invalid response from upstream service"
      );
    } else if (error.code === "ECONNREFUSED") {
      throw createError(
        httpStatus.SERVICE_UNAVAILABLE,
        "Service is temporarily unavailable. Please try again later"
      );
    } else if (error.code === "ETIMEDOUT") {
      throw createError(
        httpStatus.GATEWAY_TIMEOUT,
        "The request to the upstream service timed out"
      );
    } else {
      throw createError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "An unexpected error occurred"
      );
    }
  }

  public async searchUsers(
    q: string,
    sort?: string,
    order?: string,
    per_page?: number,
    page?: number
  ) {
    try {
      return await this.octokit.request("GET /search/users", {
        q,
        ...(sort && { sort }),
        ...(order && { order }),
        ...(per_page && { per_page }),
        ...(page && { page }),
      });
    } catch (error: any) {
      this.handleError(error);
    }
  }

  public async getUserRepositories(
    username: string,
    sort: string = "updated",
    per_page: number = 5
  ) {
    try {
      return await this.octokit.request("GET /users/{username}/repos", {
        username,
        sort,
        per_page,
      });
    } catch (error: any) {
      this.handleError(error);
    }
  }
}
