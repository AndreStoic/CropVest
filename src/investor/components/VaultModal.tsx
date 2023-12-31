import {
  faDesktop,
  faMobileScreen,
  faWallet,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import queryString from "query-string";
import Header from "./Header";
import "react-toastify/dist/ReactToastify.css";
import { NFTDecimals, formatNumber } from "shared/utils/commons";
import { ERC20TokenDecimals, ContractAddressERC20 } from "shared/utils/commons";

interface IVaultProps {
  open: boolean;
  onClose: any;
  asset: any; 
  invest: any;
  withdrawInvestment: any;
  setAmount: any;
}

class VaultModal extends React.Component<IVaultProps> {

  render() {
    if (!this.props?.open) return null;


      // Initialize totalValue
  let totalValue = 0;

  // Assuming this.props.asset?.NFTs is an object or array.
  if (this.props.asset?.NFTs) {
    Array.from(Object.values(this.props.asset?.NFTs)).forEach((NFT: any, i) => {
      totalValue += NFT[Object.keys(NFT)[0]]/(10**NFTDecimals)*this.props.asset.prices[i];
    });
  }
    

    return (
      <>
      {/* Outer */}
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/80 z-50 flex justify-center items-center"
        onClick={this.props?.onClose}
      >
        {/* Inner */}
        <div className="absolute top-[5%] w-screen h-screen onEnter_fadeInDown center">
          <div className="mx-auto max-w-4xl px-4">
              <div
                className="bg-white dark:bg-neutral-900 p-8 rounded-2xl"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                {/* Header */}
                <div className="mb-0 text-right">
                  <button
                    onClick={this.props.onClose}
                    className="text-neutral-500 dark:text-neutral-500 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors px-1.5 py-1 rounded-lg text-xl"
                  >
                    <FontAwesomeIcon icon={faXmark} className="fa-fw" />
                  </button>
                </div>
                <Header
          title="Vault"
          description="Invest into the vault by depositing USDC."
        />
        <div className="flex center justify-center">
        <div className="mb-4 bg-white group-hover:bg-white/95 dark:bg-neutral-800 group-hover:dark:bg-neutral-800/95 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col h-full rounded-xl overflow-hidden text-center sm:text-left mr-4">
        {/* Image */}
        {this.props?.image && (
          <img
            src={this.props?.image}
            alt={`${this.props?.name} logo`}
            className="w-16 h-16 rounded-xl block mb-4 bg-neutral-100 dark:bg-neutral-900 flex-initial mx-auto sm:mx-0"
          />
        )}

        {/* Name */}
        <div className="text-xl font-semibold flex-initial mb-1">
          Vault Data
        </div>

        {/* Description */}
        <div className="text-neutral-400 flex-1">{this.props?.asset.description}</div>

        {/* TVL */}
        <div className="text-neutral-400 flex-1">{`TVL: ${formatNumber(this.props.asset.TVL)} ${this.props.asset.tokenDenom}`}</div>

        {/* APR */}
        <div className="text-neutral-400 flex-1">{`APR: ${(this.props.asset.APR*100).toFixed(2)} %`}</div>

        {/* Value */}

        <div className="text-neutral-400 flex-1">{`Underlying Value: ${formatNumber(totalValue)} ${this.props.asset.tokenDenom}`}</div>

        {/* Token Price */}
        {/* <div className="text-neutral-400 flex-1">{`Token Price: ${this.props.asset.tokenPrice} ${this.props.asset.tokenDenom}`}</div> */}

        {/* Location */}
        {/* <div className="text-neutral-400 flex-1">{`Location: ${this.props.asset.location}`}</div> */}

        {/* Risk factor */}
       {/*  <div className="text-neutral-400 flex-1">{`Risk factor: ${this.props.asset.riskFactor}`}</div> */}

      </div>
      <div className="mb-4 bg-white group-hover:bg-white/95 dark:bg-neutral-800 group-hover:dark:bg-neutral-800/95 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col h-full rounded-xl overflow-hidden text-center sm:text-left">

        <div className="text-xl font-semibold flex-initial mb-1">
          Included Crop Fields in this Vault:
        </div>
        {Object.values(this.props.asset?.NFTs).length > 0 && (
            <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
              {Array.from(Object.values(this.props.asset?.NFTs)).map((NFT: any, i) => (console.log(this.props.asset.prices),
              <div className="mb-4 bg-white group-hover:bg-white/95 dark:bg-neutral-800 group-hover:dark:bg-neutral-800/95 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col h-full rounded-xl overflow-hidden text-center sm:text-left">
        {/* Name */}
        <div className="text-xl font-semibold flex-initial mb-1">
          {Object.keys(NFT)[0].charAt(0).toUpperCase() + Object.keys(NFT)[0].slice(1)}
        </div>

        {/* Description */}
        <div className="text-neutral-400 flex-1">{NFT.description}</div>

        {/* Weight */}
        <div className="text-neutral-400 flex-1">{`Weight: ${formatNumber(NFT[Object.keys(NFT)[0]]/(10**NFTDecimals))} Tons`}</div>

        {/* Price */}
        <div className="text-neutral-400 flex-1">{`Price: ${formatNumber(this.props.asset.prices[i])} ${this.props.asset.tokenDenom}`}</div>

        {/* Value */}
        <div className="text-neutral-400 flex-1">{`Value: ${formatNumber(NFT[Object.keys(NFT)[0]]/(10**NFTDecimals)*this.props.asset.prices[i])} ${this.props.asset.tokenDenom}`}</div>

        </div>

      ))}
      </div>
    )}
        </div>
        </div>
      <div className="mb-4 bg-white group-hover:bg-white/95 dark:bg-neutral-800 group-hover:dark:bg-neutral-800/95 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col h-full rounded-xl overflow-hidden text-left sm:text-left py-4">
      <div className="text-neutral-400 flex-1">{`Your vault investment: ${formatNumber(this.props.asset.investment)} ${this.props.asset.tokenDenom} (${(this.props.asset.investment/this.props.asset.TVL*100).toFixed(10)} % of total shares)`}</div>
      </div>

      <div className="mb-4 bg-white group-hover:bg-white/95 dark:bg-neutral-800 group-hover:dark:bg-neutral-800/95 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col h-full rounded-xl overflow-hidden text-center sm:text-right">
    {/* Vault share */}
    <div className="flex items-center justify-between"> 
        <div className="flex items-center space-x-4"> {/* Nested flex for input and tokenDenom */}
            <input
                onChange={e => this.props.setAmount(e.target.value)}
                type="number"
                min="0"
                step="0.001"
                className="text focus:z-10 block min-w-0 bg-neutral-100 dark:bg-neutral-900 text-black dark:text-white px-4 rounded-lg disabled:placeholder-neutral-300 dark:disabled:placeholder-neutral-700 transition-colors font-medium focus:outline-0 focus:ring-2 ring-sky-500/40 py-2"
                name="toValue"
                id="toValue"
                placeholder="0"
            />
            <div className="mr-8">{`${this.props.asset.tokenDenom}`}</div> {/* Adjust the right margin here */}
        </div>
        <div className="flex items-center space-x-4 ml-auto"> {/* Using ml-auto to push the buttons to the right */}
            <button className="bg-blue-600 hover:bg-blue-500 font-semibold px-4 py-2 rounded-md text-white"
                    onClick={() => this.props.invest()}>
                Invest 
            </button>
            <button className="bg-neutral-800 hover:bg-neutral-700 font-semibold px-4 py-2 rounded-md text-white"
                    onClick={() => this.props.withdrawInvestment()}>
                Withdraw Investment
            </button>
        </div>
    </div>
</div>
            </div>
          </div>
        </div>
        </div>
      </>
    );
  }
}

export default VaultModal;
