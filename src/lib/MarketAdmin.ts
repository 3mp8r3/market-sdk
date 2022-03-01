import { provider, PromiEvent, TransactionReceipt } from "web3-core";
import BN from "bn.js";

import MarketContract from "./MarketContract";
import MarketAdminArtifact from "../abi/MarketAdmin.json";

import { MarketAdmin as MarketAdminWeb3Interface } from "../types/MarketAdmin";
import { NonPayableTx } from "../types/types";

// Having a separate class overwritting typechain allows us to do things like replacing `comptroller: string` with `comptroller: Comptroller` and more at some point in the future, and also makes it easier to swap web3.js if we ever need to.

class MarketAdmin extends MarketContract<MarketAdminWeb3Interface> {
  constructor(provider: provider, address: string){
    super(provider, address, MarketAdminArtifact.abi);
  }
  // Comptroller Methods

  setCollateralFactor(
    comptroller: string,
    address: string,
    newCollateralFactorMantissa: BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setCollateralFactor(comptroller, address, newCollateralFactorMantissa).send(tx);
  }

  setCloseFactor(
    comptroller: string,
    newCloseFactorMantissa: BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setCloseFactor(comptroller, newCloseFactorMantissa).send(tx);
  }

  setLiquidationIncentive(
    comptroller: string,
    newLiquidationIncentive: BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setLiquidationIncentive(comptroller, newLiquidationIncentive).send(tx);
  }

  supportMarket(
    comptroller: string,
    cToken: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.supportMarket(comptroller, cToken).send(tx);
  }

  deployMarket(
    comptroller: string,
    isCEther: boolean,
    constructorData: string | number[],
    collateralFactorMantissa: BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.deployMarket(comptroller, isCEther, constructorData, collateralFactorMantissa).send(tx);
  }

  setBorrowCaps(
    comptroller: string,
    cTokens: string[],
    newBorrowCaps: BN[],
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setBorrowCaps(comptroller, cTokens, newBorrowCaps).send(tx);
  }

  setSupplyCaps(
    comptroller: string,
    cTokens: string[],
    newSupplyCaps: BN[],
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setSupplyCaps(comptroller, cTokens, newSupplyCaps).send(tx);
  }
 
  addRewardsDistributor(
    comptroller: string,
    distributor: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.addRewardsDistributor(comptroller, distributor).send(tx);
  }

  setCTokenActionState(
    comptroller: string,
    cToken: string,
    action: string | number,
    state: boolean,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setCTokenActionState(comptroller, cToken, action, state).send(tx);
  }

  setGlobalActionState(
    comptroller: string,
    action: string | number,
    state: boolean,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setGlobalActionState(comptroller, action, state).send(tx);
  }

  setPriceOracle(
    comptroller: string,
    newOracle: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setPriceOracle(comptroller, newOracle).send(tx);
  }

  // CToken mnethods

  setAdminFee(
    comptroller: string,
    cToken: string,
    newAdminFeeMantissa: BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setAdminFee(comptroller, cToken, newAdminFeeMantissa).send(tx);
  }
  setReserveFactor(
    comptroller: string,
    cToken: string,
    newReserveFactorMantissa: BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setReserveFactor(comptroller, cToken, newReserveFactorMantissa).send(tx);
  }
  setIRM(
    comptroller: string,
    cToken: string,
    newIRM: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setIRM(comptroller, cToken, newIRM).send(tx);
  }
  setNameAndSymbol(
    comptroller: string,
    cToken: string,
    name: string,
    symbol: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.setNameAndSymbol(comptroller, cToken, name, symbol).send(tx);
  }

  withdrawAdminFees(
    comptroller: string,
    cToken: string,
    withdrawAmount: BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.withdrawAdminFees(comptroller, cToken, withdrawAmount).send(tx);
  }

  reduceReserves(
    comptroller: string,
    cToken: string,
    resuceAmmount: BN, 
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.reduceReserves(comptroller, cToken, resuceAmmount).send(tx);
  }

  // Manager Functions

  proposeNewManager(
    comptroller: string,
    newManager: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.proposeNewManager(comptroller, newManager).send(tx);
  }
  acceptManager(
    comptroller: string,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.acceptManager(comptroller).send(tx);
  }
}

export default MarketAdmin;
