import { PromiEvent, TransactionReceipt } from "web3-core";
import BN from "bn.js";

import MarketContract from "./MarketContract";
import PoolDirectoryArtifact from "../abi/PoolDirectory.json";

import { NonPayableTx } from "../types/types";
import { PoolDirectory as PoolDirectoryWeb3Interface } from "../types/PoolDirectory";

import MarketSDK from "./MarketSDK";
import { Pool, normalizePool } from "./Pool";

class PoolDirectory extends MarketContract<PoolDirectoryWeb3Interface> {
  constructor(sdk: MarketSDK, address: string){
    super(sdk, address, PoolDirectoryArtifact.abi);
  }

  _setDeployerWhitelistEnforcement(
    _enforceDeployerWhitelist: boolean,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setDeployerWhitelistEnforcement(_enforceDeployerWhitelist).send(tx);
  }

  _whitelistDeployers(
    deployers: string[],
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._whitelistDeployers(deployers).send(tx);
  }

  bookmarkPool(
    comptroller: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.bookmarkPool(comptroller).send(tx);
  }

  deployPool(
    name: string,
    implementation: string,
    enforceWhitelist: boolean,
    closeFactor: number | string | BN,
    maxAssets: number | string | BN,
    liquidationIncentive: number | string | BN,
    priceOracle: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.deployPool(name, implementation, enforceWhitelist, closeFactor, maxAssets, liquidationIncentive, priceOracle).send(tx);
  }

  deployerWhitelist(
    arg0: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.deployerWhitelist(arg0).send(tx);
  }

  enforeceDeployerWHitelist(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.enforceDeployerWhitelist().send(tx);
  }

  async getAllPools(
    tx?: NonPayableTx
  ): Promise<Pool[]> {
    const poolsRaw = await this.contract.methods.getAllPools().call(tx);
    const pools: Pool[] = [];

    for(const pool of poolsRaw){
      pools.push(normalizePool(pool, this.sdk));
    }
    return pools;
  }

  getBookmarks(
    account: string,
    tx?: NonPayableTx
  ): Promise<string[]> {
    return this.contract.methods.getBookmarks(account).call(tx);
  }

  async getPoolsByAccount(
    account: string,
    tx?: NonPayableTx
  ): Promise<{
    indexes: BN[];
    pools: Pool[];
  }> {
    const { 0: indexesRaw, 1: poolsRaw } = await this.contract.methods.getPoolsByAccount(account).call(tx);

    const indexes: BN[] = [];
    const pools: Pool[] = [];

    for(const pool of poolsRaw){
      pools.push(normalizePool(pool, this.sdk));
    }
    for(const index of indexesRaw){
      indexes.push(new BN(index));
    }
    return { indexes, pools };
  }

  async getPublicPools(
    tx?: NonPayableTx
  ): Promise<{
    indexes: BN[];
    pools: Pool[];
  }> {
    const { 0: indexesRaw, 1: poolsRaw } = await this.contract.methods.getPublicPools().call(tx);

    const indexes: BN[] = [];
    const pools: Pool[] = [];

    for(const pool of poolsRaw){
      pools.push(normalizePool(pool, this.sdk));
    }
    for(const index of indexesRaw){
      indexes.push(new BN(index));
    }
    return { indexes, pools };
  }

  initialize(
    _enforeceDeployerWhitelist: boolean,
    _deployerWhitelist: string[],
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.initialize(_enforeceDeployerWhitelist, _deployerWhitelist).send(tx);
  }

  owner(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.owner().call(tx);
  }

  poolExists(
    args0: string,
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.poolExists(args0).call(tx);
  }

  async pools(
    arg0: number | string | BN,
    tx?: NonPayableTx
  ): Promise<Pool> {
    const poolRaw = await this.contract.methods.pools(arg0).call(tx);
    return normalizePool(poolRaw, this.sdk);
  }

  registerPool(
    name: string,
    comptroller: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.registerPool(name, comptroller).send(tx);
  }

  renounceOwnership(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.renounceOwnership().send(tx);
  }

  setPoolName(
    poolid: number | string | BN,
    newName: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setPoolName(poolid, newName).send(tx);
  }

  transferOwnersip(
    newOwner: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.transferOwnership(newOwner).send(tx);
  }
}

export default PoolDirectory;
