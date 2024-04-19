import { useSelector } from "react-redux";
import { getIsLoadingRepoData, getStars, getUrl } from "./issuesSlice";
import { getUrlDetails, getUserUrl } from "../../utils/urlHelpers";
import { convertStars } from "../../utils/numberHelpers";
import { Spinner } from "react-bootstrap";

function RepoLinks() {
  // Get 'successful' url, extract data and use it to set up links
  const url = useSelector(getUrl);
  const stars = useSelector(getStars);
  const isLoading = useSelector(getIsLoadingRepoData);
  const { user, repo } = getUrlDetails(url);

  const isLoaded = Boolean(url);

  return (
    <>
      {isLoaded ? (
        <div className="d-flex gap-5 align-items-center mt-3 mb-5">
          <div className="d-flex gap-2 mx-2">
            <a
              href={getUserUrl(url)}
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none text-capitalize"
            >
              {user}
            </a>
            <span>&gt;</span>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="text-decoration-none text-capitalize"
            >
              {repo}
            </a>
          </div>

          <span>⭐ {convertStars(stars)} Stars</span>
        </div>
      ) : isLoading ? (
        <Spinner className="mt-3 ms-5" />
      ) : (
        <p className="mt-3 mb-5">Please load some data :)</p>
      )}
    </>
  );
}

export default RepoLinks;
