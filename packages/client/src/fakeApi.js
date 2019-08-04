const createFileFactory = () => {
  let id = 1;
  return file => ({
    id: id++,
    ...file,
  });
};

let files = [];

const createFile = createFileFactory();

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

export const remove = async id => {
  await timeout(500);
  files = files.filter(file => file.id !== id);
  return;
};

export const create = async data => {
  await timeout(600);
  console.log("here");
  const file = createFile(data);
  console.log("here", file);
  files = files.concat(file);
  return file;
};

export const list = async searchTerm => {
  await timeout(1000);

  if (searchTerm) {
    return files.filter(file =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }
  return files;
};
