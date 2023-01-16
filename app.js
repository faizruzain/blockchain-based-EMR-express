require("dotenv").config();

const doctorVerificatorInstance = require("./ethereum/instance-doctor-verificator");
const patientVerificatorInstance = require("./ethereum/instance-patient-verificator");
const web3 = require("./ethereum/web3");

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");
app.use(cors());

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

app.get("/get/patient/records", async (req, res) => {
  // console.log(req.query);
  const [admin] = await web3.eth.getAccounts();
  const address = req.query.address;
  const isAddress = web3.utils.isAddress(address);
  const id = req.query.id;
  const page = parseInt(req.query.page);
  const skip = page === 1 ? 0 : page * 10;

  let access;
  try {
    if (isAddress) {
      access = await doctorVerificatorInstance.methods.verify(address).call({
        from: admin,
      });
    } else {
      res.status(200).send({ message: `Address is ${isAddress}` });
      return null;
    }
  } catch (err) {
    console.log(err);
  }

  if (req.query.page && access) {
    try {
      const data = await Records.find().skip(skip).limit(20).exec();
      res.status(200).send({ data });
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  } else if (req.query.id && access) {
    try {
      const data = await Records.findById(id).exec();
      res.status(200).send({ data });
    } catch (err) {
      console.log(err);
      res.status(404).send(err);
    }
  } else if (!access) {
    res.status(200).send({ message: "Not Authorized" });
  }
});

app.put("/get/patient/records", async (req, res) => {
  // console.log(req.body);
  const [admin] = await web3.eth.getAccounts();
  const address = req.body.address;
  const isAddress = web3.utils.isAddress(address);
  const id = req.body._id;

  let access;
  try {
    if (isAddress) {
      access = await doctorVerificatorInstance.methods.verify(address).call({
        from: admin,
      });
    } else {
      res.status(200).send({ message: `Address is ${isAddress}` });
      return null;
    }
  } catch (err) {
    console.log(err);
  }

  if (address && access) {
    const filter = {
      _id: id,
    };

    const update = {
      description: req.body.description,
      medical_specialty: req.body.medical_specialty,
      sample_name: req.body.sample_name,
      transcription: req.body.transcription,
    };

    const doc = Records.findOneAndUpdate(filter, update, {
      new: true,
      upsert: true,
    })
      .lean()
      .exec();

    doc.then(async (doc) => {
      if (doc) {
        try {
          // ["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", "Updating this (id) patient data", "24-12-2022"]
          const d = new Date();
          const date = d.toLocaleDateString("id-ID", {
            dateStyle: "medium",
          });
          const time = d.toLocaleTimeString("id-ID", {
            timeStyle: "short",
          });
          const dateAndTime = `${date} ${time}`;

          await doctorVerificatorInstance.methods
            .logThis([
              address,
              `Updating this ${id} patient record`,
              dateAndTime,
            ])
            .send({
              from: admin,
              gas: "8000000",
            })
            .on("transactionHash", (transactionHash) => {
              res.status(200).send({
                message: "Updated",
                transactionHash: transactionHash,
                newDoc: doc,
              });
            });
        } catch (err) {
          console.log(err);
        }
      }
    });
  } else if (!access) {
    res.status(200).send({ message: "Not Authorized" });
  }
});

app.get("/verify", async (req, res) => {
  const [admin] = await web3.eth.getAccounts();
  const address = req.query.address;
  const isAddress = web3.utils.isAddress(address);

  let doctor;
  let patient;
  try {
    if (isAddress) {
      doctor = await doctorVerificatorInstance.methods.verify(address).call({
        from: admin,
      });

      patient = await patientVerificatorInstance.methods.verify(address).call({
        from: admin,
      });
    } else {
      res.status(200).send({ message: `Address is ${isAddress}` });
      return null;
    }
  } catch (err) {
    console.log(err);
  }

  if (doctor) {
    res.status(200).send({ role: "doctor" });
  } else if (patient) {
    res.status(200).send({ role: "patient" });
  } else if (!doctor && !patient) {
    res.status(200).send({ role: "unknown" });
  }
});

app.post("/add-new-record", async (req, res) => {
  // console.log(req.body);
  const [admin] = await web3.eth.getAccounts();
  const address = req.body.address;
  const isAddress = web3.utils.isAddress(address);

  let access;
  try {
    if (isAddress) {
      access = await doctorVerificatorInstance.methods.verify(address).call({
        from: admin,
      });
    } else {
      res.status(200).send({ message: `Address is ${isAddress}` });
      return null;
    }
  } catch (err) {
    console.log(err);
  }

  if (address && access) {
    const total = await Records.count({});
    const data = new Records({
      index: total + 1,
      description: req.body.description,
      medical_specialty: req.body.medical_specialty,
      sample_name: req.body.sample_name,
      transcription: req.body.transcription,
    });
    await data.save();
    const newDoc = await Records.findOne({ index: data.index }).exec();

    try {
      // ["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2", "Updating this (id) patient data", "24-12-2022"]
      const d = new Date();
      const date = d.toLocaleDateString("id-ID", {
        dateStyle: "medium",
      });
      const time = d.toLocaleTimeString("id-ID", {
        timeStyle: "short",
      });
      const dateAndTime = `${date} ${time}`;

      await doctorVerificatorInstance.methods
        .logThis([address, `Added new patient records`, dateAndTime])
        .send({
          from: admin,
          gas: "8000000",
        })
        .on("transactionHash", (transactionHash) => {
          res.status(200).send({
            message: "Updated",
            transactionHash: transactionHash,
            newDoc: newDoc,
          });
        });
    } catch (err) {
      console.log(err);
    }

  } else {
    res.status(200).send({ message: `Not Authorized` });
  }
});

// app.get("/get-address-logs", async (req, res) => {
//   const [admin] = await web3.eth.getAccounts();
//   const address = req.query.address;
//   const isAddress = web3.utils.isAddress(address);

//   let access;
//   try {
//     if (isAddress) {
//       access = await doctorVerificatorInstance.methods.verify(address).call({
//         from: admin,
//       });

//     } else {
//       res.status(200).send({ message: `Address is ${isAddress}` });
//       return null;
//     }
//   } catch (err) {
//     console.log(err);
//   }

//   if(access){

//   }

// });

app.listen(port, () => {
  console.log(`server started at port ${port}`);
});
