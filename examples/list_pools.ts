import { MarketSDK } from "../src";
import Web3 from "web3";

(async function () {
  const web3 = new Web3("https://matic-mainnet-full-rpc.bwarelabs.com");
  const sdk = new MarketSDK(web3);

  await sdk.init(); // Fetch deployed contracts info for the current network

  const pools = await sdk.poolDirectory!.getAllPools(); // sdk.poolDirectory property is only available after a successful init() call

  console.log(pools); // list all pools on the polygon network
})();
