import React from "react";
import PropTypes from "prop-types";
import SearchInput from "../search-input";
import useDebounce from "./use-debounce";

// const fakeApi = searchTerm =>
//   new Promise(resolve => setTimeout(() => resolve(searchTerm), 500));

const Search = props => {
  const { onDebouncedValueChange } = props;
  const [value, setValue] = React.useState("");
  const debouncedValue = useDebounce(value, 500);

  React.useEffect(
    () => {
      if (debouncedValue) {
        if (onDebouncedValueChange) onDebouncedValueChange(debouncedValue);
      }
    },
    [debouncedValue, onDebouncedValueChange],
  );

  const handleChange = React.useCallback(
    event => {
      setValue(event.target.value);
    },
    [setValue],
  );

  return (
    <SearchInput
      placeholder="Search documents"
      onChange={handleChange}
      value={value}
    />
  );
};

Search.propTypes = {
  onDebouncedValueChange: PropTypes.func,
};

export default Search;
