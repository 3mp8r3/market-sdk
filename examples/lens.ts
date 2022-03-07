import { MarketSDK } from "../src";
import HDWalletProvider from "@truffle/hdwallet-provider";
import Web3 from "web3";

(async function () {
  try {
    const provider = new HDWalletProvider(process.env.PRIVATE_KEY!, "https://matic-mainnet-full-rpc.bwarelabs.com");
    const web3 = new Web3(provider);
    const sdk = new MarketSDK(web3);

    await sdk.init();

    console.log(
      await sdk.lens.v1?.getPublicPoolsWithData()
    );
  } catch(error){
    console.error(error);
  }
})();
