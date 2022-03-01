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
    super(comptroller.web3, address, MarketAdminArtifact.abi);
    this.comptroller = comptroller;
  }
  // Comptroller Methods

  setCollateralFactor(
    address: string,
    newCollateralFactorMantissa: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setCollateralFactor(this.comptroller.address, address, newCollateralFactorMantissa).send(tx);
  }

  setCloseFactor(
    newCloseFactorMantissa: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setCloseFactor(this.comptroller.address, newCloseFactorMantissa).send(tx);
  }

  setLiquidationIncentive(
    newLiquidationIncentive: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setLiquidationIncentive(this.comptroller.address, newLiquidationIncentive).send(tx);
  }

  supportMarket(
    cToken: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.supportMarket(this.comptroller.address, cToken).send(tx);
  }

  deployMarket(
    isCEther: boolean,
    constructorData: string | number[],
    collateralFactorMantissa: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.deployMarket(this.comptroller.address, isCEther, constructorData, collateralFactorMantissa).send(tx);
  }

  setBorrowCaps(
    cTokens: string[],
    newBorrowCaps: (number | string | BN)[],
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setBorrowCaps(this.comptroller.address, cTokens, newBorrowCaps).send(tx);
  }

  setSupplyCaps(
    cTokens: string[],
    newSupplyCaps: (number | string | BN)[],
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setSupplyCaps(this.comptroller.address, cTokens, newSupplyCaps).send(tx);
  }

  addRewardsDistributor(
    distributor: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.addRewardsDistributor(this.comptroller.address, distributor).send(tx);
  }

  setCTokenActionState(
    cToken: string,
    action: string | number,
    state: boolean,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setCTokenActionState(this.comptroller.address, cToken, action, state).send(tx);
  }

  setGlobalActionState(
    action: string | number,
    state: boolean,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setGlobalActionState(this.comptroller.address, action, state).send(tx);
  }

  setPriceOracle(
    newOracle: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setPriceOracle(this.comptroller.address, newOracle).send(tx);
  }

  // CToken mnethods

  setAdminFee(
    cToken: string,
    newAdminFeeMantissa: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setAdminFee(this.comptroller.address, cToken, newAdminFeeMantissa).send(tx);
  }
  setReserveFactor(
    cToken: string,
    newReserveFactorMantissa: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setReserveFactor(this.comptroller.address, cToken, newReserveFactorMantissa).send(tx);
  }
  setIRM(
    cToken: string,
    newIRM: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setIRM(this.comptroller.address, cToken, newIRM).send(tx);
  }
  setNameAndSymbol(
    cToken: string,
    name: string,
    symbol: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setNameAndSymbol(this.comptroller.address, cToken, name, symbol).send(tx);
  }

  withdrawAdminFees(
    cToken: string,
    withdrawAmount: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.withdrawAdminFees(this.comptroller.address, cToken, withdrawAmount).send(tx);
  }

  reduceReserves(
    cToken: string,
    resuceAmmount: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.reduceReserves(this.comptroller.address, cToken, resuceAmmount).send(tx);
  }

  // Manager Functions

  proposeNewManager(
    newManager: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.proposeNewManager(this.comptroller.address, newManager).send(tx);
  }
  acceptManager(
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.acceptManager(this.comptroller.address).send(tx);
  }
}

export default MarketAdmin;
