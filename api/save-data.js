const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const outputPath = path.join(process.cwd(), "output.json");

  const newData = req.body;
  fs.readFile(outputPath, (err, data) => {
    if (err && err.code !== "ENOENT") {
      return res.status(500).json({ message: "Failed to read data" });
    }

    let fileData = [];
    if (data.length > 0) {
      try {
        fileData = JSON.parse(data);
      } catch (parseError) {
        return res.status(500).json({ message: "Error parsing JSON data" });
      }
    }

    fileData.push(newData);
    fs.writeFile(
      outputPath,
      JSON.stringify(fileData, null, 2),
      (writeError) => {
        if (writeError) {
          return res.status(500).json({ message: "Failed to save data" });
        }
        res.json({ message: "Data saved successfully" });
      }
    );
  });
};
