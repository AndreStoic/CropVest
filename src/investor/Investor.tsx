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
import PoolTile from "./components/PoolTile"
import { ContractAddress } from "shared/utils/config";

function Investor() {
  const {
    polygon,
    walletAddress,
    disconnectWallet,
    connectWallet
  } = useContext(MetamaskContext);

    // Search
  const [searchText, setSearchText] = useState<string>("");

  const [poolData, setPoolData] = useState<any>("");
  const [filteredPoolData, setFilteredPoolData] = useState<any>("");

  interface IPoolItemProps {
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

  useEffect(() => {
    const data = {name: "Test", description: "Test", image: "", tags:"", url:"https://test", TVL: 100000, APR: 0.001, Capacity:10, tokenPrice: "0.01", tokenDenom:"USDC"}

    setPoolData([data,data, data, data, data, data])
  }, []);

  return (
    <>
        <div className="max-w-2xl mx-auto px-6 text-neutral-600 dark:text-neutral-400 leading-7 text-justify">
        {/* Title */}
        <div className="text-center mb-4">
          <h1 className="font-bold text-4xl inline text-transparent bg-clip-text bg-black">
            Investor
          </h1>
        </div>
        <div className="relative w-full sm:w-96 mx-auto mb-4">
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
        </div>
        <div className="grid grid-cols-9 gap-3 auto-rows-auto">
          {poolData?.length > 0 && (
            <>
              {poolData.map((Pool: any) => (console.log(Pool),
                <PoolTile
                  key={Pool.name}
                  name={Pool.name}
                  description={Pool.description}
                  image={""}
                  url={Pool.url}
                  TVL={Pool.TVL}
                  APR={Pool.APR}
                  Capacity={Pool.Capacity}
                  tokenPrice={Pool.tokenPrice}
                  tokenDenom={Pool.tokenDenom}
                  assets={Pool.assets}
                />
              ))}
            </>
          )}

          {poolData?.length <= 0 && (
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
