import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  return [storedValue, setValue];
}

export function usePersistentFetch(url) {
  const [data, setData] = useLocalStorage(url, null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUrl() {
      if (data) {
        setData(data);
        setLoading(false);
      } else {
        const response = await fetch(url);
        const json = await response.json();

        setData(json);
        setLoading(false);
      }
    }

    fetchUrl();
  }, [url, data, setData]);

  return [data, loading];
}
