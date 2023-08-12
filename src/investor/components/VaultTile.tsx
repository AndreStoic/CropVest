import React from "react";
import { ContractAddress } from "shared/utils/config";
import VaultModal from "./VaultModal";
import { useEffect, useState, useContext } from "react";

interface IVaultItemProps {
  name: string;
  description: string;
  image?: string;
  tags?: string[];
  url?: string;
  TVL: number;
  APR: number; 
  Capacity: number;
  tokenPrice: number;
  tokenDenom: string;
  assets: any;
}

const VaultTile = (props: IVaultItemProps) => {

  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);

  const handleClick = () => {
    setIsVaultModalOpen(true)

  };

  const data = [{name: "Test", description: "Test", image: "", tags:"", url:"https://test", TVL: 100000, APR: 0.001, Capacity:10, tokenPrice: "0.01", tokenDenom:"USDC"}]

  return (
    <>
    <VaultModal
    open={isVaultModalOpen}
    onClose={() => {
      setIsVaultModalOpen(false);
      document.body.classList.remove("overflow-hidden");
    }}
    asset = {data}
  />
    <a
      onClick={handleClick}
      className="group col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3 hover:bg-gradient-to-r from-cyan-500 to-purple-500 p-0.5 rounded-xl hover:shadow-2xl hover:shadow-cyan-500/40"
    >

      <div className="bg-white group-hover:bg-white/95 dark:bg-neutral-800 group-hover:dark:bg-neutral-800/95 border border-neutral-200 dark:border-neutral-700 p-4 flex flex-col h-full rounded-xl overflow-hidden text-center sm:text-left">
        {/* Image */}
        {props.image && (
          <img
            src={props.image}
            alt={`${props.name} logo`}
            className="w-16 h-16 rounded-xl block mb-4 bg-neutral-100 dark:bg-neutral-900 flex-initial mx-auto sm:mx-0"
          />
        )}

        {/* Name */}
        <div className="text-xl font-semibold flex-initial mb-1">
          {props.name}
        </div>

        {/* Description */}
        <div className="text-neutral-400 flex-1">{props.description}</div>

        {/* TVL */}
        <div className="text-neutral-400 flex-1">{`TVL: ${props.TVL}`}</div>

        {/* APR */}
        <div className="text-neutral-400 flex-1">{`APR: ${props.APR}`}</div>

        {/* Capacity */}
        <div className="text-neutral-400 flex-1">{`Capacity: ${props.Capacity}`}</div>

        {/* Token Price */}
        <div className="text-neutral-400 flex-1">{`Token Price: ${props.tokenPrice}`}</div>

        {/* Tags */}
        {props.tags?.length! > 0 && (
          <div className="space-x-2 mt-4 flex-initial">
          </div>
        )}
      </div>
    </a>
    </>
  );
};

export default VaultTile;
