import BN from "bn.js";

import MarketSDK from "./MarketSDK";
import MarketContract from "./MarketContract";

import { FusePoolLens as FusePoolLensV1Web3Interface } from "../types/FusePoolLens";
import FusePoolLensV1Artifact from "../abi/FusePoolLens.json";

import Comptroller from "./Comptroller";
import CToken from "./CToken";
import { FusePool, FusePoolAsset, FusePoolUser, normalizeFusePool, normalizeFusePoolAsset, normalizeFusePoolUser } from "./FusePool";

export interface CTokenOwnership {
  cToken: CToken;
  admin: string;
  admingHasRights: boolean;
  fuseAdminHasRights: boolean;
}

class FusePoolLensV1 extends MarketContract<FusePoolLensV1Web3Interface> {
  readonly comptroller: Comptroller;

  constructor(sdk: MarketSDK, comptroller: Comptroller | string, address: string) {
    super(sdk, address, FusePoolLensV1Artifact.abi);

    if(!(comptroller instanceof Comptroller)){
      comptroller = new Comptroller(sdk, comptroller)
    }
    this.comptroller = comptroller;
  }

  async getPoolAssetsWithData(): Promise<FusePoolAsset[]> {
    const assetsRaw = await this.contract.methods.getPoolAssetsWithData(this.comptroller.address).call();

    const assets: FusePoolAsset[] = [];

    for(const asset of assetsRaw){
      assets.push(normalizeFusePoolAsset(asset, this.comptroller));
    }
    return assets;
  }

  async getPoolOwnership(): Promise<{
    comptrollerAdmin: string,
    comptrollerAdminHasRights: boolean,
    comptrollerFuseAdminHasRights: boolean,
    outliners: CTokenOwnership[],
  }> {
    const raw = await this.contract.methods.getPoolOwnership(this.comptroller.address).call();
    const outlinersRaw = raw[3];

    const outliners: CTokenOwnership[] = [];

    for(const outliner of outlinersRaw){
      outliners.push({
        cToken: new CToken(this.comptroller, outliner[0]),
        admin: outliner[1],
        admingHasRights: outliner[2],
        fuseAdminHasRights: outliner[3],
      });
    }

    return {
      comptrollerAdmin: raw[0],
      comptrollerAdminHasRights: raw[1],
      comptrollerFuseAdminHasRights: raw[2],
      outliners: outliners
    };
  }

  async getPoolSummary(): Promise<{
    totalSupply: BN,
    totalBorrow: BN,
    underlyingTokens: string[],
    underlyingSymbols: string[],
  }> {
    const raw = await this.contract.methods.getPoolSummary(this.comptroller.address).call();

    return {
      totalSupply: new BN(raw[0]),
      totalBorrow: new BN(raw[1]),
      underlyingTokens: raw[2],
      underlyingSymbols: raw[3],
    };
  }

  async getPoolUserSummary(account: string): Promise<{
    suppluBalance: BN,
    borrowBalance: BN
  }> {
    const raw = await this.contract.methods.getPoolUserSummary(this.comptroller.address, account).call();

    return {
      suppluBalance: new BN(raw[0]),
      borrowBalance: new BN(raw[1]),
    };
  }

  async getPoolsByAccountWithData(account: string): Promise<{
    indexes: BN[],
    pools: FusePool[],
    totalSupply: BN[],
    totalBorrow: BN[],
    underlyingTokens: string[][],
    underlyingSymbols: string[][],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getPoolsByAccountWithData(account).call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      pools: raw[1].map(el => normalizeFusePool(el, this.comptroller.sdk)),
      totalSupply: raw[2].map(el => new BN(el)),
      totalBorrow: raw[3].map(el => new BN(el)),
      underlyingTokens: raw[4],
      underlyingSymbols: raw[5],
      errored: raw[6],
    }
  }

  async getPoolsBySupplier(supplier: string): Promise<{
    indexes: BN[],
    accountPools: FusePool[],
  }> {
    const raw = await this.contract.methods.getPoolsBySupplier(supplier).call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      accountPools: raw[1].map(el => normalizeFusePool(el, this.comptroller.sdk)),
    }
  }

  async getPoolsBySupplierWithData(supplier: string): Promise<{
    indexes: BN[],
    pools: FusePool[],
    totalSupply: BN[],
    totalBorrow: BN[],
    underlyingTokens: string[][],
    underlyingSymbols: string[][],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getPoolsBySupplierWithData(supplier).call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      pools: raw[1].map(el => normalizeFusePool(el, this.comptroller.sdk)),
      totalSupply: raw[2].map(el => new BN(el)),
      totalBorrow: raw[3].map(el => new BN(el)),
      underlyingTokens: raw[4],
      underlyingSymbols: raw[5],
      errored: raw[6],
    }
  }

  async getPublicPoolUsersWithData(
    maxHealth: number | string | BN
  ): Promise<{
    comptrollers: string[],
    users: FusePoolUser[][],
    closeFactors: BN[],
    iquidationIncentives: BN[],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getPublicPoolUsersWithData(maxHealth).call();

    return {
      comptrollers: raw[0],
      users: raw[1].map(el => el.map(el => normalizeFusePoolUser(el, this.comptroller))),
      closeFactors: raw[2].map(el => new BN(el)),
      iquidationIncentives: raw[3].map(el => new BN(el)),
      errored: raw[4],
    }
  }

  async getPublicPoolsWithData(): Promise<{
    indexes: BN[],
    pools: FusePool[],
    totalSupply: BN[],
    totalBorrow: BN[],
    underlyingTokens: string[][],
    underlyingSymbols: string[][],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getPublicPoolsWithData().call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      pools: raw[1].map(el => normalizeFusePool(el, this.comptroller.sdk)),
      totalSupply: raw[2].map(el => new BN(el)),
      totalBorrow: raw[3].map(el => new BN(el)),
      underlyingTokens: raw[4],
      underlyingSymbols: raw[5],
      errored: raw[6],
    }
  }

  async getUserSummary(account: string): Promise<{
    supplyBalance: BN,
    borrowBalance: BN,
    errors: boolean
  }> {
    const raw = await this.contract.methods.getUserSummary(account).call();
    
    return {
      supplyBalance: new BN(raw[0]),
      borrowBalance: new BN(raw[1]),
      errors: raw[2],
    };
  }

  async getWhitelistedPoolsByAccount(account: string): Promise<{
    indexes: BN[],
    accountPools: FusePool[]
  }> {
    const raw = await this.contract.methods.getWhitelistedPoolsByAccount(account).call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      accountPools: raw[1].map(el => normalizeFusePool(el, this.comptroller.sdk))
    };
  }

  async getWhitelistedPoolsByAccountWithData(account: string): Promise<{
    indexes: BN[],
    pools: FusePool[],
    totalSupply: BN[],
    totalBorrow: BN[],
    underlyingTokens: string[][],
    underlyingSymbols: string[][],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getWhitelistedPoolsByAccountWithData(account).call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      pools: raw[1].map(el => normalizeFusePool(el, this.comptroller.sdk)),
      totalSupply: raw[2].map(el => new BN(el)),
      totalBorrow: raw[3].map(el => new BN(el)),
      underlyingTokens: raw[4],
      underlyingSymbols: raw[5],
      errored: raw[6],
    }
  }
}

class FusePoolLensV2 {

}

export { FusePoolLensV1, FusePoolLensV2 };
