import { MarketSDK } from "../src";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";

(async function () {
  try {
    const provider = new HDWalletProvider(process.env.PRIVATE_KEY!, "https://matic-mainnet-full-rpc.bwarelabs.com");
    const web3 = new Web3(provider);
    const sdk = await MarketSDK.init(web3);

    const pools = await sdk.poolDirectory!.getAllPools();
    const comptroller = pools[0].comptroller;
    const admin = await comptroller.admin();

    // Use any comtroller method
    console.log(await comptroller.adminHasRights());
    console.log(await comptroller._setLiquidationIncentive(10, { from: admin }));
  } catch(error){
    console.error(error);
  }
})();
