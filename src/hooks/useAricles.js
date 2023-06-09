import { useState, useEffect } from "react";
import { axiosReq } from "../api/axiosDefaults";
import { CanceledError } from "axios";
import { useArticleFollow } from "../contexts/ArticleFollowUpdate";
import { useCurrentUser } from "../contexts/CurrentUserContext";

const useArticles = (endpoint) => {
  const [articles, setArticles] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const articleFollow = useArticleFollow();
  const currentUser = useCurrentUser();

  useEffect(() => {
    const controller = new AbortController();

    const getArticles = async () => {
      try {
        const { data } = await axiosReq.get(endpoint, {
          signal: controller.signal,
        });
        setArticles(data);
        setLoaded(true);
      } catch (err) {
        if (err instanceof CanceledError) return;
        setError(err.message);
        setLoaded(true);
      }
    };

    setLoaded(false);
    getArticles();

    return () => controller.abort();
  }, [endpoint, articleFollow, currentUser]);

  return { articles, setArticles, error, loaded };
};

export default useArticles;
