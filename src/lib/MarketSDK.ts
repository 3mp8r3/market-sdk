import Web3 from "web3";
import { PromiEvent, TransactionReceipt } from "web3-core";
import BN from "bn.js";

import { NonPayableTx } from "../types/types";

import Comptroller from "./Comptroller";
import MarketAdmin from "./MarketAdmin";

class MarketSDK {
  readonly comptrollerAddress: string;
  readonly web3: Web3;

  admin?: MarketAdmin;
  comptroller?: Comptroller;

  constructor(comptrollerAddress: string, web3: Web3){
    this.comptrollerAddress = comptrollerAddress;
    this.web3 = web3;
  }

  async init(){
    this.comptroller = new Comptroller(this, this.comptrollerAddress);
    this.admin = await this.comptroller.admin();
  }

  setCollateralFactor(
    cToken: string, 
    newCollateralFactorMantissa: number | string | BN, 
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.admin!.setCollateralFactor(cToken, newCollateralFactorMantissa, tx);
  }
}

export default MarketSDK;