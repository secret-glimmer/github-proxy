import dotenv from "dotenv";

dotenv.config();

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

export const octokitConfig = {
  auth: GITHUB_TOKEN,
};
