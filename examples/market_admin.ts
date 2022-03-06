// List all pools on a given network

import { MarketAdmin, MarketSDK } from "../src";
import Web3 from "web3";

(async function () {
  const web3 = new Web3("https://matic-mainnet-full-rpc.bwarelabs.com");
  const sdk = new MarketSDK(web3);

  await sdk.init();

  const pools = await sdk.poolDirectory!.getAllPools();
  const comptroller = pools[0].comptroller;

  const adminAddr = await comptroller.admin();

  if(await sdk.isMarketAdmin(adminAddr)){
    const admin = new MarketAdmin(sdk, adminAddr);
    // use market admin here

    console.log(await admin.isMarketAdmin());
  } else {
    console.log(false);
  }
})();
