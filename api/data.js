const fs = require("fs");
const path = require("path");

module.exports = (req, res) => {
  const outputPath = path.join(process.cwd(), "output.json"); // Ensure this path is correct

  fs.readFile(outputPath, "utf8", (err, data) => {
    if (err) {
      console.error("Failed to read file:", err);
      return res.status(500).json({ message: "Failed to load data" });
    }

    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      res.status(500).json({ message: "Error parsing JSON data" });
    }
  });
};
