import React from "react";
import PropTypes from "prop-types";
import File from "../file";

const FileList = props => {
  const numDocuments = (props.files && props.files.length) || 0;

  return (
    <div>
      <h3>{numDocuments} documents</h3>
      {props.files &&
        props.files.map((file, i) => {
          return (
            <File
              name={file.name}
              size={file.size}
              key={file.id}
              id={file.id}
              onFileDelete={props.onFileDelete}
            />
          );
        })}
      ok<p>ok</p>
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
