import web3 from "./web3.js";
import CampaignDeployer from "../ethereum/build/CampaignDeployer.json";

const instance = new web3.eth.Contract(
  CampaignDeployer.abi,
  "0x7c09f9ec170834413b43134BB408eF24CBBa6be5"
);

export default instance;
