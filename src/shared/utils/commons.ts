export const ContractAddressOracle = "0xa36755270D7A53290140257739aBED5f1D3eB2F1"; 

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