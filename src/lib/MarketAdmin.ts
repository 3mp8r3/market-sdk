import { PromiEvent, TransactionReceipt } from "web3-core";
import BN from "bn.js";

import MarketContract from "./MarketContract";
import MarketAdminArtifact from "../abi/MarketAdmin.json";

import { MarketAdmin as MarketAdminWeb3Interface } from "../types/MarketAdmin";
import { NonPayableTx } from "../types/types";
import Comptroller from "./Comptroller";

class MarketAdmin extends MarketContract<MarketAdminWeb3Interface> {
  readonly comptroller: Comptroller;

  constructor(comptroller: Comptroller, address: string){
    super(comptroller.sdk, address, MarketAdminArtifact.abi);
    this.comptroller = comptroller;
  }

  acceptAdmin(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.acceptAdmin().send(tx);
  }

  acceptManager(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.acceptManager().send(tx);
  }

  addRewardsDistributor(
    distributor: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.addRewardsDistributor(distributor).send(tx);
  }

  deployMarket(
    deployData: [
      string,
      string,
      string,
      string,
      string,
      string | number[],
      number | string | BN,
      number | string | BN,
      number | string | BN
    ],
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.deployMarket(deployData).send(tx);
  }

  manager(): Promise<string> {
    return this.contract.methods.manager().call();
  }

  pendingManager(): Promise<string> {
    return this.contract.methods.pendingManager().call();
  }

  proposeNewManager(
    newManager: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.proposeNewManager(newManager).send(tx);
  }

  reduceReserves(
    cToken: string,
    reduceAmount: number | string | BN,
    to: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.reduceReserves(cToken, reduceAmount, to).send(tx);
  }

  setAdminFee(
    cToken: string,
    newAdminFeeMantissa: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setAdminFee(cToken, newAdminFeeMantissa).send(tx);
  }

  setBorrowCaps(
    cTokens: string[],
    newBorrowCaps: (number | string | BN)[],
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setBorrowCaps(cTokens, newBorrowCaps).send(tx);
  }

  setCTokenActionState(
    cToken: string,
    action: string | number,
    state: boolean,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setCTokenActionState(cToken, action, state).send(tx);
  }

  setCloseFactor(
    newCloseFactorMantissa: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setCloseFactor(newCloseFactorMantissa).send(tx);
  }

  setCollateralFactor(
    address: string,
    newCollateralFactorMantissa: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setCollateralFactor(address, newCollateralFactorMantissa).send(tx);
  }

  setGlobalActionState(
    action: string | number,
    state: boolean,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setGlobalActionState(action, state).send(tx);
  }

  setIRM(
    cToken: string,
    newIRM: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setIRM(cToken, newIRM).send(tx);
  }

  setLiquidationIncentive(
    newLiquidationIncentive: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setLiquidationIncentive(newLiquidationIncentive).send(tx);
  }

  setNameAndSymbol(
    cToken: string,
    _name: string,
    _symbol: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setNameAndSymbol(cToken, _name, _symbol).send(tx);
  }

  setPriceOracle(
    newOracle: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setPriceOracle(newOracle).send(tx);
  }

  setReserveFactor(
    cToken: string,
    newReserveFactorMantissa: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setReserveFactor(cToken, newReserveFactorMantissa).send(tx);
  }

  setSupplyCaps(
    cTokens: string[],
    newSupplyCaps: (number | string | BN)[],
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setSupplyCaps(cTokens, newSupplyCaps).send(tx);
  }

  setWhitelistEnforcement(
    enforce: boolean,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setWhitelistEnforcement(enforce).send(tx);
  }

  setWhitelistStatuses(
    suppliers: string[],
    statuses: boolean[],
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setWhitelistStatuses(suppliers, statuses).send(tx);
  }

  supportMarket(
    cToken: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.supportMarket(cToken).send(tx);
  }

  unsupportMarket(
    cToken: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.unsupportMarket(cToken).send(tx);
  }

  withdrawAdminFees(
    cToken: string,
    withdrawAmount: number | string | BN,
    to: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.withdrawAdminFees(cToken, withdrawAmount, to).send(tx);
  }


  // Comptroller Methods




  // CToken mnethods

}

export default MarketAdmin;
