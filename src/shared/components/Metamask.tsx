import {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import Tooltip from "@mui/material/Tooltip";
import CopyToClipboard from "react-copy-to-clipboard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faCopy,
  faWallet,
} from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { useHoverOutside } from "shared/utils/useHoverOutside";
import BigNumber from "bignumber.js";
import { faKey, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import {
  MetamaskContext,
} from "shared/context/MetamaskContext";

export function MetamaskPanel() {
  const {
    polygon,
    walletAddress,
    disconnectWallet,
    connectWallet
  } = useContext(MetamaskContext);

  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false); // set to true for debugging menu

  useEffect(() => {
    connectWallet();
  }, []);

  const keplrRef = useRef();
  useHoverOutside(keplrRef, () => setIsMenuVisible(false));

  const CopyableAddress = () => {
    return (
      <CopyToClipboard
        text={walletAddress}
        onCopy={() => {
          toast.success("Address copied to clipboard!");
        }}
      >
        <button className="px-2 py-1 mb-2 rounded-lg flex gap-2 items-center group bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-black transition-colors">
          {walletAddress.slice(0, 14) + "..." + walletAddress.slice(-14)}
          <FontAwesomeIcon
            icon={faCopy}
            className="block text-neutral-500 dark:text-neutral-500 transition-colors"
          />
        </button>
      </CopyToClipboard>
    );
  };


  const Disconnect = () => {
    return (
      <button
        onClick={disconnectWallet}
        className="w-full font-semibold px-3 py-1.5 rounded-md text-white dark:text-red-400 bg-red-500 dark:bg-red-500/30 hover:bg-red-400 dark:hover:bg-red-500/50 hover:text-white transition-colors cursor-pointer"
      >
        Disconnect Wallet
      </button>
    );
  };

  const KeplrMenu = () => {
    return (
      <div className="absolute pt-10 right-4 z-40 top-[3.7rem]">
        <div className="bg-white dark:bg-neutral-800 border text-xs border-neutral-200 dark:border-neutral-700 p-4 w-auto rounded-lg flex-row space-y-4">
          {/* Copyable Wallet Address */}
          <CopyableAddress />

          {/* Disconnect Button */}
          <Disconnect />
        </div>
      </div>
    );
  };

  const AnimatedDot = () => {
    return (
      <span className="flex relative h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-1/2"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
    );
  };

  const Content = () => {
    return (
      <>
        <div className="flex items-center font-semibold text-sm">
          <div className="flex items-center">
            {/* Animated Dot */}
            {walletAddress.length > 0 ? (
              <span className="mr-3">
                <AnimatedDot />
              </span>
            ) : null}
            {/* Wallet Icon */}
            <FontAwesomeIcon icon={faWallet} className="mr-2" />
            {/* Connect Wallet || Connected */}
            <span className="flex-1">
              {walletAddress.length > 0 ? "Connected" : "Connect Wallet"}
            </span>
          </div>
        </div>
      </>
    );
  };

  if (polygon) {
    return (
      <>
        <div ref={keplrRef}>
          {isMenuVisible ? <KeplrMenu /> : null}
          <div
            className="w-full sm:w-auto rounded-lg px-4 py-3 bg-white dark:bg-neutral-700 hover:dark:bg-neutral-600 select-none cursor-pointer transition-colors"
            onMouseOver={() => setIsMenuVisible(true)}
            ref={keplrRef}
          >
            <Content />
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <button
          id="metamask-button"
          onClick={() => connectWallet()}
          className="w-full sm:w-auto rounded-lg px-4 py-3 bg-white dark:bg-neutral-700 hover:dark:bg-neutral-600 select-none cursor-pointer transition-colors"
        >
          <Content />
        </button>
      </>
    );
  }
}
