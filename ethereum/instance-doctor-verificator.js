const web3 = require("./web3.js");
const DoctorVerificator = require("./build/DoctorVerificator.json");

const doctorVerificatorInstance = new web3.eth.Contract(
  DoctorVerificator.abi,
  "0xBab9567A18aa0a5d9b92B303a9A47aE9755755f0"
);

module.exports = doctorVerificatorInstance;
