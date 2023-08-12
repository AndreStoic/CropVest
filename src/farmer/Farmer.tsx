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
import Chat from "./Chat";

function Farmer() {
  const { polygon, walletAddress, disconnectWallet, connectWallet } =
    useContext(MetamaskContext);

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
      </div>
    </>
  );
}

export default Farmer;
