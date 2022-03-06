import Web3 from "web3";
import { PromiEvent, TransactionReceipt } from "web3-core";
import BN from "bn.js";

import { NonPayableTx } from "../types/types";

import Comptroller from "./Comptroller";
import MarketAdmin from "./MarketAdmin";
import CToken from "./CToken";
import { PoolLensV1, PoolLensV2 } from "./PoolLens";

import Addrs from "../constants/addrs";

class MarketSDK {
  readonly apiURL: string = "https://sls.market.xyz/";
  readonly comptrollerAddress: string;
  readonly web3: Web3;

  admin?: MarketAdmin;
  comptroller?: Comptroller;

  lens: {
    v1?: PoolLensV1,
    v2?: PoolLensV2
  } = {};

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
    this.admin = new MarketAdmin(this, await this.comptroller.admin());

    const chainId = await this.web3.eth.getChainId();
    const lensV1Address = Addrs[chainId as keyof typeof Addrs]?.FUSE_POOL_LENS_CONTRACT_ADDRESS;

    this.lens.v1 = new PoolLensV1(this, this.comptroller, lensV1Address);
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

  getAllPools(){
    this.checkInit();
    return this.lens.v1!.getPublicPoolsWithData();
  }

  getPoolsByOwner(owner: string){
    return this._getAPIReq(`getPoolsByOwner?owner=${owner}`);
  }

  getPoolAssetsWithData(){
    this.checkInit();
    return this.lens.v1!.getPoolAssetsWithData();
  }

  private async _getAPIReq(endpoint: string){
    const res = await fetch(`${this.apiURL}/api/${endpoint}`)

    if(res.status !== 200){
      throw new Error(`API request failed with status ${res.status}`);
    }
    return await res.json();
  }

  isMarketAdmin(address: string): Promise<boolean> {
    return new MarketAdmin(this, address).isMarketAdmin();
  }
}

export default MarketSDK;
