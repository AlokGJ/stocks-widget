import { Dropdown } from "semantic-ui-react";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "react-query";
import _ from "lodash";

const searchQueryFetcher = async (query) => {
  return await fetch(
    `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=37U54N5NZNKPRVZG`
    // `https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=demo`
  ).then((response) => response.json());
};

const SearchWidget = ({ onSearch, symbols }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState([]);

  const { data, refetch, isFetching } = useQuery(
    ["search", searchQuery],
    () => searchQueryFetcher(searchQuery),
    {
      refetchOnWindowFocus: false
      // enabled: false
    }
  );

  const handleSearchChange = useCallback(async (e, data) => {
    setSearchQuery(() => data.searchQuery);
  }, []);

  const handleChange = useCallback(
    async (e, data) => {
      setSearchQuery(() => "");
      onSearch(() => data.value);
    },
    [onSearch]
  );

  const handleAddition = useCallback((e, { value }) => {
    setSearchOptions((options) => [
      ...options,
      { text: value, key: value, value }
    ]);
  }, []);

  useEffect(() => {
    _.debounce(refetch, 500, { leading: true });
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
