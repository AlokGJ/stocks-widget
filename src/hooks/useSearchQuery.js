import { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import { searchQueryFetcher } from "../api";

export const useSearchQuery = (onSearch) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);

  const { data, isFetching } = useQuery(
    ["search", searchQuery],
    () => searchQueryFetcher(searchQuery),
    {
      refetchOnWindowFocus: false,
      enabled: !!searchQuery,
      onError(error) {
        console.error(error);
      }
    }
  );

  const handleSearchChange = useCallback((e, data) => {
    setSearchQuery(() => data.value);
  }, []);

  const handleChange = useCallback(
    (e, data) => {
      setSearchQuery(() => "");
      onSearch(data.result.title);
    },
    [onSearch]
  );

  useEffect(() => {
    if (data && data.bestMatches?.length) {
      setSearchOptions(() =>
        data.bestMatches.map(({ "1. symbol": symbol }) => ({
          title: symbol
        }))
      );
    }
  }, [data]);

  return {
    searchOptions,
    isFetching,
    handleSearchChange,
    handleChange
  };
};
