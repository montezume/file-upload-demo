import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { formatBytes } from "../../utils/file";

const Button = styled.button`
  border: 1px solid ${props => props.theme.colorSolid};
  color: ${props => props.theme.colorSolid};
  padding: ${props => props.theme.spacingXs} ${props => props.theme.spacingS};
  font-size: 1rem;
  cursor: pointer;
`;

const Wrapper = styled.div`
  border: 1px solid ${props => props.theme.colorSolid};
  padding: ${props => props.theme.spacingXs} ${props => props.theme.spacingS};
  margin: 4 ${props => props.theme.spacingXs} 0;
  display: flex;

  @media (min-width: ${props => props.theme.breakpointDesktop}) {
    margin: ${props => props.theme.spacingXs} ${props => props.theme.spacingXs};
  }
`;

const ButtonContainer = styled.div`
  margin-top: auto;
`;

const BodyContainer = styled.div`
  flex: 1;
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
      <BodyContainer>
        <p>{props.name}</p>
        <p>{formatBytes(props.size)}</p>
      </BodyContainer>
      <ButtonContainer>
        <Button onClick={handleDelete}>Delete</Button>
      </ButtonContainer>
    </Wrapper>
  );
};

File.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
};

export default File;
