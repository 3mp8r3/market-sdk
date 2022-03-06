import BN from "bn.js";
import Comptroller from "./Comptroller";
import CToken from "./CToken";
import MarketSDK from "./MarketSDK";

export interface Pool {
  name: string;
  creator: string;
  comptroller: Comptroller;
  blockPosted: BN;
  timestampPosted: BN;
};

export function normalizePool(raw: {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
}, sdk: MarketSDK): Pool {
  return {
    name: raw[0],
    creator: raw[1],
    comptroller: new Comptroller(sdk, raw[2]),
    blockPosted: new BN(raw[3]),
    timestampPosted: new BN(raw[4]),
  };
}

export function serializePool(pool: Pool): [
  string,
  string,
  string,
  number | string | BN,
  number | string | BN
] {
  return [
    pool.name,
    pool.creator,
    pool.comptroller.address,
    pool.blockPosted,
    pool.timestampPosted
  ];
}

export interface PoolAsset {
  cToken: CToken;
  underlyingToken: string;
  underlyingName: string;
  underlyingSymbol: string;
  underlyinDecimals: BN;
  underlyingBalance: BN;
  supplyRatePerBlock: BN;
  borrowRatePerBlock: BN;
  totalSupply: BN;
  totalBorrow: BN;
  supplyBalance: BN;
  borrowBalance: BN;
  liquidity: BN;
  membership: boolean;
  exchangeRate: BN;
  underlyingPrice: BN;
  oracle: string;
  collateralFactor: BN;
  reserveFactor: BN;
  adminFee: BN;
  fuseFee: BN;
}

export function normalizePoolAsset(raw: {
  0: string;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  7: string;
  8: string;
  9: string;
  10: string;
  11: string;
  12: string;
  13: boolean;
  14: string;
  15: string;
  16: string;
  17: string;
  18: string;
  19: string;
  20: string;
}, sdk: MarketSDK): PoolAsset {
  return {
    cToken: new CToken(sdk, raw[0]),
    underlyingToken: raw[1],
    underlyingName: raw[2],
    underlyingSymbol: raw[3],
    underlyinDecimals: new BN(raw[4]),
    underlyingBalance: new BN(raw[5]),
    supplyRatePerBlock: new BN(raw[6]),
    borrowRatePerBlock: new BN(raw[7]),
    totalSupply: new BN(raw[8]),
    totalBorrow: new BN(raw[9]),
    supplyBalance: new BN(raw[10]),
    borrowBalance: new BN(raw[11]),
    liquidity: new BN(raw[12]),
    membership: raw[13],
    exchangeRate: new BN(raw[14]),
    underlyingPrice: new BN(raw[15]),
    oracle: raw[16],
    collateralFactor: new BN(raw[17]),
    reserveFactor: new BN(raw[18]),
    adminFee: new BN(raw[19]),
    fuseFee: new BN(raw[20]),
  }
}

export interface PoolUser {
  account: string;
  totalBorrow: BN;
  totalCollateral: BN;
  health: BN;
  assets: PoolAsset[];
}

export function normalizePoolUser(raw: {
  0: string;
  1: string;
  2: string;
  3: string;
  4: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
    13: boolean;
    14: string;
    15: string;
    16: string;
    17: string;
    18: string;
    19: string;
    20: string;
  }[]
}, sdk: MarketSDK): PoolUser {
  return {
    account: raw[0],
    totalBorrow: new BN(raw[1]),
    totalCollateral: new BN(raw[2]),
    health: new BN(raw[3]),
    assets: raw[4].map(asset => normalizePoolAsset(asset, sdk))
  };
}

export interface CTokenOwnership {
  cToken: CToken;
  admin: string;
  admingHasRights: boolean;
  fuseAdminHasRights: boolean;
}

export function normalizeCTokenOwnership(raw: {
  0: string;
  1: string;
  2: boolean;
  3: boolean;
}, sdk: MarketSDK): CTokenOwnership {
  return {
    cToken: new CToken(sdk, raw[0]),
    admin: raw[1],
    admingHasRights: raw[2],
    fuseAdminHasRights: raw[3],
  };
}
