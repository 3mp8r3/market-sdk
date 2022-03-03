/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import BN from "bn.js";
import { ContractOptions } from "web3-eth-contract";
import { EventLog } from "web3-core";
import { EventEmitter } from "events";
import {
  Callback,
  PayableTransactionObject,
  NonPayableTransactionObject,
  BlockType,
  ContractEventLog,
  BaseContract,
} from "./types";

export interface EventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type AcceptManager = ContractEventLog<{
  oldManager: string;
  newManager: string;
  0: string;
  1: string;
}>;
export type ManagerInitialized = ContractEventLog<{
  comptroller: string;
  manager: string;
  0: string;
  1: string;
}>;
export type SetPendingManager = ContractEventLog<{
  comptroller: string;
  newPendingManager: string;
  0: string;
  1: string;
}>;

export interface MarketAdmin extends BaseContract {
  constructor(
    jsonInterface: any[],
    address?: string,
    options?: ContractOptions
  ): MarketAdmin;
  clone(): MarketAdmin;
  methods: {
    acceptAdmin(): NonPayableTransactionObject<void>;

    acceptManager(): NonPayableTransactionObject<void>;

    addRewardsDistributor(
      distributor: string
    ): NonPayableTransactionObject<void>;

    comptroller(): NonPayableTransactionObject<string>;

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
      ]
    ): NonPayableTransactionObject<void>;

    manager(): NonPayableTransactionObject<string>;

    pendingManager(): NonPayableTransactionObject<string>;

    proposeNewManager(newManager: string): NonPayableTransactionObject<void>;

    reduceReserves(
      cToken: string,
      reduceAmount: number | string | BN,
      to: string
    ): NonPayableTransactionObject<void>;

    setAdminFee(
      cToken: string,
      newAdminFeeMantissa: number | string | BN
    ): NonPayableTransactionObject<void>;

    setBorrowCaps(
      cTokens: string[],
      newBorrowCaps: (number | string | BN)[]
    ): NonPayableTransactionObject<void>;

    setCTokenActionState(
      cToken: string,
      action: number | string | BN,
      state: boolean
    ): NonPayableTransactionObject<void>;

    setCloseFactor(
      newCloseFactorMantissa: number | string | BN
    ): NonPayableTransactionObject<void>;

    setCollateralFactor(
      cToken: string,
      newCollateralFactorMantissa: number | string | BN
    ): NonPayableTransactionObject<void>;

    setGlobalActionState(
      action: number | string | BN,
      state: boolean
    ): NonPayableTransactionObject<void>;

    setIRM(cToken: string, newIRM: string): NonPayableTransactionObject<void>;

    setLiquidationIncentive(
      newLiquidationIncentiveMantissa: number | string | BN
    ): NonPayableTransactionObject<void>;

    setNameAndSymbol(
      cToken: string,
      _name: string,
      _symbol: string
    ): NonPayableTransactionObject<void>;

    setPriceOracle(newOracle: string): NonPayableTransactionObject<void>;

    setReserveFactor(
      cToken: string,
      newReserveFactorMantissa: number | string | BN
    ): NonPayableTransactionObject<void>;

    setSupplyCaps(
      cTokens: string[],
      newSupplyCaps: (number | string | BN)[]
    ): NonPayableTransactionObject<void>;

    setWhitelistEnforcement(
      enforce: boolean
    ): NonPayableTransactionObject<void>;

    setWhitelistStatuses(
      suppliers: string[],
      statuses: boolean[]
    ): NonPayableTransactionObject<void>;

    supportMarket(cToken: string): NonPayableTransactionObject<void>;

    unsupportMarket(cToken: string): NonPayableTransactionObject<void>;

    withdrawAdminFees(
      cToken: string,
      withdrawAmount: number | string | BN,
      to: string
    ): NonPayableTransactionObject<void>;
  };
  events: {
    AcceptManager(cb?: Callback<AcceptManager>): EventEmitter;
    AcceptManager(
      options?: EventOptions,
      cb?: Callback<AcceptManager>
    ): EventEmitter;

    ManagerInitialized(cb?: Callback<ManagerInitialized>): EventEmitter;
    ManagerInitialized(
      options?: EventOptions,
      cb?: Callback<ManagerInitialized>
    ): EventEmitter;

    SetPendingManager(cb?: Callback<SetPendingManager>): EventEmitter;
    SetPendingManager(
      options?: EventOptions,
      cb?: Callback<SetPendingManager>
    ): EventEmitter;

    allEvents(options?: EventOptions, cb?: Callback<EventLog>): EventEmitter;
  };

  once(event: "AcceptManager", cb: Callback<AcceptManager>): void;
  once(
    event: "AcceptManager",
    options: EventOptions,
    cb: Callback<AcceptManager>
  ): void;

  once(event: "ManagerInitialized", cb: Callback<ManagerInitialized>): void;
  once(
    event: "ManagerInitialized",
    options: EventOptions,
    cb: Callback<ManagerInitialized>
  ): void;

  once(event: "SetPendingManager", cb: Callback<SetPendingManager>): void;
  once(
    event: "SetPendingManager",
    options: EventOptions,
    cb: Callback<SetPendingManager>
  ): void;
}
