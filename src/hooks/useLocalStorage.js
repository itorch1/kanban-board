import { useEffect } from "react";
import { useSelector } from "react-redux";
import { getUrl } from "../features/issues/issuesSlice";

export function useLocalStorage(todos, assigned, closed) {
  const url = useSelector(getUrl);

  // Save to local storage whenever data changes
  useEffect(() => {
    const data = { todos, assigned, closed };
    localStorage.setItem(url, JSON.stringify(data));
  }, [todos, assigned, closed, url]);
}
