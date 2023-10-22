import { useState } from "react";

const useHttp = (reuqestConfig, applyData) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (taskText) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(reuqestConfig.url, {
        method: reuqestConfig.method ? reuqestConfig.method : "GET",
        headers: reuqestConfig.headers ? reuqestConfig.headers : {},
        body: reuqestConfig.body ? JSON.stringify(reuqestConfig.body) : null,
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();

      applyData(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    sendRequest,
  };
};

export default useHttp;