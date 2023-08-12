import React from "react";
import VaultModal from "./VaultModal";
import { useEffect, useState, useContext } from "react";
import { MetamaskContext } from "shared/context/MetamaskContext";
import { formatNumber } from "shared/utils/commons";
import { ethers } from 'ethers';
import abi from 'shared/ContractABIs/CropVault.json';
import BigNumber from "bignumber.js";

interface IVaultItemProps {
  name: string;
  description: string;
  image?: string;
  tags?: string[];
  url?: string;
  TVL: number;
  APR: number; 
  minimumValue: number;
  tokenPrice: number;
  tokenDenom: string;
  asset: any;
  contractAddress: string;
}

const VaultTile = (props: IVaultItemProps) => {

  const {
    polygon,
    walletAddress,
    disconnectWallet,
    connectWallet
  } = useContext(MetamaskContext);

  async function invest() {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(props.contractAddress, abi.abi, signer);
      try {
          const totalAssets: BigNumber = await contractInstance.totalAssets();
          return totalAssets.toNumber()
      } catch (error) {
          console.error('Error calling contract method:', error);
      }
 }

function withdrawInvestment() {
  // Check if MetaMask is installed
    console.log("check")
}

  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);

  const handleClick = () => {
    setIsVaultModalOpen(true)
  };

  return (
    <>
    <VaultModal
    open={isVaultModalOpen}
    onClose={() => {
      setIsVaultModalOpen(false);
      document.body.classList.remove("overflow-hidden");
    }}
    asset = {props.asset}
    invest= {invest}
    withdrawInvestment= {withdrawInvestment}
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
        <div className="text-neutral-400 flex-1">{`TVL: ${formatNumber(props.TVL)} ${props.tokenDenom}`}</div>

        {/* APR */}
        <div className="text-neutral-400 flex-1">{`APR: ${(props.APR*100).toFixed(2)} %`}</div>

        {/* minimumValue */}
        <div className="text-neutral-400 flex-1">{`Minimum Value: ${formatNumber(props.minimumValue)} ${props.tokenDenom}`}</div>

        {/* Token Price */}
        <div className="text-neutral-400 flex-1">{`Token Price: ${props.tokenPrice} ${props.tokenDenom}`}</div>

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
