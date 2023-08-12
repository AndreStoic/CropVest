import {
  faDesktop,
  faMobileScreen,
  faWallet,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import queryString from "query-string";

interface IPoolProps {
  open: boolean;
  onClose: any;
  assets: any;
}

class PoolModal extends React.Component<IPoolProps> {
  render() {
    if (!this.props.open) return null;

    return (
      <>
        {/* Outer */}
        <div
          className="fixed top-0 left-0 right-0 bottom-0 bg-black/80 dark:bg-black/80 z-50 flex items-center justify-center h-screen w-screen"
          onClick={this.props.onClose}
        >
          {/* Inner */}
          <div className="relative py-[6rem] onEnter_fadeInDown h-screen w-screen overflow-scroll scrollbar-hide flex items-center justify-center">
            <div className="mx-auto px-4">
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
                {this.props.assets?.length > 0 && (
            <>
              {this.props.assets.map((asset: any) => (console.log(asset),
                <div className="bg-white group-hover:bg-white/95 dark:bg-neutral-800 group-hover:dark:bg-neutral-800/95 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col h-full rounded-xl overflow-hidden text-center sm:text-left">
                {/* Image */}
                {asset.image && (
                  <img
                    src={asset.image}
                    alt={`${asset.name} logo`}
                    className="w-16 h-16 rounded-xl block mb-4 bg-neutral-100 dark:bg-neutral-900 flex-initial mx-auto sm:mx-0"
                  />
                )}
        
                {/* Name */}
                <div className="text-xl font-semibold flex-initial mb-1">
                  {asset.name}
                </div>
        
                {/* Description */}
                <div className="text-neutral-400 flex-1">{asset.description}</div>
        
                {/* TVL */}
                <div className="text-neutral-400 flex-1">{`TVL: ${asset.TVL}`}</div>
        
                {/* APR */}
                <div className="text-neutral-400 flex-1">{`APR: ${asset.APR}`}</div>
        
                {/* Capacity */}
                <div className="text-neutral-400 flex-1">{`Capacity: ${asset.Capacity}`}</div>
        
                {/* Token Price */}
                <div className="text-neutral-400 flex-1">{`Token Price: ${asset.tokenPrice}`}</div>
        
                {/* Tags */}
                {asset.tags?.length! > 0 && (
                  <div className="space-x-2 mt-4 flex-initial">
                  </div>
                )}
              </div>

              ))}
            </>
          )}
          
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default PoolModal;
