import React from "react";

import "./../dashboard.scss";
import "./settings.scss";
import Aside from "../../Components/Aside/Aside";
import { Navbar } from "../../Components/Settings/Navbar";

import FormSwitch from "../../Components/FormSwitch";
import { MenuItem, Select } from "@mui/material";
import Language from "../../Constant/Language";
import { useAuth, useModal, useSettings, useTranslation } from "../../Hooks/CustomHooks";
import { SearchModal } from "../../Components/Search/SearchModal";
import { Link } from "react-router-dom";

export default function General() {
  const { language, t } = useTranslation();
  const { toggleSetting, setSettings } = useSettings();
  const { user } = useAuth();
  const { searchModal } = useModal();

  const handleLanguageChange = ({ target: { value } }) => {
    setSettings("language", value);
  };

  return (
    <section id="dashboard">
      <Aside />
      {searchModal && <SearchModal />}
      <section id="settings">
        <header className="block">
          <Navbar />
        </header>
        <main className="block">
          <section id="general">
            <h1>{t("settings.general")}</h1>
            <FormSwitch setData={() => toggleSetting("allow-friend-request")} data={user.settings.find((setting) => setting.meta === "allow-friend-request")?.value}>
              {t("settings.allow_friends")}
            </FormSwitch>

            <FormSwitch setData={() => toggleSetting("allow-easter")} data={user.settings.find((setting) => setting.meta === "allow-easter")?.value}>
              {t("settings.allow_easter")}
            </FormSwitch>

            <div className="language-selector">
              <span>{t("settings.language_selector")}</span>
              <Select value={language} label="Language" onChange={handleLanguageChange}>
                {Language.LIST.map((lang) => (
                  <MenuItem value={lang.code} key={lang.code}>
                    <div className="d-flex selectLanguageItem">
                        <img src={`/flags/${lang.code}.svg`} style={{ height: 20 }} className="mr-2" />
                        <span>{lang.name}</span>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </div>
          </section>
        </main>
        <footer className="block">
          <Link to="/terms" target="_blank">{t('public.terms')}</Link>
          <Link to="/privacy" target="_blank">{t('public.privacy')}</Link>
        </footer>
      </section>
    </section>
  );
}
