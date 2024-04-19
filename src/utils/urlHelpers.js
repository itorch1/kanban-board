export function getUrlDetails(url) {
  const [, , , user, repo] = url.split("/");
  return { user, repo };
}

export function getUserUrl(url) {
  const index = url.lastIndexOf("/");
  const ownerUrl = url.substring(0, index);
  return ownerUrl;
}
