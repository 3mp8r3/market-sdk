import Web3 from "web3";

import { BaseContract } from "../types/types";

class MarketContract<T extends BaseContract> {
  readonly address: string;
  readonly contract: T;
  readonly web3: Web3;

  constructor(web3: Web3, address: string, abi: any[]){
    this.address = address;
    this.web3 = web3;
    this.contract = <T><any>(new web3.eth.Contract(abi, address));
  }
}

export default MarketContract;
