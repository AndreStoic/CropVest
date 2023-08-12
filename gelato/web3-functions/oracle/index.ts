import {
  Web3Function,
  Web3FunctionContext,
} from "@gelatonetwork/web3-functions-sdk";
import { Contract } from "@ethersproject/contracts";
import ky from "ky"; // we recommend using ky as axios doesn't support fetch by default

type PriceData = {
  name: string;
  interval: string;
  unit: string;
  data: Array<{
    date: string;
    value: string;
  }>;
};

const Crops = {
  COFEE: 0,
  WHEAT: 1,
  CORN: 2,
  SUGAR: 3,
};

const ORACLE_ABI = [
  "function lastUpdated(uint256) external view returns(uint256)",
  "function updatePrice(uint256,uint256)",
];

Web3Function.onRun(async (context: Web3FunctionContext) => {
  const { userArgs, multiChainProvider } = context;
  const cropId = 1;

  const provider = multiChainProvider.default();
  // Retrieve Last oracle update time
  const oracleAddress =
    (userArgs.oracle as string) ?? "0x4D51A030dcfd052B69B741D774eDC7D3F9Ac928b";
  let lastUpdated;
  let oracle;
  try {
    oracle = new Contract(oracleAddress, ORACLE_ABI, provider);
    lastUpdated = parseInt(await oracle.lastUpdated(cropId));
    console.log(`Last oracle update: ${lastUpdated}`);
  } catch (err) {
    return { canExec: false, message: `Rpc call failed` };
  }

  // Check if it's ready for a new update
  const nextUpdateTime = lastUpdated + 3600; // 1h
  const timestamp = (await provider.getBlock("latest")).timestamp;
  console.log(`Next oracle update: ${nextUpdateTime}`);
  if (timestamp < nextUpdateTime) {
    return { canExec: false, message: `Time not elapsed` };
  }

  let price = "0";
  try {
    const alphavantageAPI = `https://www.alphavantage.co/query?function=WHEAT&interval=monthly&apikey=demo`;

    const priceData: PriceData = await ky
      .get(alphavantageAPI, { timeout: 5_000, retry: 0 })
      .json();

    console.log(priceData);
    price = Number(priceData.data[0].value).toFixed(18).replace(".", "");
  } catch (err) {
    return { canExec: false, message: `AplhaVantage call failed` };
  }
  console.log(`Updating price: ${price}`);

  // Return execution call data
  return {
    canExec: true,
    callData: [
      {
        to: oracleAddress,
        data: oracle.interface.encodeFunctionData("updatePrice", [
          cropId,
          price,
        ]),
      },
    ],
  };
});
