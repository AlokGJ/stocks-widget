import { Search } from "semantic-ui-react";
import _ from "lodash";
import { useSearchQuery } from "../../hooks/useSearchQuery";
import "./search-widget.css";

const SearchWidget = ({ onSearch }) => {
  const {
    searchOptions,
    isFetching,
    handleChange,
    handleSearchChange
  } = useSearchQuery(onSearch);

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
