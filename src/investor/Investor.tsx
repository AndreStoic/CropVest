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
import { ethers } from 'ethers';
import abiCropVault from 'shared/ContractABIs/CropVault.json';
import abiNFT from 'shared/ContractABIs/ERC1155m.json';
import abiOracle from 'shared/ContractABIs/CropOracle.json';
import BigNumber from "bignumber.js";
import "react-toastify/dist/ReactToastify.css";
import { ERC20TokenDecimals, ContractAddressERC20, ContractAddressCropVault, ContractAddressCropCollection, NFTDecimals, ContractAddressOracle, pairs } from "shared/utils/commons";

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
  const [vaultsUserBalances, setVaultsUserBalances] = useState<any>("");
  const [vaultsAssets, setVaultsAssets] = useState<any>("");
  const [vaultsNames, setVaultsNames] = useState<any>("");
  const [vaultsNFTs, setVaultsNFTs] = useState<any>("");
  const [cropPrices, setCropPrices] = useState<any>("");

  const VaultAddresses = ["0xa36755270D7A53290140257739aBED5f1D3eB2F1", "0xa36755270D7A53290140257739aBED5f1D3eB2F1","0xa36755270D7A53290140257739aBED5f1D3eB2F1", "0xa36755270D7A53290140257739aBED5f1D3eB2F1"]
  
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
  }

  if (typeof window.ethereum === 'undefined') {
    console.error('MetaMask is not installed');
    return;
  }

const provider = new ethers.providers.Web3Provider(window.ethereum as any);
const signer = provider.getSigner();

async function fetchVaultAsset(contractAddress: string) {
 const contractInstance = new ethers.Contract(contractAddress, abiCropVault.abi, signer);
 try {
     const totalAssets = await contractInstance.totalAssets();
     return totalAssets/(10**ERC20TokenDecimals)
 } catch (error) {
     console.error('Error calling contract method:', error);
 }
}

async function fetchVaultsAssets(VaultAddresses: any) {
  const vaults = await Promise.all(VaultAddresses.map(async (address: any) => {
    return await fetchVaultAsset(address);
  }));
  return vaults
}

async function fetchVaultUserBalance(contractAddress: string) {
  const contractInstance = new ethers.Contract(contractAddress, abiCropVault.abi, signer);
  try {
      const balanceOf = await contractInstance.balanceOf(walletAddress);
      return balanceOf/(10**ERC20TokenDecimals)
  } catch (error) {
      console.error('Error calling contract method:', error);
  }
 }
 async function fetchVaultsUserBalances(VaultAddresses: any) {
  const vaults = await Promise.all(VaultAddresses.map(async (address: any) => {
    return await fetchVaultUserBalance(address);
  }));
  return vaults
}
 
 async function fetchVaultsNames(VaultAddresses: any) {
   const vaults = await Promise.all(VaultAddresses.map(async (address: any) => {
     return await fetchVaultName(address);
   }));
   return vaults
 }

 async function fetchVaultName(contractAddress: string) {
  const contractInstance = new ethers.Contract(contractAddress, abiCropVault.abi, signer);
  try {
      const name = await contractInstance.name();
      return name
  } catch (error) {
      console.error('Error calling contract method:', error);
  }
 }

  
 async function fetchVaultsNFTs(VaultAddresses: any) {
  const vaults = await Promise.all(VaultAddresses.map(async (address: any) => {
    return await fetchVaultNFTs(address);
  }));
  return vaults
}

async function fetchVaultNFTs(contractAddress: string) {
 const contractInstance = new ethers.Contract(ContractAddressCropCollection, abiNFT.abi, signer);
 try {
     const balanceOfBatch = await contractInstance.balanceOfBatch([contractAddress, contractAddress, contractAddress, contractAddress],[0,1,2,3]);
     return balanceOfBatch
 } catch (error) {
     console.error('Error calling contract method:', error);
 }
}

async function fetchOraclePrices(CropIds: any) {
  const vaults = await Promise.all(CropIds.map(async (CropId: any) => {
    return await fetchOraclePrice(CropId);
  }));
  return vaults
}

async function fetchOraclePrice(CropId: number) {
 const contractInstance = new ethers.Contract(ContractAddressOracle, abiOracle.abi, signer);
 console.log(CropId)
 try {
     const cropPrice = await contractInstance.price(CropId);
     return cropPrice/(10**NFTDecimals)
 } catch (error) {
     console.error('Error calling contract method:', error);
 }
}

 useEffect(() => {
  if (polygon && walletAddress) {
  fetchVaultsAssets(VaultAddresses).then(result => setVaultsAssets(result))
  fetchVaultsUserBalances(VaultAddresses).then(result => setVaultsUserBalances(result))
  fetchVaultsNames(VaultAddresses).then(result => setVaultsNames(result))
  fetchVaultsNFTs(VaultAddresses).then(result => setVaultsNFTs(result))
  fetchOraclePrices([0,1,2,3]).then(result => setCropPrices(result))
  }

}, [polygon, walletAddress]);


  useEffect(() => {

    if (vaultsNames && vaultsAssets && vaultsUserBalances && vaultsNFTs && cropPrices) {
    
    const vaultsNFTsModified = vaultsNFTs.map((vaultsNFT: any) => {
      return {
        ...vaultsNFT.map((vaultsNFT, index) => {
          return { [pairs[index]]: vaultsNFT };
        })
      };
    });

  const vaultsData = VaultAddresses.map((vault, i) => ({
    name: vaultsNames[i],
    TVL: vaultsAssets[i],
    APR: 0.05,
    tokenDenom: "USDC",
    investment: vaultsUserBalances[i],
    NFTs: vaultsNFTsModified[i],
    contractAddress: VaultAddresses[i],
    prices: cropPrices,
  }));

  setVaultData(vaultsData)
  
}

  }, [vaultsNames, vaultsAssets, vaultsUserBalances, vaultsNFTs, cropPrices]);

  return (
    <>
        <div className="max-w-4xl mx-auto px-3 text-neutral-600 dark:text-neutral-400 leading-7 text-justify center justify-center">
        {/* Title */}
        <Header
          title="Investor"
          description="Invest into vaults that contains multiple crops as collateral"
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
                  minimumValue={Vault.minimumValue}
                  tokenPrice={Vault.tokenPrice}
                  tokenDenom={Vault.tokenDenom}
                  asset={Vault}
                  contractAddress={Vault.contractAddress}
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
