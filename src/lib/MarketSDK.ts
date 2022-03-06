import Web3 from "web3";
import BN from "bn.js";
import fetch from "isomorphic-unfetch";

import Comptroller from "./Comptroller";
import MarketAdmin from "./MarketAdmin";
import CToken from "./CToken";
import PoolDirectory from "./PoolDirectory";

import { Pool, PoolAsset } from "./Pool";
import { PoolLensV1, PoolLensV2 } from "./PoolLens";

import Addrs from "../constants/addrs";

class MarketSDK {
  readonly apiURL: string = "https://sls.market.xyz/";
  readonly web3: Web3;

  poolDirectory?: PoolDirectory;
  lens: {
    v1?: PoolLensV1,
    v2?: PoolLensV2
  } = {};

  constructor(web3: Web3){
    this.web3 = web3;
  }

  private checkInit(){
    if(!this.poolDirectory || !this.lens.v1){
      throw new Error("MarketSDK not initialized");
    }
  }

  async init(){
    const chainId = await this.web3.eth.getChainId();
    const lensV1Address = Addrs[chainId as keyof typeof Addrs]?.FUSE_POOL_LENS_CONTRACT_ADDRESS;
    const poolDirectoryAddress = Addrs[chainId as keyof typeof Addrs]?.FUSE_POOL_DIRECTORY_CONTRACT_ADDRESS;

    this.lens.v1 = new PoolLensV1(this, lensV1Address);
    this.poolDirectory = new PoolDirectory(this, poolDirectoryAddress);
  }

  async getTokenData(address: string, chainId?: number | string){
    const _chainId = Number(chainId) || await this.web3.eth.getChainId();
    const res = await this._getAPIReq(`tokenData?address=${address}&chainId=${_chainId}`);

    return res;
  }

  getAllPools(): Promise<{
    indexes: BN[];
    pools: Pool[];
    totalSupply: BN[];
    totalBorrow: BN[];
    underlyingTokens: string[][];
    underlyingSymbols: string[][];
    errored: boolean[];
  }> {
    this.checkInit();
    return this.lens.v1!.getPublicPoolsWithData();
  }

  getPoolsByOwner(owner: string){
    return this._getAPIReq(`getPoolsByOwner?owner=${owner}`);
  }

  getPoolAssetsWithData(comptroller: Comptroller | string): Promise<PoolAsset[]> {
    this.checkInit();
    return this.lens.v1!.getPoolAssetsWithData(comptroller);
  }

  getCToken(address: string): CToken {
    return new CToken(this, address);
  }

  isMarketAdmin(address: string): Promise<boolean> {
    return new MarketAdmin(this, address).isMarketAdmin();
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
