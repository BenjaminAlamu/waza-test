const fs = require("fs");

function writeToFile(fileName, data) {
  fs.writeFileSync(
    `./db/${fileName}.db.json`,
    JSON.stringify([...data]),
    (error) => {
      if (error) {
        throw error;
      }

      console.log("Data written correctly");
    }
  );
}

function readFile(fileName) {
  try {
    var data = fs.readFileSync(`./db/${fileName}.db.json`, "utf8");
    return JSON.parse(data);
  } catch (e) {
    console.log({ e });
  }
}

module.exports = {
  writeToFile,
  readFile,
};
