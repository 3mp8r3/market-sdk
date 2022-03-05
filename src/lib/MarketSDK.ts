import Web3 from "web3";
import { PromiEvent, TransactionReceipt } from "web3-core";
import BN from "bn.js";

import { NonPayableTx } from "../types/types";

import Comptroller from "./Comptroller";
import MarketAdmin from "./MarketAdmin";
import CToken from "./CToken";

class MarketSDK {
  readonly apiURL: string = "https://sls.market.xyz/";
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

  async getTokenData(address: string, chainId?: number | string){
    const _chainId = Number(chainId) || await this.web3.eth.getChainId();
    const res = await this._getAPIReq(`tokenData?address=${address}&chainId=${_chainId}`);

    return res;
  }

  getAllPools(format: boolean = false){
    return this._getAPIReq(`getAllPools?format=${format ? 1 : 0}`);
  }

  getPoolsByOwner(owner: string, format: boolean = false){
    return this._getAPIReq(`getPoolsByOwner?owner=${owner}&format=${format ? 1 : 0}`);
  }

  getPoolAssetsWithData(from: string){
    return this._getAPIReq(`getPoolAssetsWithData?address=${from}&comptroller=${this.comptrollerAddress}`);
  }

  private async _getAPIReq(endpoint: string){
    const res = await fetch(`${this.apiURL}/api/${endpoint}`)

    if(res.status !== 200){
      throw new Error(`API request failed with status ${res.status}`);
    }
    return await res.json();
  }
}

export default MarketSDK;