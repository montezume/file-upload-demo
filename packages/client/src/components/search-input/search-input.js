import React from "react";
import styled from "@emotion/styled";

const Input = styled.input`
  padding: ${props => props.theme.spacingS} ${props => props.theme.spacingM};
  border-radius: ${props => props.theme.borderRadius};
  border: 1px solid ${props => props.theme.colorSolid};
  font-size: 1rem;
`;

const SearchInput = props => <Input {...props} data-testid="search-input" />;

SearchInput.isEmpty = value => !value || value.trim().length === 0;

export default SearchInput;
