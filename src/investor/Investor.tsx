import {
  faArrowUpRightFromSquare,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { useEffect, useState, useContext } from "react";
import { MetamaskContext } from "shared/context/MetamaskContext";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import VaultTile from "./components/VaultTile"
import Header from "./components/Header";
import { ContractAddress } from "shared/utils/commons";
import { ethers } from 'ethers';

function Investor() {
  const {
    polygon,
    walletAddress,
    disconnectWallet,
    connectWallet
  } = useContext(MetamaskContext);

  const [data, setData] = useState(null);

    // Search
  const [searchText, setSearchText] = useState<string>("");

  const [vaultData, setVaultData] = useState<any>("");
  const [filteredVaultData, setFilteredVaultData] = useState<any>("");

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
  }

  const contractABI = [
    {
        "constant": true,
        "inputs": [] as any,
        "name": "getData",
        "outputs": [{"name": "", "type": "string"}],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
  ];
  
  useEffect(() => {

    async function fetchData() {
       // Check if MetaMask is installed
       if (typeof window.ethereum === 'undefined') {
        console.error('MetaMask is not installed');
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum as any);
    const signer = provider.getSigner();
    const contractInstance = new ethers.Contract(ContractAddress, contractABI, signer);
    
    // Call the `getData` function from the contract
    try {
        const result = await contractInstance.getData();
        setData(result);
    } catch (error) {
        console.error('Error calling contract method:', error);
    }
  }
  
  if (polygon && walletAddress) {
    fetchData();
  }

  }, [polygon, walletAddress]);

  useEffect(() => {
   /*  const NFT = {name: "Corn 1", description: "", riskFactor: 0.30, location: "Colorado, USA", minimumValue: 3000, type: "Potato"};
    const NFTs = [NFT, NFT, NFT, NFT, NFT, NFT, NFT];
    const vaultData = {
      name: "Potato x Corn",
      description: "Potato, Corn combined strat",
      image: "",
      tags: "",
      url: "https://test",
      TVL: 453656356,
      APR: 0.1,
      tokenPrice: "0.01",
      tokenDenom: "USDC",
      investment: 324355,
      NFTs: NFTs
    };
    
    const vaultsData = [vaultData, vaultData, vaultData, vaultData, vaultData, vaultData, vaultData, vaultData, vaultData];
    
    const calculateVaultCapacity = (vault) => {
        return vault.NFTs.reduce((sum, nft) => sum + nft.minimumValue, 0);
    }
    
    const vaultsWithCapacity = vaultsData.map(vault => {
        const capacity = calculateVaultCapacity(vault);
        return { ...vault, capacity };
    });
    
    setVaultData(vaultsWithCapacity);
 */

    const NFT = {name: "Potato 1", description: "", riskFactor: 0.30, location: "Colorado, USA", minimumValue: 3000, type: "Potato"};
    const NFT2 = {name: "Corn 1", description: "", riskFactor: 0.30, location: "Colorado, USA", minimumValue: 3000, type: "Corn"};
    const NFT3 = {name: "Wheat 1", description: "", riskFactor: 0.30, location: "Colorado, USA", minimumValue: 3000, type: "Wheat"};
    const NFTs = [NFT, NFT, NFT, NFT2, NFT, NFT2, NFT2,NFT2, NFT2,NFT2, NFT2, NFT3, NFT3, NFT3];
    
    const aggregateNFTs = (nfts) => {
        // Group NFTs by their type
        const grouped = nfts.reduce((acc, nft) => {
            (acc[nft.type] = acc[nft.type] || []).push(nft);
            return acc;
        }, {});
    
        // Aggregate properties of NFTs with the same type
        return Object.values(grouped).map(nftGroup => {
            return {
                type: nftGroup[0].type,
                name: nftGroup.every(nft => nft.name === nftGroup[0].name) ? nftGroup[0].name : "Mixed",
                description: "",
                riskFactor: nftGroup.reduce((sum, nft) => sum + nft.riskFactor, 0) / nftGroup.length,
                location: nftGroup.every(nft => nft.location === nftGroup[0].location) ? nftGroup[0].location : "Mixed",
                minimumValue: nftGroup.reduce((sum, nft) => sum + nft.minimumValue, 0)
            };
        });
    }
    
    const vaultData = {
      name: "Potato x Corn",
      description: "Potato, Corn combined strat",
      image: "",
      tags: "",
      url: "https://test",
      TVL: 453656356,
      APR: 0.1,
      tokenPrice: "0.01",
      tokenDenom: "USDC",
      investment: 324355,
      NFTs: aggregateNFTs(NFTs)
    };
    
    const vaultsData = [vaultData, vaultData, vaultData, vaultData, vaultData, vaultData, vaultData, vaultData, vaultData];
    
    const calculateVaultCapacity = (vault) => {
        return vault.NFTs.reduce((sum, nft) => sum + nft.minimumValue, 0);
    }
    
    const vaultsWithCapacity = vaultsData.map(vault => {
        const capacity = calculateVaultCapacity(vault);
        return { ...vault, capacity };
    });
    
    setVaultData(vaultsWithCapacity);
    
  }, []);

  return (
    <>
        <div className="max-w-4xl mx-auto px-3 text-neutral-600 dark:text-neutral-400 leading-7 text-justify center justify-center">
        {/* Title */}
        <Header
          title="Investor"
          description="Invest into vaults that contains an asset representing a crop field"
        />
{/*         <div className="relative w-full sm:w-96 mx-auto mb-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FontAwesomeIcon icon={faMagnifyingGlass} className="" />
          </div>
          <input
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            id="search"
            className="block w-full p-4 pl-10 text-sm rounded-lg text-neutral-800 dark:text-white bg-white dark:bg-neutral-800 placeholder-neutral-600 dark:placeholder-neutral-400 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 dark:focus-visible:ring-cyan-500"
            placeholder="Search"
          />
        </div> */}
        <div className="grid grid-cols-8 gap-2 auto-rows-auto">
          {vaultData?.length > 0 && (
            <>
              {vaultData.map((Vault: any) => (
                <VaultTile
                  key={Vault.name}
                  name={Vault.name}
                  description={Vault.description}
                  image={""}
                  url={Vault.url}
                  TVL={Vault.TVL}
                  APR={Vault.APR}
                  Capacity={Vault.capacity}
                  tokenPrice={Vault.tokenPrice}
                  tokenDenom={Vault.tokenDenom}
                  asset={Vault}
                />
              ))}
            </>
          )}

          {vaultData?.length <= 0 && (
            <>
              {/* Skeleton Loader Item */}
              <div className="animate-pulse col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3">
                <div className="h-72 bg-white dark:bg-neutral-800 rounded-xl"></div>
              </div>
              {/* Skeleton Loader Item */}
              <div className="animate-pulse col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3">
                <div className="h-72 bg-white dark:bg-neutral-800 rounded-xl"></div>
              </div>
              {/* Skeleton Loader Item */}
              <div className="animate-pulse col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3">
                <div className="h-72 bg-white dark:bg-neutral-800 rounded-xl"></div>
              </div>
              {/* Skeleton Loader Item */}
              <div className="animate-pulse col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3">
                <div className="h-72 bg-white dark:bg-neutral-800 rounded-xl"></div>
              </div>
              {/* Skeleton Loader Item */}
              <div className="animate-pulse col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3">
                <div className="h-72 bg-white dark:bg-neutral-800 rounded-xl"></div>
              </div>
              {/* Skeleton Loader Item */}
              <div className="animate-pulse col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3">
                <div className="h-72 bg-white dark:bg-neutral-800 rounded-xl"></div>
              </div>
              {/* Skeleton Loader Item */}
              <div className="animate-pulse col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3">
                <div className="h-72 bg-white dark:bg-neutral-800 rounded-xl"></div>
              </div>
              {/* Skeleton Loader Item */}
              <div className="animate-pulse col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3">
                <div className="h-72 bg-white dark:bg-neutral-800 rounded-xl"></div>
              </div>
              {/* Skeleton Loader Item */}
              <div className="animate-pulse col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3">
                <div className="h-72 bg-white dark:bg-neutral-800 rounded-xl"></div>
              </div>
              {/* Skeleton Loader Item */}
              <div className="animate-pulse col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3">
                <div className="h-72 bg-white dark:bg-neutral-800 rounded-xl"></div>
              </div>
              {/* Skeleton Loader Item */}
              <div className="animate-pulse col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3">
                <div className="h-72 bg-white dark:bg-neutral-800 rounded-xl"></div>
              </div>
              {/* Skeleton Loader Item */}
              <div className="animate-pulse col-span-12 sm:col-span-6 lg:col-span-6 xl:col-span-4 2xl:col-span-3">
                <div className="h-72 bg-white dark:bg-neutral-800 rounded-xl"></div>
              </div>
            </>
          )}
         </div>
        </div>
    </>
  )
}

export default Investor;
