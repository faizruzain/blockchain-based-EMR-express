const web3 = require("./web3.js");
const PatientVerificator = require("./build/PatientVerificator.json");

const patientVerificatorInstance = new web3.eth.Contract(
  PatientVerificator.abi,
  "0x98a071B3928592Ba471b6C14ceaFD7C228b81fFA"
);

module.exports = patientVerificatorInstance;

// local latest

// ContractDeployer Address @ 0x08663D3ff9ADFeFDD9f78B7aFFf5138e4c79780a
// {
//   MedicalRecords: '0xE052379B649F56B2d87947e9b564E415942e3cD9',
//   PatientVerificator: '0x6c40078E6b72a6F84b06dd8c4F21A9b1eCb39cB5',
//   DoctorVerificator: '0x59bD0e83C46ae51e495FA01cb1B6D53E93742156',
//   DoctorRelation: '0xa6Ca968eDed0878F89AE4ceBb2685a5b9723bC90'
// }

// Goerli latest

// ContractDeployer Address @ 0xe58Df7b0be4621Cbadd27A6ADEFb97E211666B41
// {
//   MedicalRecords: '0xd0bF1870620Ee3c5f445bF3248afcFc1bEef36C8',
//   PatientVerificator: '0x4a1d51cBe3fFe4dcf367fF3F398668cb5Cc4c7d4',
//   DoctorVerificator: '0x96A7500D966b601116737b2be2a17b1E827aea6F',
//   DoctorRelation: '0x6EdC6098eCc0CddCBcca46C3D139d589f4dceb29'
// }