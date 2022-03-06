// List all pools on a given network

import { MarketSDK } from "../src";
import Web3 from "web3";

(async function () {
  const web3 = new Web3("https://matic-mainnet-full-rpc.bwarelabs.com");
  const sdk = new MarketSDK(web3);

  await sdk.init();

  const pools = await sdk.poolDirectory!.getAllPools();
  const comptroller = pools[0].comptroller;
  const admin = await comptroller.admin();

  // Use any comtroller method
  console.log(await comptroller.adminHasRights());
  console.log(await comptroller._setLiquidationIncentive(10, { from: admin }));
})();
