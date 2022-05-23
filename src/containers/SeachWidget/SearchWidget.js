import { Search } from "semantic-ui-react";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import _ from "lodash";

import "./search-widget.css";

const searchQueryFetcher = async (query) => {
  return await fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=37U54N5NZNKPRVZG`
    // `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=demo`
  ).then((response) => response.json());
};

const SearchWidget = ({ onSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);

  const { data, isFetching } = useQuery(
    ["search", searchQuery],
    () => searchQueryFetcher(searchQuery),
    {
      refetchOnWindowFocus: false,
      enabled: !!searchQuery
    }
  );

  const handleSearchChange = useCallback(async (e, data) => {
    setSearchQuery(() => data.value);
  }, []);

  const handleChange = useCallback(
    (e, data) => {
      setSearchQuery(() => "");
      console.log(data);
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
  return (
    <Search
      placeholder="Stock search..."
      fluid
      input={{ icon: "search", iconPosition: "left" }}
      loading={isFetching}
      onResultSelect={handleChange}
      onSearchChange={_.debounce(handleSearchChange, 500)}
      results={searchOptions}
    />
  );
};

export default SearchWidget;
