import { MarketAdmin, MarketSDK } from "../src";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";

(async function () {
  try {
    const provider = new HDWalletProvider(process.env.PRIVATE_KEY!, "https://matic-mainnet-full-rpc.bwarelabs.com");
    const web3 = new Web3(provider);
    const sdk = new MarketSDK(web3);

    await sdk.init();

    const pools = await sdk.poolDirectory!.getAllPools();
    const comptroller = pools[0].comptroller;
    const adminAddr = await comptroller.admin();

    console.log(await comptroller.adminHasRights());
    
    if(await sdk.isMarketAdmin(adminAddr)){
      const admin = new MarketAdmin(sdk, adminAddr);
      const receipt = await admin.setLiquidationIncentive(10);
      console.log(receipt);
    } else {
      const receipt = await comptroller._setLiquidationIncentive(10, { from: adminAddr });
      console.log(receipt);
    }
  } catch(error){
    console.error(error);
  }
})();
