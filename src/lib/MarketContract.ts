import Web3 from "web3";
import { provider } from "web3-core";

import { BaseContract } from "../types/types";

class MarketContract<T extends BaseContract> {
  readonly address: string;
  readonly contract: T;

  constructor(provider: provider, address: string, abi: any[]){
    this.address = address;
    this.contract = <T><any>(new (new Web3(provider)).eth.Contract(abi, address));
  }
}

export default MarketContract;
