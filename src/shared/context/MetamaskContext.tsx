import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { isMobile } from "react-device-detect";

import { MetaMaskSDK } from '@metamask/sdk';


const MetamaskContext = createContext(null);


const MetamaskContextProvider = ({ children }: any) => {
  const [polygon, setPolygon] = useState<any>(null);
  const [walletAddress, setWalletAddress] = useState<string>("");

  async function connectWallet() {

    const options = {
      injectProvider: true,
      dappMetadata:{name: "CropVest", url: "https://test"},
    };
    
    const MMSDK = new MetaMaskSDK(options);

    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x13881' }],
        })
      } catch (error) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x13881', 
                blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
                chainName: 'Mumbai Testnet', 
                nativeCurrency: {
                  decimals: 18,
                  name: 'MATIC',
                  symbol: 'MATIC'
                },
                rpcUrls: ['https://rpc-mumbai.maticvigil.com/']
              },
            ],
          })
        } catch (error) {
          // user rejects the request to "add chain" or param values are wrong, maybe you didn't use hex above for `chainId`?
          console.log(`wallet_addEthereumChain Error: ${(error as any).message}`)
        }
        // handle other "switch" errors
      }
    }

    setPolygon(window.ethereum)

    window.ethereum
    .request({ method: 'eth_requestAccounts' })
    .then((walletAddress: any) => {
    setWalletAddress((walletAddress[0] as string))})
    .catch((error: any) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
    });
  
  }


  function disconnectWallet() {
    // reset secretjs and secretAddress
    setWalletAddress("");
    setPolygon(null);


    // Toast for success
    toast.success("Wallet disconnected!");
  }

  return (
    <MetamaskContext.Provider
      value={{
        polygon,
        setPolygon,
        walletAddress,
        setWalletAddress,
        connectWallet,
        disconnectWallet,
      }}
    >
      {children}
    </MetamaskContext.Provider>
  );
};


export {
  MetamaskContext,
  MetamaskContextProvider,
};
