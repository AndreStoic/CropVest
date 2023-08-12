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
    const vaultData = {name: "Crop Field", description: "A Crop Field somewhere in Colorado, USA", image: "", tags:"", url:"https://test", TVL: 100000, APR: 0.001, Capacity:10, tokenPrice: "0.01", tokenDenom:"USDC", location: "Colorado, USA", rickFactor: 0.30}

    setVaultData([vaultData,vaultData, vaultData, vaultData, vaultData, vaultData])
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
        <div className="grid grid-cols-8 gap-3 auto-rows-auto">
          {vaultData?.length > 0 && (
            <>
              {vaultData.map((Vault: any) => (console.log(Vault),
                <VaultTile
                  key={Vault.name}
                  name={Vault.name}
                  description={Vault.description}
                  image={""}
                  url={Vault.url}
                  TVL={Vault.TVL}
                  APR={Vault.APR}
                  Capacity={Vault.Capacity}
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
