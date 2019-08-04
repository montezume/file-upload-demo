import React from "react";
import styled from "@emotion/styled";

const StyledInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

const Label = styled.label`
  border: 1px solid black;
  padding: 4px 8px;
  display: block;
  border-radius: ${props => props.theme.borderRadius};
  text-align: center;
`;

const FileUploadInput = props => {
  return (
    <div>
      <Label htmlFor={props.id}>Upload</Label>
      <StyledInput {...props} accept="image/x-png,image/jpeg" />
    </div>
  );
};

export default FileUploadInput;
