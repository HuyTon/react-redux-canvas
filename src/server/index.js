const express = require('express');
const os = require('os');
const path = require("path");
const port = process.env.PORT || 8080;
const app = express();
const fs = require("fs");
const cors = require("cors");

app.use(express.static('dist'));
app.use(express.static('public'));
app.use(cors());

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));

app.get("/api/canvas", async function (req, res) {
    try { 
        const dataFile = path.join(__dirname, "data/canvas.json");
        if (!fs.existsSync(dataFile)) {
            // File not found        
            res.status(500).json({ error: "File data not found" });
        }
        else {
            // File found
            fs.readFile(dataFile, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
                else { 
                    // Parsing to json object
                    var json = JSON.parse(data);
                    res.json({ canvas: { main: json.main, toolbar: json.toolbar } });
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

app.get("/api/shapes", async function (req, res) {
    try { 
        const userId = req.query.userId;
        const dataFile = path.join(__dirname, "data/shapes.json");
        if (!fs.existsSync(dataFile)) {
            // File not found        
            res.status(500).json({ error: "File data not found" });
        }
        else {
            // File found
            fs.readFile(dataFile, function (err, data) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
                else {
                    // Parsing to json object
                    var json = JSON.parse(data);
                    res.json({ shapes: json.shapes });
                }
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "/../../dist/", "index.html"),
    function(err) {
      if (err) {
        res.status(500).send(err)
      }
    });
  });