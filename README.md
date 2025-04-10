# GitHub User Search API

A RESTful API service that provides a proxy to search GitHub users with additional filtering and sorting capabilities.

## Features

- Search GitHub users by username, email, or other criteria
- Sort results by followers, repositories, or join date
- Order results in ascending or descending order
- Pagination support with customizable page size (1-100 items per page)
- CORS enabled for cross-origin requests
- Error handling middleware for consistent error responses
- Input validation using Zod schema validation
- Environment variables configuration

## Tech Stack

- Node.js
- Express.js
- [Zod](https://zod.dev/)
- [Oktokit.js](https://www.npmjs.com/package/octokit)

## API Endpoints

### Health Check

`GET /health`

Returns a simple "OK" response to verify the API is running.

Response:

```json
{
  "status": "OK"
}
```

### Search Users

`GET /users`

Searches for GitHub users based on the provided query parameters.

Query Parameters:

- `q`: The search query (required)
- `sort`: The field to sort the results by (optional, default: "bestmatch")
- `order`: The order to sort the results in (optional, default: "desc")
- `page`: The page number to return (optional, default: 1)
- `per_page`: The number of items per page (optional, default: 10)

Response:

```json
{
  "items": [
    {
      "login": "octocat",
      "id": 1,
      "node_id": "MDQ6VXNlcjE=",
      "avatar_url": "https://github.com/images/error/octocat_happy.gif",
      "gravatar_id": "",
      "url": "https://api.github.com/users/octocat",
      "html_url": "https://github.com/octocat",
      "followers_url": "https://api.github.com/users/octocat/followers",
      "following_url": "https://api.github.com/users/octocat/following{/other_user}",
      "gists_url": "https://api.github.com/users/octocat/gists{/gist_id}",
      "starred_url": "https://api.github.com/users/octocat/starred{/owner}{/repo}",
      "subscriptions_url": "https://api.github.com/users/octocat/subscriptions",
      "organizations_url": "https://api.github.com/users/octocat/orgs",
      "repos_url": "https://api.github.com/users/octocat/repos",
      "events_url": "https://api.github.com/users/octocat/events{/privacy}",
      "received_events_url": "https://api.github.com/users/octocat/received_events",
      "type": "User",
      "site_admin": false,
      "score": 1.0,
      "recent_repositories": []
    }
  ],
  "total_count": 1,
  "incomplete_results": false
}
```

## Prerequisites

- Node.js (v18 or higher)
- npm or Yarn

  OR

- Docker (v20 or higher)
- Docker Compose (v2.0 or higher)

## Setup

1. Clone the repository

```bash
git clone https://github.com/secret-glimmer/github-proxy.git
cd github-proxy
```

2. Install dependencies

```bash
yarn install
```

3. Build the server

```bash
yarn build
```

4. Start the server

```bash
yarn start
```

5. Use the API

```bash
curl "http://localhost:3000/users?q=octocat"
```

## Run the app with docker

```bash
docker compose up
```
