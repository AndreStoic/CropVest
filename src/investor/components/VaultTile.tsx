import React from "react";
import VaultModal from "./VaultModal";
import { useEffect, useState, useContext } from "react";
import { MetamaskContext } from "shared/context/MetamaskContext";
import { ethers } from 'ethers';
import abi from 'shared/ContractABIs/CropVault.json';
import BigNumber from "bignumber.js";
import { ERC20TokenDecimals, ContractAddressERC20, ContractAddressCropCollection } from "shared/utils/commons";
import { toast } from "react-toastify";
import { NFTDecimals, formatNumber } from "shared/utils/commons";
import "react-toastify/dist/ReactToastify.css";

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

  const [amount, setAmount] = useState(false);

  async function invest() {
    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const tokenInstance = new ethers.Contract(ContractAddressERC20, abi.abi, signer);

    const bigNumberAmount = ethers.utils.parseUnits(amount.toString(), ERC20TokenDecimals);

    // Check the current allowance
    const currentAllowance = await tokenInstance.allowance(signer.getAddress(), props.contractAddress);

    // If the current allowance is less than the desired amount, then approve the tokens
    if (currentAllowance.lt(bigNumberAmount)) {
      const approveAmount = ethers.utils.parseUnits(amount.toString(), ERC20TokenDecimals); // Assume `tokenDecimals` is the number of decimals the token has
      const approveTx = await tokenInstance.approve(props.contractAddress, approveAmount);
      const approveReceipt = await approveTx.wait();
      toast.success(`Approval confirmed in block: ${approveReceipt.blockNumber}`);
    } else {
        console.log('Token approval is already sufficient.');
    }

    const contractInstance = new ethers.Contract(props.contractAddress, abi.abi, signer);
    const txResponse = await contractInstance.deposit(bigNumberAmount, walletAddress);
    console.log(`Transaction hash: ${txResponse.hash}`);
    toast.success(`Transaction hash: ${txResponse.hash}`);

    const receipt = await txResponse.wait();
    toast.success(`Transaction confirmed in block: ${receipt.blockNumber}`);
}

async function withdrawInvestment() {

  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const signer = provider.getSigner();
  const tokenInstance = new ethers.Contract(ContractAddressERC20, abi.abi, signer);

  const bigNumberAmount = ethers.utils.parseUnits(amount.toString(), ERC20TokenDecimals);

  const contractInstance = new ethers.Contract(props.contractAddress, abi.abi, signer);
  const txResponse = await contractInstance.withdraw(bigNumberAmount, walletAddress, walletAddress);
  console.log(`Transaction hash: ${txResponse.hash}`);
  toast.success(`Transaction hash: ${txResponse.hash}`);

  const receipt = await txResponse.wait();
  toast.success(`Transaction confirmed in block: ${receipt.blockNumber}`);

}

  const [isVaultModalOpen, setIsVaultModalOpen] = useState(false);

  const handleClick = () => {
    setIsVaultModalOpen(true)
  };

        // Initialize totalValue
        let totalValue = 0;

        // Assuming this.props.asset?.NFTs is an object or array.
        if (props.asset?.NFTs) {
          Array.from(Object.values(props.asset?.NFTs)).forEach((NFT: any, i) => {
            totalValue += NFT[Object.keys(NFT)[0]]/(10**NFTDecimals)*props.asset.prices[i];
          });
        }

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
    setAmount = {setAmount}
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

                {/* Value */}

                <div className="text-neutral-400 flex-1">{`Underlying Value: ${formatNumber(totalValue)} ${props.asset.tokenDenom}`}</div>

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
