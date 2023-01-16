const web3 = require("./web3.js");
const DoctorVerificator = require("./build/DoctorVerificator.json");

const doctorVerificatorInstance = new web3.eth.Contract(
  DoctorVerificator.abi,
  "0xba559af1e29ed2a263c14eaa32036b0f1981f0cd"
);

module.exports = doctorVerificatorInstance;

// Doctor_Verificator
// {
//   transactionHash: '0x323b2006810beabe4486ffdfecc980f71145d9ac467e3b4fd5f37e3ff2801ffa',
//   transactionIndex: 0,
//   blockHash: '0xd384da1c8adbc3132cc5f5cb0a0d47766a9736c5f93cf2aebba36765b4c44f40',
//   blockNumber: 102,
//   from: '0x4366c0d2b25a5614a136ee1124d15e16206b72ad',
//   to: null,
//   gasUsed: 1106152,
//   cumulativeGasUsed: 1106152,
//   contractAddress: '0x5BbDc59F9bFe9836D789449370621471Ec6b647F',
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
//   transactionHash: '0x4efdc6f82c698ac35c164e4d0b27a6d813e8363f5453f799b94a5985204cedb9',
//   transactionIndex: 0,
//   blockHash: '0x8e7b9b62cf1c9a1a3cd832424bf85231febdae7b0bd131b013ab8c27340ea84a',
//   blockNumber: 103,
//   from: '0x4366c0d2b25a5614a136ee1124d15e16206b72ad',
//   to: null,
//   gasUsed: 384558,
//   cumulativeGasUsed: 384558,
//   contractAddress: '0x8d4b29d0C3d062662fB008639a325A18FE2137d9',
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