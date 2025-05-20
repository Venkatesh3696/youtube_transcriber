import fs from "fs";

export const saveToFile = (path, data) => {
  fs.writeFileSync(path, data);
};

export const readFromFile = (path) => {
  return fs.readFileSync(path, "utf8");
};
