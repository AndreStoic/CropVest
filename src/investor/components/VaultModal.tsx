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

interface IVaultProps {
  open: boolean;
  onClose: any;
  asset: any; 
}

class VaultModal extends React.Component<IVaultProps> {

  render() {
    if (!this.props.open) return null;

    return (
      <>
      {/* Outer */}
      <div
        className="fixed top-0 left-0 right-0 bottom-0 bg-black/80 z-50 flex justify-center items-center"
        onClick={this.props.onClose}
      >
        {/* Inner */}
        <div className="absolute top-[5%] w-[60vw] onEnter_fadeInDown flex center">
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
                <div className="bg-white group-hover:bg-white/95 dark:bg-neutral-800 group-hover:dark:bg-neutral-800/95 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col h-full rounded-xl overflow-hidden text-center sm:text-left">
                <Header
          title="Vault"
          description="Invest into the vault by depositing USDC."
        />
        {/* Image */}
        {this.props.image && (
          <img
            src={this.props.image}
            alt={`${this.props.name} logo`}
            className="w-16 h-16 rounded-xl block mb-4 bg-neutral-100 dark:bg-neutral-900 flex-initial mx-auto sm:mx-0"
          />
        )}

        {/* Name */}
        <div className="text-xl font-semibold flex-initial mb-1">
          {this.props.asset.name}
        </div>

        {/* Description */}
        <div className="text-neutral-400 flex-1">{this.props.asset.description}</div>

        {/* TVL */}
        <div className="text-neutral-400 flex-1">{`TVL: ${this.props.asset.TVL}`}</div>

        {/* APR */}
        <div className="text-neutral-400 flex-1">{`APR: ${this.props.asset.APR}`}</div>

        {/* Capacity */}
        <div className="text-neutral-400 flex-1">{`Capacity: ${this.props.asset.Capacity}`}</div>

        {/* Token Price */}
        <div className="text-neutral-400 flex-1">{`Token Price: ${this.props.asset.tokenPrice}`}</div>

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
