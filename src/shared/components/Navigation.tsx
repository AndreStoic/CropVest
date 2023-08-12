import {
  faArrowUpRightFromSquare,
  faBook,
  faBox,
  faBriefcase,
  faChartLine,
  faCheckToSlot,
  faChevronDown,
  faCircleNodes,
  faClose,
  faCoins,
  faCube,
  faShuffle,
  faRecycle,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export function Navigation({
  showMobileMenu,
  setShowMobileMenu,
}: {
  showMobileMenu: boolean;
  setShowMobileMenu: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [isExtendedMenuOpen, setIsExtendedMenuOpen] = useState<boolean>(false);

  function toggleIsExtendedMenuOpen() {
    setIsExtendedMenuOpen(!isExtendedMenuOpen);
  }

  return (
    <>
      <NavLink to="/farmer" className="block ml-4 mb-12" style={{ maxWidth: "9rem" }}>
      <img id="myImage" alt="Image will be displayed here" width="200" src="logo/CROPVEST_Logo.png"></img>
      </NavLink>

      <ul className="space-y-4 font-semibold text-neutral-600 dark:text-neutral-400 text-center lg:text-left">
        <li className="lg:hidden">
          <button
            onClick={() => setShowMobileMenu(false)}
            className="hover:text-black dark:hover:text-white fixed top-0 right-0 float-right px-8 py-5 rounded-full transition-colors"
          >
            <FontAwesomeIcon icon={faClose} className="mr-2" size="lg" />
          </button>
        </li>
        <li>
          <NavLink
            to="/farmer"
            className={({ isActive }) =>
              isActive
                ? "text-black dark:text-white bg-gradient-to-r from-neutral-200 via-neutral-200 to-neutral-200/10 dark:from-neutral-700 dark:via-neutral-700 dark:to-neutral-700/10 block w-full px-8 py-3 rounded-xl transition-colors font-bold cursor-default"
                : "text-neutral-700 dark:text-neutral-300 cursor-pointer hover:text-black dark:hover:text-white block w-full px-8 py-3 rounded-xl transition-colors"
            }
          >
            <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            Farmer
          </NavLink>
          <NavLink
            to="/investor"
            className={({ isActive }) =>
              isActive
                ? "text-black dark:text-white bg-gradient-to-r from-neutral-200 via-neutral-200 to-neutral-200/10 dark:from-neutral-700 dark:via-neutral-700 dark:to-neutral-700/10 block w-full px-8 py-3 rounded-xl transition-colors font-bold cursor-default"
                : "text-neutral-700 dark:text-neutral-300 cursor-pointer hover:text-black dark:hover:text-white block w-full px-8 py-3 rounded-xl transition-colors"
            }
          >
            <FontAwesomeIcon icon={faChartLine} className="mr-2" />
            Investor
          </NavLink>

        </li>
      </ul>
    </>
  );
}
