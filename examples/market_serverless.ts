// Use market serverless API functions

import { MarketSDK } from "../src";
import Web3 from "web3";

(async function () {
  const web3 = new Web3("https://matic-mainnet-full-rpc.bwarelabs.com");
  const sdk = new MarketSDK(web3);

  const tokenData = await sdk.getTokenData("0xfdE69969f4527343D78F9C9AC797ded29098B215"); // fetch token metadata from sls.market.xyz

  console.log(tokenData);
})();
