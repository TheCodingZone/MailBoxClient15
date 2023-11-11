import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to get fetch data from api!!");
        }
      })
      .then((data) => setData(data))
      .catch((error) => alert(error.message));
  }, [url]);

  return [data];
};
