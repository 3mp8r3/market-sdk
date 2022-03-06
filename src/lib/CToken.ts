import { PromiEvent, TransactionReceipt } from "web3-core";
import BN from "bn.js";

import MarketContract from "./MarketContract";
import CTokenArtifact from "../abi/CToken.json";

import { CToken as CTokenWeb3Interface } from "../types/CToken";
import { NonPayableTx } from "../types/types";

import Comptroller from "./Comptroller";
import MarketSDK from "./MarketSDK";

class CToken extends MarketContract<CTokenWeb3Interface> {
  constructor(sdk: MarketSDK, address: string){
    super(sdk, address, CTokenArtifact.abi);
  }

  _acceptAdmin(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._acceptAdmin().send(tx);
  }

  _reduceReserves(
    redduceAmount: number | string | BN,
    tx?: NonPayableTx,
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._reduceReserves(redduceAmount).send(tx);
  }

  _renounceAdminRights(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._renounceAdminRights().send(tx);
  }

  _renounceFuseAdminRights(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._renounceFuseAdminRights().send(tx);
  }
  
  _setAdminFee(
    newAdminFeeMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setAdminFee(newAdminFeeMantissa).send(tx);
  }

  _setComptroller(
    newComptroller: Comptroller,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setComptroller(newComptroller.address).send(tx);
  }

  _setFuseFee(
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setFuseFee().send(tx);
  }

  _setInterestRateModal(
    newInterestRateModel: string, // change to InterestRateModel class later
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setInterestRateModel(newInterestRateModel).send(tx);
  }

  _setPendingAdmin(
    newPendingAdmin: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setPendingAdmin(newPendingAdmin).send(tx);
  }

  _setReserveFactor(
    newReserveFactorMantissa: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._setReserveFactor(newReserveFactorMantissa).send(tx);
  }

  _withdrawAdminFees(
    withdrawAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._withdrawAdminFees(withdrawAmount).send(tx);
  }

  _withdrawFuseFees(
    withdrawAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods._withdrawFuseFees(withdrawAmount).send(tx);
  }

  accrualBlockNumber(): Promise<string> {
    return this.contract.methods.accrualBlockNumber().call();
  }

  accrueInterest(): Promise<string> {
    return this.contract.methods.accrueInterest().call();
  }

  admin(): Promise<string> {
    return this.contract.methods.admin().call();
  }

  adminFeeMantissa(): Promise<string> {
    return this.contract.methods.adminFeeMantissa().call();
  }

  adminHasRights(): Promise<boolean> {
    return this.contract.methods.adminHasRights().call();
  }

  allowance(
    owner: string,
    spender: string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.allowance(owner, spender).send(tx);
  }

  approve(
    spender: string,
    amount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.approve(spender, amount).send(tx);
  }

  balanceOf(owner: string): Promise<string> {
    return this.contract.methods.balanceOf(owner).call();
  }

  balanceOfUnderlying(owner: string): Promise<string> {
    return this.contract.methods.balanceOfUnderlying(owner).call();
  }

  borrow(
    borrowAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.borrow(borrowAmount).send(tx);
  }

  borrowBalanceCurrent(account: string): Promise<string> {
    return this.contract.methods.borrowBalanceCurrent(account).call();
  }

  borrowBalanceStored(account: string): Promise<string> {
    return this.contract.methods.borrowBalanceStored(account).call();
  }

  borrowIndex(): Promise<string> {
    return this.contract.methods.borrowIndex().call();
  }

  borrowRatePerBlock(): Promise<string> {
    return this.contract.methods.borrowRatePerBlock().call();
  }
  
  decimals(): Promise<string> {
    return this.contract.methods.decimals().call();
  }

  exchangeRateCurrent(): Promise<string> {
    return this.contract.methods.exchangeRateCurrent().call();
  }

  exchangeRateStored(): Promise<string> {
    return this.contract.methods.exchangeRateStored().call();
  }

  fuseAdminHasRights(): Promise<boolean> {
    return this.contract.methods.fuseAdminHasRights().call();
  }

  fuseFeeMantissa(): Promise<string> {
    return this.contract.methods.fuseFeeMantissa().call();
  }

  getAccountSnapshot(account: string): Promise<{
    0: string;
    1: string;
    2: string;
    3: string;
  }> {
    return this.contract.methods.getAccountSnapshot(account).call();
  }

  getCash(): Promise<string> {
    return this.contract.methods.getCash().call();
  }

  interestRateModel(): Promise<string> {
    return this.contract.methods.interestRateModel().call();
  }

  isCEther(): Promise<boolean> {
    return this.contract.methods.isCEther().call();
  }

  isCToken(): Promise<boolean> {
    return this.contract.methods.isCToken().call();
  }

  liquidateBorrow(
    borrower: string,
    repayAmount: number | string | BN,
    cTokenCollateral: CToken | string,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    if(cTokenCollateral instanceof CToken){
      cTokenCollateral = cTokenCollateral.address;
    }
    return this.contract.methods.liquidateBorrow(borrower, repayAmount, cTokenCollateral).send(tx);
  }

  mint(
    mintAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.mint(mintAmount).send(tx);
  }

  name(): Promise<string> {
    return this.contract.methods.name().call();
  }

  pendingAdmin(): Promise<string> {
    return this.contract.methods.pendingAdmin().call();
  }

  redeem(
    redeemTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.redeem(redeemTokens).send(tx);
  }

  redeemUnderlying(
    redeemAdmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.redeemUnderlying(redeemAdmount).send(tx);
  }

  repayBorrow(
    repayAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.repayBorrow(repayAmount).send(tx);
  }

  repayBorrowBehalf(
    borrower: string,
    repayAmount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.repayBorrowBehalf(borrower, repayAmount).send(tx);
  }

  reserveFactorMantissa(): Promise<string> {
    return this.contract.methods.reserveFactorMantissa().call();
  }

  seize(
    liquidator: string, 
    borrower: string,
    seizeTokens: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.seize(liquidator, borrower, seizeTokens).send(tx);
  }

  supplyRatePerBlock(): Promise<string> {
    return this.contract.methods.supplyRatePerBlock().call();
  }

  symbol(): Promise<string> {
    return this.contract.methods.symbol().call();
  }

  totalAdminFees(): Promise<string> {
    return this.contract.methods.totalAdminFees().call();
  }

  totalBorrows(): Promise<string> {
    return this.contract.methods.totalBorrows().call();
  }

  totalBorrowsCurrent(): Promise<string> {
    return this.contract.methods.totalBorrowsCurrent().call();
  }

  totalFuseFees(): Promise<string> {
    return this.contract.methods.totalFuseFees().call();
  }

  totalReserves(): Promise<string> {
    return this.contract.methods.totalReserves().call();
  }

  totalSupply(): Promise<string> {
    return this.contract.methods.totalSupply().call();
  }

  transfer(
    dst: string,
    amount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.transfer(dst, amount).send(tx);
  }

  transferFrom(
    src: string,
    dst: string,
    amount: number | string | BN,
    tx?: NonPayableTx
  ): PromiEvent<TransactionReceipt> {
    return this.contract.methods.transferFrom(src, dst, amount).send(tx);
  }

  underlying(): Promise<string> {
    return this.contract.methods.underlying().call();
  }
}

export default CToken;