const web3 = require("./web3.js");
const PatientVerificator = require("./build/PatientVerificator.json");

const patientVerificatorInstance = new web3.eth.Contract(
  PatientVerificator.abi,
  "0xfBE15cAE56C2A39a05bE27E47EceF8fbEF418a9F"
);

module.exports = patientVerificatorInstance;