import { useEffect } from "react";
import { useState } from "react";
import Api from "./../service/config";

const useFetch = (url, query = "") => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    const FetchData = async () => {
      try {
        setIsLoading(true);
        const { data } = await Api.get(`${url}?${query}`);
        setData(data);
      } catch (err) {
        setData([]);
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };
    FetchData();
  }, [url, query]);

  return { isLoading, data };
};

export default useFetch;
