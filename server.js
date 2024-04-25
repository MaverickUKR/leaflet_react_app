const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(
  "/data",
  express.static(
    "E:\\Проекти на React\\Luxe Quality (тестове)\\leaflet_react\\leaflet_react_app"
  )
);
app.use(bodyParser.json());

const filePath = path.join(__dirname, "output.json");

app.post("/save-data", (req, res) => {
  const newData = req.body;

  fs.readFile(filePath, (err, data) => {
    if (err && err.code !== "ENOENT") {
      return res.status(500).send({ message: "Failed to read data" });
    }

    let fileData = [];
    if (data.length > 0) {
      try {
        fileData = JSON.parse(data);
      } catch (parseError) {
        return res.status(500).send({ message: "Error parsing JSON data" });
      }
    }

    fileData.push(newData);
    e;
    fs.writeFile(filePath, JSON.stringify(fileData, null, 2), (writeError) => {
      if (writeError) {
        return res.status(500).send({ message: "Failed to save data" });
      }
      res.send({ message: "Data saved successfully" });
    });
  });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
