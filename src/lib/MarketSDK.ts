import Web3 from "web3";
import { PromiEvent, TransactionReceipt } from "web3-core";
import BN from "bn.js";

import { NonPayableTx } from "../types/types";

import Comptroller from "./Comptroller";
import MarketAdmin from "./MarketAdmin";
import CToken from "./CToken";

class MarketSDK {
  readonly comptrollerAddress: string;
  readonly web3: Web3;

  admin?: MarketAdmin;
  comptroller?: Comptroller;

  constructor(comptrollerAddress: string, web3: Web3){
    this.comptrollerAddress = comptrollerAddress;
    this.web3 = web3;
  }

  private checkInit(){
    if(!this.comptroller || !this.admin){
      throw new Error("MarketSDK not initialized");
    }
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
    this.checkInit();
    return this.admin!.setCollateralFactor(cToken, newCollateralFactorMantissa, tx);
  }

  getCToken(address: string){
    this.checkInit();
    return new CToken(this.comptroller!, address);
  }
}

export default MarketSDK;