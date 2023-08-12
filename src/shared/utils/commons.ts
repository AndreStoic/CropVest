export const ContractAddressOracle =
  "0x4D51A030dcfd052B69B741D774eDC7D3F9Ac928b";
export const ContractAddressERC20 =
  "0xEd03aF9A9E0eB527318070Df2526E67d90325A8b";
export const ContractAddressCropCollection =
  "0xed363faFaB6F44B14C6736ccf988709023073A92";
export const ContractAddressCropVault =
  "0xa36755270D7A53290140257739aBED5f1D3eB2F1";

export const pairs = { 0: "cocoa", 1: "soybeans", 2: "wheat", 3: "coffee" };

export const ERC20TokenDecimals = 18;
export const NFTDecimals = 18;

export const Crops = {
  WHEAT: 0,
  CORN: 1,
  RICE: 2,
  SOYBEAN: 3,
};

const COUNT_ABBRS = [
  "",
  "K",
  "M",
  "B",
  "t",
  "q",
  "s",
  "S",
  "o",
  "n",
  "d",
  "U",
  "D",
  "T",
  "Qt",
  "Qd",
  "Sd",
  "St",
];

export function formatNumber(count: number, decimals = 2) {
  const i = count < 1 ? 0 : Math.floor(Math.log(count) / Math.log(1000));
  return (
    parseFloat((count / 1000 ** i).toFixed(decimals)).toLocaleString() +
    COUNT_ABBRS[i]
  );
}
