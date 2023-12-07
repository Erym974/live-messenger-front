import React, { useState } from "react";
import { useAuth, useModal, useTranslation } from "../../Hooks/CustomHooks";
import toast from "react-hot-toast";

import "./../dashboard.scss";
import "./settings.scss";
import Aside from "../../Components/Aside/Aside";

import { Navbar } from "../../Components/Settings/Navbar";
import { SearchModal } from "../../Components/Search/SearchModal";

export default function Security() {
  const { t } = useTranslation();
  const { updateUser } = useAuth();
  const { searchModal } = useModal();

  const [datas, setDatas] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (evt, key) => {
    setDatas({ ...datas, [key]: evt.target.value });
  };

  const handleSave = async () => {
    if (datas.password.trim().length === 0) {
      return toast.error(t("account.passwordRequired"));
    }
    if (datas.newPassword.trim().length === 0) {
      return toast.error(t("account.newPsswordRequired"));
    }
    if (datas.confirmNewPassword.trim().length === 0) {
      return toast.error(t("account.confirmNewPasswordRequired"));
    }

    const body = {
      password: datas.password,
      newPassword: datas.newPassword,
      confirmNewPassword: datas.confirmNewPassword,
    };

    await updateUser(body);
  };

  return (
    <section id="dashboard">
      {searchModal && <SearchModal />}
      <Aside />
      <section id="settings">
        <header className="block">
          <Navbar />
        </header>
        <main className="block">
          <section id="security">
            <h1>Sécurité</h1>
            <h2>Mot de passe</h2>
            <form action="" className="mt-3">
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={datas?.password}
                  autoComplete="current-password"
                  onChange={(evt) => {
                    handleChange(evt, "password");
                  }}
                  placeholder=""
                />
                <label htmlFor="text">{t("general.password")}</label>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  value={datas?.newPassword}
                  autoComplete="new-password"
                  onChange={(evt) => {
                    handleChange(evt, "newPassword");
                  }}
                  placeholder=""
                />
                <label htmlFor="text">{t("general.newPassword")}</label>
              </div>
              <div className="form-group">
                <input
                  type="password"
                  name="confirmNewPassword"
                  id="confirmNewPassword"
                  autoComplete="new-password"
                  value={datas?.confirmNewPassword}
                  onChange={(evt) => {
                    handleChange(evt, "confirmNewPassword");
                  }}
                  placeholder=""
                />
                <label htmlFor="text">{t("general.confirmNewPassword")}</label>
              </div>
            </form>
            <div className="d-flex jce">
              <button onClick={handleSave}>{t("general.save")}</button>
            </div>
          </section>
        </main>
      </section>
    </section>
  );
}
