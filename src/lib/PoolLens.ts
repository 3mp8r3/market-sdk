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
import { NonPayableTx } from "../types/types";

class PoolLensV1 extends MarketContract<PoolLensV1Web3Interface> {
  constructor(sdk: MarketSDK, address: string) {
    super(sdk, address, PoolLensV1Artifact.abi);
  }

  async getPoolAssetsWithData(
    comptroller: Comptroller | string,
    tx?: NonPayableTx
  ): Promise<PoolAsset[]> {
    comptroller = comptroller instanceof Comptroller ? comptroller.address : comptroller;

    const assetsRaw = await this.contract.methods.getPoolAssetsWithData(comptroller).call(tx);
    const assets: PoolAsset[] = [];

    for(const asset of assetsRaw){
      assets.push(normalizePoolAsset(asset, this.sdk));
    }
    return assets;
  }

  async getPoolOwnership(
    comptroller: Comptroller | string,
    tx?: NonPayableTx
  ): Promise<{
    comptrollerAdmin: string,
    comptrollerAdminHasRights: boolean,
    comptrollerFuseAdminHasRights: boolean,
    outliners: CTokenOwnership[],
  }> {
    comptroller = comptroller instanceof Comptroller ? comptroller.address : comptroller;

    const raw = await this.contract.methods.getPoolOwnership(comptroller).call(tx);
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
    tx?: NonPayableTx
  ): Promise<{
    totalSupply: BN,
    totalBorrow: BN,
    underlyingTokens: string[],
    underlyingSymbols: string[],
  }> {
    comptroller = comptroller instanceof Comptroller ? comptroller.address : comptroller;
    const raw = await this.contract.methods.getPoolSummary(comptroller).call(tx);

    return {
      totalSupply: new BN(raw[0]),
      totalBorrow: new BN(raw[1]),
      underlyingTokens: raw[2],
      underlyingSymbols: raw[3],
    };
  }

  async getPoolUserSummary(
    comptroller: Comptroller | string,
    account: string,
    tx?: NonPayableTx
  ): Promise<{
    suppluBalance: BN,
    borrowBalance: BN
  }> {
    comptroller = comptroller instanceof Comptroller ? comptroller.address : comptroller;
    const raw = await this.contract.methods.getPoolUserSummary(comptroller, account).call(tx);

    return {
      suppluBalance: new BN(raw[0]),
      borrowBalance: new BN(raw[1]),
    };
  }

  async getPoolsByAccountWithData(
    account: string,
    tx?: NonPayableTx
  ): Promise<{
    indexes: BN[],
    pools: Pool[],
    totalSupply: BN[],
    totalBorrow: BN[],
    underlyingTokens: string[][],
    underlyingSymbols: string[][],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getPoolsByAccountWithData(account).call(tx);

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

  async getPoolsBySupplier(
    supplier: string,
    tx?: NonPayableTx
  ): Promise<{
    indexes: BN[],
    accountPools: Pool[],
  }> {
    const raw = await this.contract.methods.getPoolsBySupplier(supplier).call(tx);

    return {
      indexes: raw[0].map(el => new BN(el)),
      accountPools: raw[1].map(el => normalizePool(el, this.sdk)),
    }
  }

  async getPoolsBySupplierWithData(
    supplier: string,
    tx?: NonPayableTx
  ): Promise<{
    indexes: BN[],
    pools: Pool[],
    totalSupply: BN[],
    totalBorrow: BN[],
    underlyingTokens: string[][],
    underlyingSymbols: string[][],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getPoolsBySupplierWithData(supplier).call(tx);

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
    tx?: NonPayableTx
  ): Promise<{
    comptrollers: string[],
    users: PoolUser[][],
    closeFactors: BN[],
    iquidationIncentives: BN[],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getPublicPoolUsersWithData(maxHealth).call(tx);

    return {
      comptrollers: raw[0],
      users: raw[1].map(el => el.map(el => normalizePoolUser(el, this.sdk))),
      closeFactors: raw[2].map(el => new BN(el)),
      iquidationIncentives: raw[3].map(el => new BN(el)),
      errored: raw[4],
    }
  }

  async getPublicPoolsWithData(
    tx?: NonPayableTx
  ): Promise<{
    indexes: BN[],
    pools: Pool[],
    totalSupply: BN[],
    totalBorrow: BN[],
    underlyingTokens: string[][],
    underlyingSymbols: string[][],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getPublicPoolsWithData().call(tx);

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

  async getUserSummary(
    account: string,
    tx?: NonPayableTx
  ): Promise<{
    supplyBalance: BN,
    borrowBalance: BN,
    errors: boolean
  }> {
    const raw = await this.contract.methods.getUserSummary(account).call(tx);
    
    return {
      supplyBalance: new BN(raw[0]),
      borrowBalance: new BN(raw[1]),
      errors: raw[2],
    };
  }

  async getWhitelistedPoolsByAccount(
    account: string,
    tx?: NonPayableTx
  ): Promise<{
    indexes: BN[],
    accountPools: Pool[]
  }> {
    const raw = await this.contract.methods.getWhitelistedPoolsByAccount(account).call(tx);

    return {
      indexes: raw[0].map(el => new BN(el)),
      accountPools: raw[1].map(el => normalizePool(el, this.sdk))
    };
  }

  async getWhitelistedPoolsByAccountWithData(
    account: string,
    tx?: NonPayableTx
  ): Promise<{
    indexes: BN[],
    pools: Pool[],
    totalSupply: BN[],
    totalBorrow: BN[],
    underlyingTokens: string[][],
    underlyingSymbols: string[][],
    errored: boolean[],
  }> {
    const raw = await this.contract.methods.getWhitelistedPoolsByAccountWithData(account).call(tx);

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

  async directory(
    tx?: NonPayableTx
  ): Promise<PoolDirectory> {
    const diirectoryAddress = await this.contract.methods.directory().call(tx);

    return new PoolDirectory(this.sdk, diirectoryAddress);
  }

  async getPoolOwnership(
    comptroller: Comptroller | string,
    tx?: NonPayableTx
  ): Promise<{
    comptrollerAdmin: string,
    comptrollerAdminHasRights: boolean,
    comptrollerFuseAdminHasRights: boolean,
    outliners: CTokenOwnership[]
  }> {
    comptroller = comptroller instanceof Comptroller ? comptroller.address : comptroller;
    const raw = await this.contract.methods.getPoolOwnership(comptroller).call(tx);

    return {
      comptrollerAdmin: raw[0],
      comptrollerAdminHasRights: raw[1],
      comptrollerFuseAdminHasRights: raw[2],
      outliners: raw[3].map(el => normalizeCTokenOwnership(el, this.sdk))
    };
  }

  async getPoolSummary(
    tx?: NonPayableTx
  ): Promise<{
    totalSupply: BN,
    totalBorrow: BN,
    underlyingTokens: string[],
    underlyingSymbols: string[],
  }> {
    const raw = await this.contract.methods.getPoolSummary(this.address).call(tx);

    return {
      totalSupply: new BN(raw[0]),
      totalBorrow: new BN(raw[1]),
      underlyingTokens: raw[2],
      underlyingSymbols: raw[3],
    };
  }

  async getPoolsWithData(
    indexes: (number | string | BN)[],
    pools: Pool[],
    tx?: NonPayableTx
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

    const raw = await this.contract.methods.getPoolsWithData(indexes, poolsSerialized).call(tx);

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

  async getPublicPoolsWithData(
    tx?: NonPayableTx
  ): Promise<{
    indexes: BN[];
    pools: Pool[];
    totalSupply: BN[];
    totalBorrow: BN[];
    underlyingTokens: string[][];
    underlyingSymbols: string[][];
    errored: boolean[];
  }> {
    const raw = await this.contract.methods.getPublicPoolsWithData().call(tx);

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

  async getWhitelistedPoolsByAccount(
    account: string,
    tx?: NonPayableTx
  ): Promise<{
    indexes: BN[],
    accountPools: Pool[]
  }> {
    const raw = await this.contract.methods.getWhitelistedPoolsByAccount(account).call(tx);

    return {
      indexes: raw[0].map(el => new BN(el)),
      accountPools: raw[1].map(el => normalizePool(el, this.sdk))
    };
  }
}

export { PoolLensV1, PoolLensV2 };
