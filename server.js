// const express = require("express");
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const fs = require("fs");
// const path = require("path");

// const app = express();
// app.use(cors());
// app.use(
//   "/data",
//   express.static(
//     "E:\\Проекти на React\\Luxe Quality (тестове)\\leaflet_react\\leaflet_react_app"
//   )
// );
// app.use(bodyParser.json());

// const filePath = path.join(__dirname, "output.json");

// app.post("/save-data", (req, res) => {
//   const newData = req.body;

//   fs.readFile(filePath, (err, data) => {
//     if (err && err.code !== "ENOENT") {
//       return res.status(500).send({ message: "Failed to read data" });
//     }

//     let fileData = [];
//     if (data.length > 0) {
//       try {
//         fileData = JSON.parse(data);
//       } catch (parseError) {
//         return res.status(500).send({ message: "Error parsing JSON data" });
//       }
//     }

//     fileData.push(newData);
//     fs.writeFile(filePath, JSON.stringify(fileData, null, 2), (writeError) => {
//       if (writeError) {
//         return res.status(500).send({ message: "Failed to save data" });
//       }
//       res.send({ message: "Data saved successfully" });
//     });
//   });
// });

// const PORT = 3001;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 3001;
// app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // Adjust the origin according to your front-end URL
  })
);
// Serve static files from a specified directory (optional)
app.use(express.static("/data"));
app.use(bodyParser.json());
app.get("/data", (req, res) => {
  const outputPath = path.join(__dirname, "output.json");
  app.post("/save-data", (req, res) => {
    const newData = req.body;

    fs.readFile(outputPath, (err, data) => {
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
      fs.writeFile(
        outputPath,
        JSON.stringify(fileData, null, 2),
        (writeError) => {
          if (writeError) {
            return res.status(500).send({ message: "Failed to save data" });
          }
          res.send({ message: "Data saved successfully" });
        }
      );
    });
  });
  // Read the output.json file on each request
  fs.readFile(outputPath, (err, data) => {
    if (err) {
      console.error("Failed to read file:", err);
      return res.status(500).send("An error occurred while fetching the data.");
    }

    // Set the content-type to application/json
    res.setHeader("Content-Type", "application/json");
    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
