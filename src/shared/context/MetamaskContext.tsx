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
      communicationLayerPreference: 'webrtc',
    };
    
    const MMSDK = new MetaMaskSDK(options);

    const polygon = MMSDK.getProvider();

    setPolygon(polygon)

    const walletAddress = polygon
    .request({ method: 'eth_requestAccounts' })
    .catch((error) => {
      if (error.code === 4001) {
        // EIP-1193 userRejectedRequest error
        console.log('Please connect to MetaMask.');
      } else {
        console.error(error);
      }
    console.log(walletAddress)
    setWalletAddress((walletAddress as any))
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
