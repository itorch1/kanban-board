import { getUrlDetails } from "../utils/urlHelpers";

export async function getIssues(url) {
  // Check if url is valid
  const regex = /^https:\/\/github\.com\/[a-zA-Z0-9_.-]+\/[a-zA-Z0-9_.-]+$/;
  if (!url.match(regex))
    throw new Error(
      "Invalid URL. Please match the following format: \n'https://github.com/USER/REPO'"
    );

  // Prepare request URL and headers
  const { user, repo } = getUrlDetails(url);
  const requestUrl = `https://api.github.com/repos/${user}/${repo}/issues?state=all`;
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  // Send GET request
  try {
    const res = await fetch(requestUrl, headers);
    if (!res.ok) throw new Error("Failed to fetch issues");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}

export async function getRepoStars(url) {
  // https://api.github.com/repos/reactjs/react.dev
  const { user, repo } = getUrlDetails(url);
  const requestUrl = `https://api.github.com/repos/${user}/${repo}`;
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    const res = await fetch(requestUrl, headers);
    if (!res.ok) throw new Error("Failed to fetch repo data");
    const data = await res.json();
    return data.stargazers_count;
  } catch (err) {
    console.error(err);
    throw new Error(err);
  }
}
