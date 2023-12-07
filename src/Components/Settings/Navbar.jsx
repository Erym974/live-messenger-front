import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProfile, useTranslation } from "../../Hooks/CustomHooks";
import ButtonRounded from "../../Components/ButtonRounded";
import { FaXmark } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { toggleAside } from "../../Slices/settingsSlice";
import Profile from "../Profile";
import { ModalImage } from "../ModalImage";

export const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { profile } = useProfile();
  const { open: openImage } = useSelector((state) => state.images);

  const handleResponsiveAside = () => dispatch(toggleAside(true));

  const { current: pages } = useRef([
    {
      url: "/settings/general",
      title: t("settings.general"),
    },
    {
      url: "/settings/account",
      title: t("settings.my_account"),
    },
    {
      url: "/settings/security",
      title: t("settings.security"),
    },
    {
      url: "/settings/friends",
      title: t("settings.my_friends"),
    },
  ]);

  const handleClick = (page) => {
    document.title = `Messenger | ${page.title}`;
    navigate(page.url);
  };

  return (
    <>
    {profile && <Profile />}
      {openImage && <ModalImage />}
      <ul>
        {pages.map((page, index) => (
          <li key={index} onClick={() => handleClick(page)}>
            {page.title}
          </li>
        ))}
      </ul>
      <ButtonRounded
        size="small"
        attributes={{ "data-open-aside": "true" }}
        onClick={handleResponsiveAside}
      >
        <FaXmark />
      </ButtonRounded>
    </>
  );
};
