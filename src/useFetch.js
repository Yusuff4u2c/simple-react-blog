import { useEffect, useState } from "react";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [isError, setIsError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    setTimeout(() => {
      fetch(url, { signal: abortCont.signal })
        .then((res) => {
          if (!res.ok) {
            throw new Error("Could not fetch the resourse");
          }
          console.log(res);
          return res.json();
        })
        .then((data) => {
          setData(data);
          setIsPending(false);
          setIsError(null);
        })
        .catch((err) => {
          if (err === "AbortError") {
            console.log("aborted");
          } else {
            setIsPending(false);
            setIsError(err.message);
          }
        });
    }, 1000);
    return () => {
      abortCont.abort();
    };
  }, [url]);
  return { data, isPending, isError };
};
export default useFetch;
