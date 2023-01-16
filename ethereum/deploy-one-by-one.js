// deployment code here
require("dotenv").config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");

const mnemonicPhrase = process.env.MNEMONIC
const API = process.env.API

let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl: API,
});

const web3 = new Web3(provider);

const compiled_Doctor_Verificator = require("./build/DoctorVerificator.json");
const compiled_Patient_Verificator = require("./build/PatientVerificator.json");

async function deploy() {
  const [admin] = await web3.eth.getAccounts();

  // DoctorVerificator Contract
  await new web3.eth.Contract(compiled_Doctor_Verificator.abi)
    .deploy({
      data: compiled_Doctor_Verificator.evm.bytecode.object,
    })
    .send({
      from: admin,
    })
    .on("error", (error) => {
      console.log(error);
    })
    .on("receipt", (receipt) => {
      console.log("Doctor_Verificator");
      console.log(receipt);
      console.log("\n");
    });

  // Patient_Verificator Contract
  await new web3.eth.Contract(compiled_Patient_Verificator.abi)
    .deploy({
      data: compiled_Patient_Verificator.evm.bytecode.object,
    })
    .send({
      from: admin,
    })
    .on("error", (error) => {
      console.log(error);
    })
    .on("receipt", (receipt) => {
      console.log("Patient_Verificator");
      console.log(receipt);
      console.log("\n");
    });

  console.log("All contracts have been successfully deployed");
  provider.engine.stop();
}

deploy();
