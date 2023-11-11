import { useEffect } from "react";

const useFetchDel = (url) => {
  useEffect(() => {
    fetch(url, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to delete the mail from the server");
        }
      })
      .catch((error) => alert(error.message));
  }, [url]);
};

export default useFetchDel;
