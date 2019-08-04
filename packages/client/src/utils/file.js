const getMimetype = signature => {
  switch (signature) {
    case "89504E47":
      return "image/png";
    case "FFD8FFDB":
    case "FFD8FFE0":
    case "FFD8FFE1":
      return "image/jpeg";
    default:
      return "Unknown filetype";
  }
};

const readFileAsync = file =>
  new Promise((resolve, reject) => {
    let reader = new FileReader();

    reader.onload = e => {
      resolve(reader.result);
    };

    reader.onerror = reject;

    reader.readAsArrayBuffer(file);
  });

// from https://stackoverflow.com/questions/15900485/correct-way-to-convert-size-in-bytes-to-kb-mb-gb-in-javascript
export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
};

export const processFileAndGetMimetype = async file => {
  const buffer = await readFileAsync(file);
  const uint = new Uint8Array(buffer);
  let bytes = [];
  uint.forEach(byte => {
    bytes.push(byte.toString(16));
  });
  const hex = bytes.join("").toUpperCase();
  const first8Bytes = hex.slice(0, 8);

  return getMimetype(first8Bytes);
};
