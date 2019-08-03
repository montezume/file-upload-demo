import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  width: 100%;
  border: 1px solid black;
  padding: 4px 8px;
`;

const File = props => {
  return (
    <Wrapper>
      <p>{props.name}</p>
      <p>{props.size}</p>
      <button>Delete</button>
    </Wrapper>
  );
};

File.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
};

export default File;
