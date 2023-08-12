import {
  faArrowUpRightFromSquare,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState, useContext } from "react";
import { MetamaskContext } from "shared/context/MetamaskContext";
import { ethers } from "ethers";
import ERC1155m from "shared/ContractABIs/ERC1155m.json";
import { ContractAddressCropCollection } from "shared/utils/commons";
import Chat from "./Chat";

function Farmer() {
  const { polygon, walletAddress, disconnectWallet, connectWallet } =
    useContext(MetamaskContext);

  const provider = new ethers.providers.Web3Provider(window.ethereum as any);
  const signer = provider.getSigner();

  // Sample function for minting ERC1155 tokens
  const handleMint = async () => {
    const contractInstance = new ethers.Contract(
      ContractAddressCropCollection,
      ERC1155m.abi,
      signer
    );

    try {
      const tx = await contractInstance.mint(walletAddress, 1, 1, "0x00");
      const receipt = await tx.wait();
      console.log(receipt);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-2xl mx-auto px-6 text-neutral-600 dark:text-neutral-400 leading-7 text-justify bg-slate-100">
        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="font-bold text-4xl inline text-transparent bg-clip-text bg-black">
            Farmer
          </h1>
          <Chat></Chat>
        </div>

        {/* Mint Button */}
        <div className="text-center mt-4">
          <button
            onClick={handleMint}
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Mint Tokens
          </button>
        </div>
      </div>
    </>
  );
}

export default Farmer;
