import { Dropdown } from "semantic-ui-react";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";

const searchQueryFetcher = async (query) => {
  return await fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=37U54N5NZNKPRVZG`
  ).then((response) => response.json());
};

const SearchWidget = ({ onSearch, symbols }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);
  // const [value, setValue] = useState([]);
  const { data, refetch, isFetching } = useQuery(
    ["search", searchQuery],
    () => searchQueryFetcher(searchQuery),
    {
      refetchOnWindowFocus: false,
      enabled: false
    }
  );

  const handleSearchChange = useCallback(async (e, data) => {
    setSearchQuery(() => data.searchQuery);
  }, []);

  const handleChange = useCallback(
    async (e, data) => {
      setSearchQuery(() => data.searchQuery);
      onSearch(() => data.value);
    },
    [onSearch]
  );

  const handleAddition = useCallback((e, { value }) => {
    setSearchOptions((options) => [
      { text: value, key: value, value },
      ...options
    ]);
  }, []);

  useEffect(() => {
    refetch();
  }, [searchQuery, refetch]);

  useEffect(() => {
    if (data && data.bestMatches?.length) {
      setSearchOptions(() =>
        data.bestMatches.map(({ "1. symbol": symbol }) => ({
          key: symbol,
          text: symbol,
          value: symbol
        }))
      );
    }
  }, [data]);
  return (
    <Dropdown
      lazyLoad
      placeholder="Stock search..."
      fluid
      multiple
      searchQuery={searchQuery}
      search
      selection
      options={searchOptions}
      icon="search"
      loading={isFetching}
      onChange={handleChange}
      onSearchChange={handleSearchChange}
      value={symbols}
      allowAdditions
      onAddItem={handleAddition}
    />
  );
};

export default SearchWidget;
