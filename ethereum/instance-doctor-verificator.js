const web3 = require("./web3.js");
const DoctorVerificator = require("./build/DoctorVerificator.json");

const doctorVerificatorInstance = new web3.eth.Contract(
  DoctorVerificator.abi,
  "0xcD6574Df1118cD2b42Cc629A1367666F1739a49A"
);

module.exports = doctorVerificatorInstance;

// Doctor_Verificator
// {
//   transactionHash: '0x035bc001097540cd29bef740fdd9fc8924aad9eabe901d51d70b7cbe2acc967d',
//   transactionIndex: 0,
//   blockHash: '0x5004e88be71460f92da7ecd3d6d79acf5316b8189655cfa9996606ecab69cd0f',
//   blockNumber: 76,
//   from: '0x4366c0d2b25a5614a136ee1124d15e16206b72ad',
//   to: null,
//   gasUsed: 1105312,
//   cumulativeGasUsed: 1105312,
//   contractAddress: '0xcD6574Df1118cD2b42Cc629A1367666F1739a49A',
//   status: true,
//   logsBloom: '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 0000000000000000000000000000000000000000000',
//   events: {}
// }


// Patient_Verificator
// {
//   transactionHash: '0x3e2943469b7f2c3cb1745398657645e4176f17f29ce89a22c6f67d502839444d',
//   transactionIndex: 0,
//   blockHash: '0x9ac54b5a29f0525729d4447110b8d2c203effe081700147310100ff7341e0947',
//   blockNumber: 77,
//   from: '0x4366c0d2b25a5614a136ee1124d15e16206b72ad',
//   to: null,
//   gasUsed: 346368,
//   cumulativeGasUsed: 346368,
//   contractAddress: '0xc2f0CA1012133684dd95DD7272F47a717894F5b2',
//   status: true,
//   logsBloom: '0x000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000
// 0000000000000000000000000000000000000000000',
//   events: {}
// }

// Goerli latest

// ContractDeployer Address @ 0xe58Df7b0be4621Cbadd27A6ADEFb97E211666B41
// {
//   MedicalRecords: '0xd0bF1870620Ee3c5f445bF3248afcFc1bEef36C8',
//   PatientVerificator: '0x4a1d51cBe3fFe4dcf367fF3F398668cb5Cc4c7d4',
//   DoctorVerificator: '0x96A7500D966b601116737b2be2a17b1E827aea6F',
//   DoctorRelation: '0x6EdC6098eCc0CddCBcca46C3D139d589f4dceb29'
// }