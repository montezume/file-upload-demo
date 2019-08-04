import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import File from "../file";

const FileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  width: 100%;
  @media (min-width: ${props => props.theme.breakpointDesktop}) {
    width: 33%;
  }
`;

const FileList = props => {
  const numDocuments = (props.files && props.files.length) || 0;

  return (
    <div>
      <h3>{numDocuments} documents</h3>
      <FileContainer>
        {props.files &&
          props.files.map((file, i) => {
            return (
              <Item key={file.id}>
                <File
                  name={file.name}
                  size={file.size}
                  id={file.id}
                  onFileDelete={props.onFileDelete}
                />
              </Item>
            );
          })}
      </FileContainer>
    </div>
  );
};

FileList.propTypes = {
  files: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
    }),
  ),
  onDelete: PropTypes.func,
};

export default FileList;
