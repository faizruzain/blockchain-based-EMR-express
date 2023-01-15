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

module.exports = web3;
