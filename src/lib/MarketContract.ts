import Web3 from "web3";
import MarketSDK from "./MarketSDK";

import { BaseContract } from "../types/types";

class MarketContract<T extends BaseContract> {
  readonly address: string;
  readonly contract: T;
  readonly sdk: MarketSDK;
  
  constructor(sdk: MarketSDK, address: string, abi: any[]){
    this.address = address;
    this.sdk = sdk;
    this.contract = <T><any>(new this.sdk.web3.eth.Contract(abi, address));
  }
}

export default MarketContract;
