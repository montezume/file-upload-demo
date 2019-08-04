import React from "react";
import PropTypes from "prop-types";
import FileUploadInput from "../file-upload-input";
import { useStateValue } from "../../state";
import { processFileAndGetMimetype } from "../../utils/file";

const supportedFormats = ["image/jpeg", "image/png"];

// pretty simple validation that would need to be duplicated on the server
const validate = file => {
  const errors = {};

  if (bytesToMb(file.size) > 10) {
    errors.size = true;
  }

  if (!supportedFormats.includes(file.mimetype)) {
    errors.format = true;
  }

  return errors;
};

const bytesToMb = bytes => {
  return bytes / Math.pow(1024, 2);
};

const FileUpload = props => {
  const { onFileSelected, onError } = props;
  const [value, setValue] = React.useState("");

  const onChange = React.useCallback(
    async event => {
      setValue(event.target.value);
      const newFile = event.target.files[0];
      const mimetype = await processFileAndGetMimetype(newFile);

      const errors = validate({
        name: newFile.name,
        size: newFile.size,
        mimetype,
      });

      if (Object.keys(errors).length > 0) {
        onError(errors);
      } else {
        const file = {
          name: newFile.name,
          size: newFile.size,
          type: newFile.type,
          blob: URL.createObjectURL(newFile),
        };

        if (onFileSelected) onFileSelected(file);
        setValue("");
      }
    },
    [onError, onFileSelected],
  );

  return (
    <FileUploadInput
      type="file"
      name="file"
      id="file"
      value={value}
      onChange={onChange}
    />
  );
};

FileUpload.propTypes = {
  onFileSelected: PropTypes.func,
  onError: PropTypes.func,
};

export default FileUpload;
