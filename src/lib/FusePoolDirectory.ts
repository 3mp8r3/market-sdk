import { PromiEvent, TransactionReceipt } from "web3-core";
import BN from "bn.js";

import MarketContract from "./MarketContract";
import FusePoolDirectoryArtifact from "../abi/FusePoolDirectory.json";

import { NonPayableTx } from "../types/types";
import { FusePoolDirectory as FusePoolDirectoryWeb3Interface } from "../types/FusePoolDirectory";

import MarketSDK from "./MarketSDK";
import { FusePool, normalizeFusePool } from "./FusePool";

class FusePoolDirectory extends MarketContract<FusePoolDirectoryWeb3Interface> {
  constructor(sdk: MarketSDK, address: string){
    super(sdk, address, FusePoolDirectoryArtifact.abi);
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

  async getAllPools(): Promise<FusePool[]> {
    const poolsRaw = await this.contract.methods.getAllPools().call();
    const pools: FusePool[] = [];

    for(const pool of poolsRaw){
      pools.push(normalizeFusePool(pool, this.sdk));
    }
    return pools;
  }

  getBookmarks(
    account: string
  ): Promise<string[]> {
    return this.contract.methods.getBookmarks(account).call();
  }

  async getPoolsByAccount(
    account: string
  ): Promise<{
    indexes: BN[];
    pools: FusePool[];
  }> {
    const { 0: indexesRaw, 1: poolsRaw } = await this.contract.methods.getPoolsByAccount(account).call();

    const indexes: BN[] = [];
    const pools: FusePool[] = [];

    for(const pool of poolsRaw){
      pools.push(normalizeFusePool(pool, this.sdk));
    }
    for(const index of indexesRaw){
      indexes.push(new BN(index));
    }
    return { indexes, pools };
  }

  async getPublicPools(): Promise<{
    indexes: BN[];
    pools: FusePool[];
  }> {
    const { 0: indexesRaw, 1: poolsRaw } = await this.contract.methods.getPublicPools().call();

    const indexes: BN[] = [];
    const pools: FusePool[] = [];

    for(const pool of poolsRaw){
      pools.push(normalizeFusePool(pool, this.sdk));
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

  owner(): Promise<string> {
    return this.contract.methods.owner().call();
  }

  poolExists(
    args0: string
  ): Promise<boolean> {
    return this.contract.methods.poolExists(args0).call();
  }

  async pools(
    arg0: number | string | BN
  ): Promise<FusePool> {
    const poolRaw = await this.contract.methods.pools(arg0).call();
    return normalizeFusePool(poolRaw, this.sdk);
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

export default FusePoolDirectory;
