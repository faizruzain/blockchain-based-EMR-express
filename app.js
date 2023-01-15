require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");
const corsOptions = {
  methods: "GET",
  allowedHeaders: {
    "Content-Type": "application/json",
  },
};

const Records = require("./schemas/records");

// to catch incoming POST data
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const db = "mongodb://127.0.0.1:27017/skripsi";
// const db = process.env.DB
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(db);
  console.log("db connected");
}

app.get("/", (req, res) => {
  res.status(200).send({ message: `hello ${req.ip}` });
});

app.get("/get/patient/records", cors(corsOptions), async (req, res) => {
  console.log(req.query);
  const id = req.query.id;
  const page = parseInt(req.query.page);
  const skip = page === 1 ? 0 : page * 10;

  if (req.query.page) {
    const data = await Records.find().skip(skip).limit(20).exec();
    res.status(200).send({ data });
  } else if (req.query.id) {
    const data = await Records.findById(id).exec()
    console.log(data);
    res.status(200).send({ data });
  } else {
    res.status(200).send({ message: "no query was specified" });
  }
});

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
