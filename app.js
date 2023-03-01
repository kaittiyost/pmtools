const express = require("express");
const app = express();
const port = 3000;

const multer = require("multer");
const ejs = require("ejs");
const path = require("path");

var xlsx = require("xlsx");
const localStorage = require("node-localstorage")

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let DirImages = path.join(__dirname, "/public/images/");

app.use("/images", express.static(DirImages));



const user = {
  firstName: "alan",
  lastName: "sup",
};
let newFileName = "";

// Set up file upload with Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    newFileName = Date.now() + path.extname(file.originalname);
    cb(null, newFileName);
    //cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.render("pages/index", {
    user: user,
  });
});
app.post("/upload", upload.single("file"), (req, res) => {
    const response = {
        "status":"FileUploaded",
        "filename":newFileName
    }
  res.send(response);
});

app.get("/viewer/:filename", (req, res) => {
  var wb = xlsx.readFile(`uploads/${req.params.filename}`);

  //var ws = wb.Sheets["vMemory"];
  var sheetname = wb.SheetNames;
  //console.log(sheetname);
  res.render("pages/viewer", {
    filename: req.params.filename,
    sheetall: sheetname,
  });
});

app.get("/viewer_sheet/:filename/:sheetname/:viewType", (req, res) => {
    var wb = xlsx.readFile(`uploads/${req.params.filename}`);
  
    var ws = wb.Sheets[req.params.sheetname];
    var data = xlsx.utils.sheet_to_json(ws);

    const sheet = wb.Sheets[req.params.sheetname];
    const jsonData = xlsx.utils.sheet_to_json(sheet);
    const columnNames = Object.keys(jsonData[0]);
    // console.log(req.params.sheetname);
    // console.log(columnNames);
    

    res.render("pages/viewer_sheet", {
      filename: req.params.filename,
      sheetname: req.params.sheetname,
      data: data,
      dataJson: JSON.stringify(data).replace(/'/g, '"#"'),
      column_names:columnNames,
      viewType:req.params.viewType
    });
  });

app.listen(port, () => {
  console.log(`server is runing on port ${port}`);
});
