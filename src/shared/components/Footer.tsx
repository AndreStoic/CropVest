import {
  faDiscord,
  faGithub,
  faInstagram,
  faTelegram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faComments } from "@fortawesome/free-regular-svg-icons";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

class Footer extends React.Component {
  render() {
    return (
      <>
        <div className="grid grid-cols-12 items-center px-6 py-8 mt-12 text-center gap-4">
          <div className="col-span-12 text-sm text-neutral-600 dark:text-neutral-400 font-medium">
            {"⚡️ Powered by "}
            <a
              href="https://polygon.technology"
              target="_blank"
              className="transition-colors hover:text-black dark:hover:text-white font-bold"
            >
              Polygon
            </a>
          </div>
        </div>
      </>
    );
  }
}

export default Footer;
