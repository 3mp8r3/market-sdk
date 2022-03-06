import BN from "bn.js";

import MarketSDK from "./MarketSDK";
import MarketContract from "./MarketContract";

import { PoolLens as PoolLensV1Web3Interface } from "../types/PoolLens";
import PoolLensV1Artifact from "../abi/PoolLens.json";

import { PoolLensV2 as PoolLensV2Web3Interface } from "../types/PoolLensV2";
import PoolLensV2Artifact from "../abi/PoolLensV2.json";

import Comptroller from "./Comptroller";
import CToken from "./CToken";
import PoolDirectory from "./PoolDirectory";

import {
  Pool,
  PoolAsset,
  PoolUser,
  CTokenOwnership,
  normalizePool,
  normalizePoolAsset,
  normalizePoolUser,
  normalizeCTokenOwnership,
  serializePool
} from "./Pool";

class PoolLensV1 extends MarketContract<PoolLensV1Web3Interface> {
  constructor(sdk: MarketSDK, address: string) {
    super(sdk, address, PoolLensV1Artifact.abi);
  }

  async getPoolAssetsWithData(
    comptroller: Comptroller | string
  ): Promise<PoolAsset[]> {
    comptroller = comptroller instanceof Comptroller ? comptroller.address : comptroller;

    const assetsRaw = await this.contract.methods.getPoolAssetsWithData(comptroller).call();
    const assets: PoolAsset[] = [];

    for(const asset of assetsRaw){
      assets.push(normalizePoolAsset(asset, this.sdk));
    }
    return assets;
  }

  async getPoolOwnership(
    comptroller: Comptroller | string,
  ): Promise<{
    comptrollerAdmin: string,
    comptrollerAdminHasRights: boolean,
    comptrollerFuseAdminHasRights: boolean,
    outliners: CTokenOwnership[],
  }> {
    comptroller = comptroller instanceof Comptroller ? comptroller.address : comptroller;

    const raw = await this.contract.methods.getPoolOwnership(comptroller).call();
    const outlinersRaw = raw[3];
    const outliners: CTokenOwnership[] = [];

    for(const outliner of outlinersRaw){
      outliners.push({
        cToken: new CToken(this.sdk, outliner[0]),
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

  async getPoolSummary(
    comptroller: Comptroller | string,
  ): Promise<{
    totalSupply: BN,
    totalBorrow: BN,
    underlyingTokens: string[],
    underlyingSymbols: string[],
  }> {
    comptroller = comptroller instanceof Comptroller ? comptroller.address : comptroller;
    const raw = await this.contract.methods.getPoolSummary(comptroller).call();

    return {
      totalSupply: new BN(raw[0]),
      totalBorrow: new BN(raw[1]),
      underlyingTokens: raw[2],
      underlyingSymbols: raw[3],
    };
  }

  async getPoolUserSummary(
    comptroller: Comptroller | string,
    account: string
  ): Promise<{
    suppluBalance: BN,
    borrowBalance: BN
  }> {
    comptroller = comptroller instanceof Comptroller ? comptroller.address : comptroller;
    const raw = await this.contract.methods.getPoolUserSummary(comptroller, account).call();

    return {
      suppluBalance: new BN(raw[0]),
      borrowBalance: new BN(raw[1]),
    };
  }

  async getPoolsByAccountWithData(account: string): Promise<{
    indexes: BN[],
    pools: Pool[],
    totalSupply: BN[],
    totalBorrow: BN[],
    underlyingTokens: string[][],
    underlyingSymbols: string[][],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getPoolsByAccountWithData(account).call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      pools: raw[1].map(el => normalizePool(el, this.sdk)),
      totalSupply: raw[2].map(el => new BN(el)),
      totalBorrow: raw[3].map(el => new BN(el)),
      underlyingTokens: raw[4],
      underlyingSymbols: raw[5],
      errored: raw[6],
    }
  }

  async getPoolsBySupplier(supplier: string): Promise<{
    indexes: BN[],
    accountPools: Pool[],
  }> {
    const raw = await this.contract.methods.getPoolsBySupplier(supplier).call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      accountPools: raw[1].map(el => normalizePool(el, this.sdk)),
    }
  }

  async getPoolsBySupplierWithData(supplier: string): Promise<{
    indexes: BN[],
    pools: Pool[],
    totalSupply: BN[],
    totalBorrow: BN[],
    underlyingTokens: string[][],
    underlyingSymbols: string[][],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getPoolsBySupplierWithData(supplier).call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      pools: raw[1].map(el => normalizePool(el, this.sdk)),
      totalSupply: raw[2].map(el => new BN(el)),
      totalBorrow: raw[3].map(el => new BN(el)),
      underlyingTokens: raw[4],
      underlyingSymbols: raw[5],
      errored: raw[6],
    }
  }

  async getPublicPoolUsersWithData(
    maxHealth: number | string | BN,
  ): Promise<{
    comptrollers: string[],
    users: PoolUser[][],
    closeFactors: BN[],
    iquidationIncentives: BN[],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getPublicPoolUsersWithData(maxHealth).call();

    return {
      comptrollers: raw[0],
      users: raw[1].map(el => el.map(el => normalizePoolUser(el, this.sdk))),
      closeFactors: raw[2].map(el => new BN(el)),
      iquidationIncentives: raw[3].map(el => new BN(el)),
      errored: raw[4],
    }
  }

  async getPublicPoolsWithData(): Promise<{
    indexes: BN[],
    pools: Pool[],
    totalSupply: BN[],
    totalBorrow: BN[],
    underlyingTokens: string[][],
    underlyingSymbols: string[][],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getPublicPoolsWithData().call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      pools: raw[1].map(el => normalizePool(el, this.sdk)),
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
    accountPools: Pool[]
  }> {
    const raw = await this.contract.methods.getWhitelistedPoolsByAccount(account).call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      accountPools: raw[1].map(el => normalizePool(el, this.sdk))
    };
  }

  async getWhitelistedPoolsByAccountWithData(account: string): Promise<{
    indexes: BN[],
    pools: Pool[],
    totalSupply: BN[],
    totalBorrow: BN[],
    underlyingTokens: string[][],
    underlyingSymbols: string[][],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getWhitelistedPoolsByAccountWithData(account).call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      pools: raw[1].map(el => normalizePool(el, this.sdk)),
      totalSupply: raw[2].map(el => new BN(el)),
      totalBorrow: raw[3].map(el => new BN(el)),
      underlyingTokens: raw[4],
      underlyingSymbols: raw[5],
      errored: raw[6],
    }
  }
}

class PoolLensV2 extends MarketContract<PoolLensV2Web3Interface> {
  constructor(sdk: MarketSDK, address: string) {
    super(sdk, address, PoolLensV2Artifact.abi);
  }

  async directory(): Promise<PoolDirectory> {
    const diirectoryAddress = await this.contract.methods.directory().call();

    return new PoolDirectory(this.sdk, diirectoryAddress);
  }

  async getPoolOwnership(comptroller: Comptroller | string): Promise<{
    comptrollerAdmin: string,
    comptrollerAdminHasRights: boolean,
    comptrollerFuseAdminHasRights: boolean,
    outliners: CTokenOwnership[]
  }> {
    comptroller = comptroller instanceof Comptroller ? comptroller.address : comptroller;
    const raw = await this.contract.methods.getPoolOwnership(comptroller).call();

    return {
      comptrollerAdmin: raw[0],
      comptrollerAdminHasRights: raw[1],
      comptrollerFuseAdminHasRights: raw[2],
      outliners: raw[3].map(el => normalizeCTokenOwnership(el, this.sdk))
    };
  }

  async getPoolSummary(): Promise<{
    totalSupply: BN,
    totalBorrow: BN,
    underlyingTokens: string[],
    underlyingSymbols: string[],
  }> {
    const raw = await this.contract.methods.getPoolSummary(this.address).call();

    return {
      totalSupply: new BN(raw[0]),
      totalBorrow: new BN(raw[1]),
      underlyingTokens: raw[2],
      underlyingSymbols: raw[3],
    };
  }

  async getPoolsWithData(
    indexes: (number | string | BN)[],
    pools: Pool[]
  ): Promise<{
    indexes: BN[];
    pools: Pool[];
    totalSupply: BN[];
    totalBorrow: BN[];
    underlyingTokens: string[][];
    underlyingSymbols: string[][];
    errored: boolean[];
  }> {
    const poolsSerialized: [
      string,
      string,
      string,
      number | string | BN,
      number | string | BN
    ][] = pools.map(serializePool);

    const raw = await this.contract.methods.getPoolsWithData(indexes, poolsSerialized).call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      pools: raw[1].map(el => normalizePool(el, this.sdk)),
      totalSupply: raw[2].map(el => new BN(el)),
      totalBorrow: raw[3].map(el => new BN(el)),
      underlyingTokens: raw[4],
      underlyingSymbols: raw[5],
      errored: raw[6]
    };
  }

  async getPublicPoolsWithData(): Promise<{
    indexes: BN[];
    pools: Pool[];
    totalSupply: BN[];
    totalBorrow: BN[];
    underlyingTokens: string[][];
    underlyingSymbols: string[][];
    errored: boolean[];
  }> {
    const raw = await this.contract.methods.getPublicPoolsWithData().call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      pools: raw[1].map(el => normalizePool(el, this.sdk)),
      totalSupply: raw[2].map(el => new BN(el)),
      totalBorrow: raw[3].map(el => new BN(el)),
      underlyingTokens: raw[4],
      underlyingSymbols: raw[5],
      errored: raw[6]
    };
  }

  async getWhitelistedPoolsByAccount(account: string): Promise<{
    indexes: BN[],
    accountPools: Pool[]
  }> {
    const raw = await this.contract.methods.getWhitelistedPoolsByAccount(account).call();

    return {
      indexes: raw[0].map(el => new BN(el)),
      accountPools: raw[1].map(el => normalizePool(el, this.sdk))
    };
  }
}

export { PoolLensV1, PoolLensV2 };
