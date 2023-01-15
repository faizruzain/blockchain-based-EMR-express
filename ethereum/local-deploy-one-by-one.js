// deployment code here
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
// const web3 = new Web3("http://127.0.0.1:8545");

const mnemonicPhrase =
  "sand certain purity jazz duty clump void hamster kiwi correct high mass";

let provider = new HDWalletProvider({
  mnemonic: {
    phrase: mnemonicPhrase,
  },
  providerOrUrl: "http://127.0.0.1:8545",
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
      gas: "8000000",
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
      gas: "8000000",
    })
    .on("error", (error) => {
      console.log(error);
    })
    .on("receipt", (receipt) => {
      console.log("Patient_Verificator");
      console.log(receipt);
      console.log("\n");
    });

  provider.engine.stop();
}

deploy();
