import { PromiEvent, TransactionReceipt } from "web3-core";
import BN from "bn.js";

import CToken from "./CToken";
import MarketContract from "./MarketContract";
import ComptrollerArtifact from "../abi/Comptroller.json";

import { Comptroller as ComptrollerWeb3Interface } from "../types/Comptroller";
import { NonPayableTx } from "../types/types";

import MarketSDK from "./MarketSDK";

class Comptroller extends MarketContract<ComptrollerWeb3Interface> {
  constructor(sdk: MarketSDK, address: string){
    super(sdk, address, ComptrollerArtifact.abi);
  }

  _become(
    unitroller: string, 
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._become(unitroller).send(tx);
  }

  _borrowGuardianPaused(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods._borrowGuardianPaused().call(tx);
  }

  _mintGuardianPaused(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods._mintGuardianPaused().call(tx);
  }

  _setBorrowPaused(
    cToken: CToken | string, 
    state: boolean, 
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods._setBorrowPaused(cToken, state).send(tx);
  }

  _setCloseFactor(
    newCloseFactorMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setCloseFactor(newCloseFactorMantissa).send(tx);
  }

  _setCollateralFactor(
    cToken: CToken | string,
    newCollateralFactorMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
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
    cToken: CToken | string,
    state: boolean,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
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
    cToken: CToken | string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods._supportMarket(cToken).send(tx);
  }

  _supportMarketAndSetCollateralFactor(
    cToken: CToken | string,
    newCollateralFactorMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods._supportMarketAndSetCollateralFactor(cToken, newCollateralFactorMantissa).send(tx);
  }

  _unsupportMarket(
    cToken: CToken | string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods._unsupportMarket(cToken).send(tx);
  }

  accountAssets(
    arg0: string,
    arg1: number | string | BN,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.accountAssets(arg0, arg1).call(tx);
  }

  admin(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.admin().call(tx);
  }

  adminHasRights(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.adminHasRights().call(tx);
  }

  allBorrowers(
    arg0: number | string | BN,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.allBorrowers(arg0).call(tx);
  }

  allMarkets(
    arg0: number | string | BN,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.allMarkets(arg0).call(tx);
  }

  borrowAllowed(
    cToken: CToken | string,
    borrower: string,
    borrowAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods.borrowAllowed(cToken, borrower, borrowAmount).send(tx);
  }

  borrowGuardianPaused(
    arg0: string,
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.borrowGuardianPaused(arg0).call(tx);
  }

  borrowVerify(
    cToken: CToken | string,
    borrower: string,
    borrowAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods.borrowVerify(cToken, borrower, borrowAmount).send(tx);
  }

  borrowWithinLimits(
    cToken: CToken | string,
    accountBorrowsNew: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods.borrowWithinLimits(cToken, accountBorrowsNew).send(tx);
  }

  cTokensByUnderlying(
    arg0: string,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.cTokensByUnderlying(arg0).call(tx);
  }

  checkMembership(
    account: string,
    cToken: CToken | string,
    tx?: NonPayableTx
  ): Promise<boolean> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods.checkMembership(account, cToken).call(tx);
  }

  closeFactorMantissa(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.closeFactorMantissa().call(tx);
  }

  comptrollerImplementation(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.comptrollerImplementation().call(tx);
  }

  enforceWhitelist(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.enforceWhitelist().call(tx);
  }

  enterMarkets(
    cTokens: (CToken | string)[],
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cTokens = cTokens.map(cToken => cToken instanceof CToken ? cToken.address : cToken);
    return this.contract.methods.enterMarkets(<string[]>cTokens).send(tx);
  }

  exitMarket(
    cTokenAddress: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.exitMarket(cTokenAddress).send(tx);
  }

  fuseAdminHasRights(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.fuseAdminHasRights().call(tx);
  }

  getAccountLiquidity(
    account: string,
    tx?: NonPayableTx
  ): Promise<{
    0: string;
    1: string;
    2: string;
  }> {
    return this.contract.methods.getAccountLiquidity(account).call(tx);
  }

  getAllBorrowers(
    tx?: NonPayableTx
  ): Promise<string[]> {
    return this.contract.methods.getAllBorrowers().call(tx);
  }

  getAllMarkets(
    tx?: NonPayableTx
  ): Promise<string[]> {
    return this.contract.methods.getAllMarkets().call(tx);
  }

  getAssetsIn(
    account: string,
    tx?: NonPayableTx
  ): Promise<string[]> {
    return this.contract.methods.getAssetsIn(account).call(tx);
  }

  getHypotheticalAccountLiquidity(
    account: string,
    cTokenModify: CToken | string,
    redeemTokens: number | string | BN,
    borrowAmount: number | string | BN,
    tx?: NonPayableTx
  ): Promise<{
    0: string;
    1: string;
    2: string;
  }> {
    cTokenModify = cTokenModify instanceof CToken ? cTokenModify.address : cTokenModify;
    return this.contract.methods.getHypotheticalAccountLiquidity(account, cTokenModify, redeemTokens, borrowAmount).call(tx);
  }

  getMaxBorrow(
    account: string,
    cTokenModify: CToken | string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cTokenModify = cTokenModify instanceof CToken ? cTokenModify.address : cTokenModify;
    return this.contract.methods.getMaxBorrow(account, cTokenModify).send(tx);
  }

  getMaxRedeem(
    account: string,
    cTokenModify: CToken | string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cTokenModify = cTokenModify instanceof CToken ? cTokenModify.address : cTokenModify;
    return this.contract.methods.getMaxRedeem(account, cTokenModify).send(tx);
  }

  getWhitelist(
    tx?: NonPayableTx
  ): Promise<string[]> {
    return this.contract.methods.getWhitelist().call(tx);
  }

  isComptroller(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.isComptroller().call(tx);
  }

  liquidateBorrowAllowed(
    cTokenBorrowed: CToken | string,
    cTokenCollateral: CToken | string,
    liquidator: string,
    borrower: string,
    repayAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cTokenBorrowed = cTokenBorrowed instanceof CToken ? cTokenBorrowed.address : cTokenBorrowed;
    cTokenCollateral = cTokenCollateral instanceof CToken ? cTokenCollateral.address : cTokenCollateral;
    return this.contract.methods.liquidateBorrowAllowed(cTokenBorrowed, cTokenCollateral, liquidator, borrower, repayAmount).send(tx);
  }

  liquidateBorrowVerify(
    cTokenBorrowed: CToken | string,
    cTokenCollateral: CToken | string,
    liquidator: string,
    borrower: string,
    actualRepayAmount: number | string | BN,
    seizeTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cTokenBorrowed = cTokenBorrowed instanceof CToken ? cTokenBorrowed.address : cTokenBorrowed;
    cTokenCollateral = cTokenCollateral instanceof CToken ? cTokenCollateral.address : cTokenCollateral;
    return this.contract.methods.liquidateBorrowVerify(cTokenBorrowed, cTokenCollateral, liquidator, borrower, actualRepayAmount, seizeTokens).send(tx);
  }

  liquidateCalculateSeizeTokens(
    cTokenBorrowed: CToken | string,
    cTokenCollateral: CToken | string,
    acountRepayAmount: number | string | BN,
    tx?: NonPayableTx
  ): Promise<{
    0: string;
    1: string;
  }> {
    cTokenBorrowed = cTokenBorrowed instanceof CToken ? cTokenBorrowed.address : cTokenBorrowed;
    cTokenCollateral = cTokenCollateral instanceof CToken ? cTokenCollateral.address : cTokenCollateral;
    return this.contract.methods.liquidateCalculateSeizeTokens(cTokenBorrowed, cTokenCollateral, acountRepayAmount).call(tx);
  }

  liquidationIncentiveMantissa(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.liquidationIncentiveMantissa().call(tx);
  }

  markets(
    arg0: string,
    tx?: NonPayableTx
  ): Promise<{
    isListed: boolean;
    collateralFactorMantissa: string;
    0: boolean;
    1: string;
  }> {
    return this.contract.methods.markets(arg0).call(tx);
  }

  maxAssets(
    tx?: NonPayableTx
  ): Promise<string>  {
    return this.contract.methods.maxAssets().call(tx);
  }

  mintAllowed(
    cToken: CToken | string,
    minter: string,
    mintAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods.mintAllowed(cToken, minter, mintAmount).send(tx);
  }

  mintGuardianPaused(
    arg0: string,
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.mintGuardianPaused(arg0).call(tx);
  }

  mintVerify(
    cToken: CToken | string,
    minter: string,
    actualMintAmount: number | string | BN,
    mintTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods.mintVerify(cToken, minter, actualMintAmount, mintTokens).send(tx);
  }

  mintWithinLimits(
    cToken: CToken | string,
    minter: string,
    actualMintAmount: number | string | BN,
    mintTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods.mintWithinLimits(cToken, minter, actualMintAmount, mintTokens).send(tx);
  }

  oracle(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.oracle().call(tx);
  }

  pauseGuardian(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.pauseGuardian().call(tx);
  }

  pendingAdmin(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.pendingAdmin().call(tx);
  }

  pendingComptrollerImplementation(
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.pendingComptrollerImplementation().call(tx);
  }

  redeemAllowed(
    cToken: CToken | string,
    redeemer: string,
    redeemTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods.redeemAllowed(cToken, redeemer, redeemTokens).send(tx);
  }

  redeemVerify(
    cToken: CToken | string,
    redeemer: string,
    redeemAmount: number | string | BN,
    redeemTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods.redeemVerify(cToken, redeemer, redeemAmount, redeemTokens).send(tx);
  }

  repayBorrowAllowed(
    cToken: CToken | string,
    payer: string,
    borrower: string,
    repayAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods.repayBorrowAllowed(cToken, payer, borrower, repayAmount).send(tx);
  }

  repayBorrowVerify(
    cToken: CToken | string,
    payer: string,
    borrower: string,
    actualRepayAmount: number | string | BN,
    borrowerIndex: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods.repayBorrowVerify(cToken, payer, borrower, actualRepayAmount, borrowerIndex).send(tx);
  }

  seizeAllowed(
    cTokenBorrowed: CToken | string,
    cTokenCollateral: CToken | string,
    liquidator: string,
    borrower: string,
    serizeTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cTokenBorrowed = cTokenBorrowed instanceof CToken ? cTokenBorrowed.address : cTokenBorrowed;
    cTokenCollateral = cTokenCollateral instanceof CToken ? cTokenCollateral.address : cTokenCollateral;
    return this.contract.methods.seizeAllowed(cTokenCollateral, cTokenBorrowed, liquidator, borrower, serizeTokens).send(tx);
  }

  seizeGuardianPaused(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.seizeGuardianPaused().call(tx);
  }

  seizeVerify(
    cTokenBorrowed: CToken | string,
    cTokenCollateral: CToken | string,
    liquidator: string,
    borrower: string,
    seizeTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cTokenBorrowed = cTokenBorrowed instanceof CToken ? cTokenBorrowed.address : cTokenBorrowed;
    cTokenCollateral = cTokenCollateral instanceof CToken ? cTokenCollateral.address : cTokenCollateral;
    return this.contract.methods.seizeVerify(cTokenCollateral, cTokenBorrowed, liquidator, borrower, seizeTokens).send(tx);
  }

  suppliers(
    arg0: string,
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.suppliers(arg0).call(tx);
  }

  transferAllowed(
    cToken: CToken | string,
    src: string,
    dst: string,
    transferTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods.transferAllowed(cToken, src, dst, transferTokens).send(tx);
  }

  transferGuardianPaused(
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.transferGuardianPaused().call(tx);
  }

  transferVerify(
    cToken: CToken | string,
    src: string,
    dst: string,
    transferTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    cToken = cToken instanceof CToken ? cToken.address : cToken;
    return this.contract.methods.transferVerify(cToken, src, dst, transferTokens).send(tx);
  }

  whitelist(
    arg0: string,
    tx?: NonPayableTx
  ): Promise<boolean> {
    return this.contract.methods.whitelist(arg0).call(tx);
  }

  whitelistArray(
    arg0: number | string | BN,
    tx?: NonPayableTx
  ): Promise<string> {
    return this.contract.methods.whitelistArray(arg0).call(tx);
  }
}

export default Comptroller;
