import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";

const Wrapper = styled.div`
  border: 1px solid black;
  padding: 4px 8px;
`;

const File = props => {
  const { id, onFileDelete } = props;

  const handleDelete = React.useCallback(
    () => {
      onFileDelete(id);
    },
    [id, onFileDelete],
  );

  return (
    <Wrapper>
      <p>{props.name}</p>
      <p>{props.size}</p>
      <button onClick={handleDelete}>Delete</button>
    </Wrapper>
  );
};

File.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default File;
