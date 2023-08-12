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
import { formatNumber } from "shared/utils/commons";

interface IVaultProps {
  open: boolean;
  onClose: any;
  asset: any; 
  invest: any;
  withdrawInvestment: any;
}

class VaultModal extends React.Component<IVaultProps> {

  render() {
    if (!this.props?.open) return null;

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
        <div className="flex center  justify-center">
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

        {/* Capacity */}
        <div className="text-neutral-400 flex-1">{`Capacity: ${formatNumber(this.props.asset.Capacity)} ${this.props.asset.tokenDenom}`}</div>

        {/* Token Price */}
        {/* <div className="text-neutral-400 flex-1">{`Token Price: ${this.props.asset.tokenPrice} ${this.props.asset.tokenDenom}`}</div> */}

        {/* Location */}
        {/* <div className="text-neutral-400 flex-1">{`Location: ${this.props.asset.location}`}</div> */}

        {/* Risk factor */}
        <div className="text-neutral-400 flex-1">{`Risk factor: ${this.props.asset.riskFactor}`}</div>

      </div>
      <div className="mb-4 bg-white group-hover:bg-white/95 dark:bg-neutral-800 group-hover:dark:bg-neutral-800/95 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col h-full rounded-xl overflow-hidden text-center sm:text-left">

        <div className="text-xl font-semibold flex-initial mb-1">
          Included Crop Field in this Vault:
        </div>
        {this.props.asset?.NFTs.length > 0 && (
            <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
              {this.props.asset?.NFTs.map((NFT: any) => (console.log(NFT),
              <div className="mb-4 bg-white group-hover:bg-white/95 dark:bg-neutral-800 group-hover:dark:bg-neutral-800/95 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col h-full rounded-xl overflow-hidden text-center sm:text-left">
        {/* Name */}
        <div className="text-xl font-semibold flex-initial mb-1">
          {NFT.name}
        </div>

        {/* Description */}
        <div className="text-neutral-400 flex-1">{NFT.description}</div>

        {/* Minimum Value */}
        <div className="text-neutral-400 flex-1">{`Capacity: ${formatNumber(NFT.minimumValue)} ${this.props.asset.tokenDenom}`}</div>

        {/* Location */}
        <div className="text-neutral-400 flex-1">{`Location: ${NFT.location}`}</div>

        {/* Risk factor */}
        <div className="text-neutral-400 flex-1">{`Risk factor: ${NFT.riskFactor}`}</div>

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
                value={this.props.amount}
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
