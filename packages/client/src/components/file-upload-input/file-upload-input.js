import React from "react";
import styled from "@emotion/styled";

const StyledInput = styled.input`
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;

  &:focus + label,
  &:focus + label {
    background: ${props => props.theme.colorSolid};
    color: ${props => props.theme.colorSurface};
  }
`;

const Label = styled.label`
  border: 1px solid ${props => props.theme.colorSolid};
  padding: ${props => props.theme.spacingXs} ${props => props.theme.spacingS};
  display: block;
  border-radius: ${props => props.theme.borderRadius};
  text-align: center;
  cursor: pointer;

  &:hover {
    background: ${props => props.theme.colorSolid};
    color: ${props => props.theme.colorSurface};
  }
`;

const FileUploadInput = props => {
  return (
    <div>
      <StyledInput {...props} accept="image/x-png,image/jpeg" />
      <Label htmlFor={props.id}>Upload</Label>
    </div>
  );
};

export default FileUploadInput;
