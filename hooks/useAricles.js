import { useState, useEffect } from "react";
import { axiosReq } from "../src/api/axiosDefaults";
import { CanceledError } from "axios";

const useArticles = (endpoint) => {
  const [articles, setArticles] = useState({ results: [] });
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

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

    getArticles();

    return () => controller.abort();
  }, [endpoint]);

  return { articles, setArticles, error, loaded };
};

export default useArticles;