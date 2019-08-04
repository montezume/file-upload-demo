import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import Loader from "../loader";
import { useStateValue } from "../../state";
import File from "../file";

const FileContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Item = styled.div`
  width: 100%;

  @media (min-width: ${props => props.theme.breakpointDesktop}) {
    width: 33.33%;
  }
`;

const FileList = props => {
  const [{ files, isLoading }] = useStateValue();
  const numDocuments = files.length || 0;

  if (isLoading) return <Loader />;

  return (
    <div>
      <h3>{numDocuments} documents</h3>
      <FileContainer>
        {files &&
          files.map((file, i) => {
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
