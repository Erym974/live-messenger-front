import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile, useTranslation } from "../../Hooks/CustomHooks";
import ButtonRounded from "../../Components/ButtonRounded";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleAside } from "../../Slices/settingsSlice";
import Profile from "../Profile";
import { ModalImage } from "../ModalImage";

import { MdOutlineSettings } from "react-icons/md";
import { FaUserAlt, FaLock, FaUserFriends } from "react-icons/fa";

export const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile, profileIsLoading } = useProfile();
  const { open: openImage } = useSelector((state) => state.images);

  const handleResponsiveAside = () => dispatch(toggleAside(true));

  const { current: pages } = useRef([
    {
      url: "/settings/general",
      title: t("settings.general"),
      icon: <MdOutlineSettings />
    },
    {
      url: "/settings/account",
      title: t("settings.my_account"),
      icon: <FaUserAlt />
    },
    {
      url: "/settings/security",
      title: t("settings.security"),
      icon: <FaLock />
    },
    {
      url: "/settings/friends",
      title: t("settings.my_friends"),
      icon: <FaUserFriends />
    },
  ]);

  const handleClick = (page) => {
    document.title = `SwiftChat | ${page.title}`;
    navigate(page.url);
  };

  return (
    <>
      {profileIsLoading || profile ? <Profile /> : null}
      {openImage && <ModalImage />}
      <ul>
        {pages.map((page, index) => (
          <li key={index} onClick={() => handleClick(page)} className="link">
            <span className="text">{page.title}</span>
            <span className="icon">{page.icon}</span>
          </li>
        ))}
      </ul>
      <ButtonRounded size="small" attributes={{ "data-open-aside": "true" }} onClick={handleResponsiveAside}>
        <FaXmark />
      </ButtonRounded>
    </>
  );
};
