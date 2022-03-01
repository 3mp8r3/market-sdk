import { provider, PromiEvent, TransactionReceipt } from "web3-core";
import BN from "bn.js";

import MarketContract from "./MarketContract";
import ComptrollerArtifact from "../abi/Comptroller.json";

import { Comptroller as ComptrollerWeb3Interface } from "../types/Comptroller";
import { NonPayableTx } from "../types/types";

class Comptroller extends MarketContract<ComptrollerWeb3Interface> {
  constructor(provider: provider, address: string){
    super(provider, address, ComptrollerArtifact.abi);
  }

  _become(
    unitroller: string, 
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._become(unitroller).send(tx);
  }

  _borrowGuardianPaused(): Promise<boolean> {
    return this.contract.methods._borrowGuardianPaused().call();
  }

  _mintGuardianPaused(): Promise<boolean> {
    return this.contract.methods._mintGuardianPaused().call();
  }

  _setBorrowPaused(
    cToken: string, 
    state: boolean, 
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setBorrowPaused(cToken, state).send(tx);
  }

  _setCloseFactor(
    newCloseFactorMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setCloseFactor(newCloseFactorMantissa).send(tx);
  }

  _setCollateralFactor(
    cToken: string,
    newCollateralFactorMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setCollateralFactor(cToken, newCollateralFactorMantissa).send(tx);
  }

  _setLiquidationIncentive(
    newLiquidationIncentiveMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setLiquidationIncentive(newLiquidationIncentiveMantissa).send(tx);
  }

  _setMaxAssets(
    newMaxAssets: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setMaxAssets(newMaxAssets).send(tx);
  }

  _setMintPaused(
    cToken: string,
    state: boolean,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setMintPaused(cToken, state).send(tx);
  }

  _setPauseGuardian(
    newPauseGuardian: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setPauseGuardian(newPauseGuardian).send(tx);
  }

  _setPriceOracle(
    newOracle: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setPriceOracle(newOracle).send(tx);
  }

  _setSeizePaused(
    state: boolean,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setSeizePaused(state).send(tx);
  }

  _setTransferPaused(
    state: boolean,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setTransferPaused(state).send(tx);
  }

  _setWhitelistEnforcement(
    enforce: boolean,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setWhitelistEnforcement(enforce).send(tx);
  }

  _setWhitelistStatuses(
    suppliers: string[],
    statuses: boolean[],
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setWhitelistStatuses(suppliers, statuses).send(tx);
  }

  _supportMarket(
    cToken: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._supportMarket(cToken).send(tx);
  }

  _supportMarketAndSetCollateralFactor(
    cToken: string,
    newCollateralFactorMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._supportMarketAndSetCollateralFactor(cToken, newCollateralFactorMantissa).send(tx);
  }

  _unsupportMarket(
    cToken: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._unsupportMarket(cToken).send(tx);
  }

  accountAssets(
    arg0: string,
    arg1: number | string | BN,
  ): Promise<string> {
    return this.contract.methods.accountAssets(arg0, arg1).call();
  }

  admin(): Promise<string> {
    return this.contract.methods.admin().call();
  }

  adminHasRights(): Promise<boolean> {
    return this.contract.methods.adminHasRights().call();
  }

  allBorrowers(
    arg0: number | string | BN,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.allBorrowers(arg0).call();
  }

  allMarkets(
    arg0: number | string | BN,
  ): Promise<string> {
    return this.contract.methods.allMarkets(arg0).call();
  }

  borrowAllowed(
    cToken: string,
    borrower: string,
    borrowAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.borrowAllowed(cToken, borrower, borrowAmount).send(tx);
  }

  borrowGuardianPaused(
    arg0: string
  ): Promise<boolean> {
    return this.contract.methods.borrowGuardianPaused(arg0).call();
  }

  borrowVerify(
    cToken: string,
    borrower: string,
    borrowAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.borrowVerify(cToken, borrower, borrowAmount).send(tx);
  }

  borrowWithinLimits(
    cToken: string,
    accountBorrowsNew: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.borrowWithinLimits(cToken, accountBorrowsNew).send(tx);
  }

  cTokensByUnderlying(
    arg0: string
  ): Promise<string> {
    return this.contract.methods.cTokensByUnderlying(arg0).call();
  }

  checkMembership(
    account: string,
    cToken: string,
  ): Promise<boolean> {
    return this.contract.methods.checkMembership(account, cToken).call();
  }

  closeFactorMantissa(): Promise<string> {
    return this.contract.methods.closeFactorMantissa().call();
  }

  comptrollerImplementation(): Promise<string> {
    return this.contract.methods.comptrollerImplementation().call();
  }

  enforceWhitelist(): Promise<boolean> {
    return this.contract.methods.enforceWhitelist().call();
  }

  enterMarkets(
    cTokens: string[],
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.enterMarkets(cTokens).send(tx);
  }

  exitMarket(
    cTokenAddress: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.exitMarket(cTokenAddress).send(tx);
  }

  fuseAdminHasRights(): Promise<boolean> {
    return this.contract.methods.fuseAdminHasRights().call();
  }

  getAccountLiquidity(
    account: string
  ): Promise<{
    0: string;
    1: string;
    2: string;
  }> {
    return this.contract.methods.getAccountLiquidity(account).call();
  }

  getAllBorrowers(): Promise<string[]> {
    return this.contract.methods.getAllBorrowers().call();
  }

  getAllMarkets(): Promise<string[]> {
    return this.contract.methods.getAllMarkets().call();
  }

  getAssetsIn(
    account: string,
  ): Promise<string[]> {
    return this.contract.methods.getAssetsIn(account).call();
  }

  getHypotheticalAccountLiquidity(
    account: string,
    cTokenModify: string,
    redeemTokens: number | string | BN,
    borrowAmount: number | string | BN,
  ): Promise<{
    0: string;
    1: string;
    2: string;
  }> {
    return this.contract.methods.getHypotheticalAccountLiquidity(account, cTokenModify, redeemTokens, borrowAmount).call();
  }

  getMaxBorrow(
    account: string,
    cTokenModify: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.getMaxBorrow(account, cTokenModify).send(tx);
  }

  getMaxRedeem(
    account: string, 
    cTokenModify: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.getMaxRedeem(account, cTokenModify).send(tx);
  }

  getWhitelist(): Promise<string[]> {
    return this.contract.methods.getWhitelist().call();
  }

  isComptroller(): Promise<boolean> {
    return this.contract.methods.isComptroller().call();
  }

  liquidateBorrowAllowed(
    cTokenBorrowed: string,
    cTokenCollateral: string,
    liquidator: string,
    borrower: string,
    repayAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.liquidateBorrowAllowed(cTokenBorrowed, cTokenCollateral, liquidator, borrower, repayAmount).send(tx);
  }

  liquidateBorrowVerify(
    cTokenBorrowed: string,
    cTokenCollateral: string,
    liquidator: string,
    borrower: string,
    actualRepayAmount: number | string | BN,
    seizeTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.liquidateBorrowVerify(cTokenBorrowed, cTokenCollateral, liquidator, borrower, actualRepayAmount, seizeTokens).send(tx);
  }

  liquidateCalculateSeizeTokens(
    cTokenBorrowed: string,
    cTokenCollateral: string,
    acountRepayAmount: number | string | BN,
  ): Promise<{
    0: string;
    1: string;
  }> {
    return this.contract.methods.liquidateCalculateSeizeTokens(cTokenBorrowed, cTokenCollateral, acountRepayAmount).call();
  }

  liquidationIncentiveMantissa(): Promise<string> {
    return this.contract.methods.liquidationIncentiveMantissa().call();
  }

  markets(
    arg0: string
  ): Promise<{
    isListed: boolean;
    collateralFactorMantissa: string;
    0: boolean;
    1: string;
  }> {
    return this.contract.methods.markets(arg0).call();
  }

  maxAssets(): Promise<string>  {
    return this.contract.methods.maxAssets().call();
  }

  mintAllowed(
    cToken: string,
    minter: string,
    mintAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.mintAllowed(cToken, minter, mintAmount).send(tx);
  }

  mintGuardianPaused(
    arg0: string
  ): Promise<boolean> {
    return this.contract.methods.mintGuardianPaused(arg0).call();
  }

  mintVerify(
    cToken: string, 
    minter: string,
    actualMintAmount: number | string | BN,
    mintTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.mintVerify(cToken, minter, actualMintAmount, mintTokens).send(tx);
  }

  mintWithinLimits(
    cToken: string,
    minter: string,
    actualMintAmount: number | string | BN,
    mintTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.mintWithinLimits(cToken, minter, actualMintAmount, mintTokens).send(tx);
  }

  oracle(): Promise<string> {
    return this.contract.methods.oracle().call();
  }

  pauseGuardian(): Promise<string> {
    return this.contract.methods.pauseGuardian().call();
  }

  pendingAdmin(): Promise<string> {
    return this.contract.methods.pendingAdmin().call();
  }

  pendingComptrollerImplementation(): Promise<string> {
    return this.contract.methods.pendingComptrollerImplementation().call();
  }

  redeemAllowed(
    cToken: string,
    redeemer: string,
    redeemTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.redeemAllowed(cToken, redeemer, redeemTokens).send(tx);
  }

  redeemVerify(
    cToken: string,
    redeemer: string,
    redeemAmount: number | string | BN,
    redeemTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.redeemVerify(cToken, redeemer, redeemAmount, redeemTokens).send(tx);
  }

  repayBorrowAllowed(
    cToken: string,
    payer: string,
    borrower: string,
    repayAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.repayBorrowAllowed(cToken, payer, borrower, repayAmount).send(tx);
  }

  repayBorrowVerify(
    cToken: string,
    payer: string,
    borrower: string,
    actualRepayAmount: number | string | BN,
    borrowerIndex: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.repayBorrowVerify(cToken, payer, borrower, actualRepayAmount, borrowerIndex).send(tx);
  }

  seizeAllowed(
    cTokenCollateral: string,
    cTokenBorrwed: string,
    liquidator: string,
    borrower: string,
    serizeTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.seizeAllowed(cTokenCollateral, cTokenBorrwed, liquidator, borrower, serizeTokens).send(tx);
  }

  seizeGuardianPaused(): Promise<boolean>
  {
    return this.contract.methods.seizeGuardianPaused().call();
  }

  seizeVerify(
    cTokenCollateral: string,
    cTokenBorrowed: string,
    liquidator: string,
    borrower: string,
    seizeTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.seizeVerify(cTokenCollateral, cTokenBorrowed, liquidator, borrower, seizeTokens).send(tx);
  }

  suppliers(
    arg0: string
  ): Promise<boolean> {
    return this.contract.methods.suppliers(arg0).call();
  }

  transferAllowed(
    cToken: string,
    src: string,
    dst: string,
    transferTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.transferAllowed(cToken, src, dst, transferTokens).send(tx);
  }

  transferGuardianPaused(): Promise<boolean> {
    return this.contract.methods.transferGuardianPaused().call();
  }

  transferVerify(
    cToken: string,
    src: string,
    dst: string,
    transferTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.transferVerify(cToken, src, dst, transferTokens).send(tx);
  }

  whitelist(
    arg0: string
  ): Promise<boolean> {
    return this.contract.methods.whitelist(arg0).call();
  }

  whitelistArray(
    arg0: number | string | BN
  ): Promise<string> {
    return this.contract.methods.whitelistArray(arg0).call();
  }
}

export default Comptroller;
