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
  const { updateUser, sendActiveAccountRequest, user } = useAuth();
  const { searchModal, openModal } = useModal();

  const [datas, setDatas] = useState({
    password: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handleChange = (evt, key) => setDatas({ ...datas, [key]: evt.target.value });

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
            <h2>{t('general.password')}</h2>
            <form action="" className="mt-3">
              <div className="form-group">
                <input type="password" name="password" id="password" value={datas?.password} autoComplete="current-password" onChange={(evt) => handleChange(evt, "password") } placeholder=""/>
                <label htmlFor="text">{t("general.password")}</label>
              </div>
              <div className="form-group">
                <input type="password" name="newPassword" id="newPassword" value={datas?.newPassword} autoComplete="new-password" onChange={(evt) => handleChange(evt, "newPassword") } placeholder=""/>
                <label htmlFor="text">{t("general.newPassword")}</label>
              </div>
              <div className="form-group">
                <input type="password" name="confirmNewPassword" id="confirmNewPassword" autoComplete="new-password" value={datas?.confirmNewPassword} onChange={(evt) => handleChange(evt, "confirmNewPassword") } placeholder="" />
                <label htmlFor="text">{t("general.confirmNewPassword")}</label>
              </div>
            </form>
            <div className="d-flex jce">
              <button onClick={handleSave}>{t("general.save")}</button>
            </div>
            <h2>{t('general.email')}</h2>
            <div className="d-flex jcb aic">
              <p className="text-dark">{ t(user?.isVerified ? 'activeAccount.email_verified' : 'activeAccount.email_not_verified') }</p>
              {!user?.isVerified && <button onClick={sendActiveAccountRequest}>{t('activeAccount.send_email')}</button>}
            </div>
            <h2>{t('general.delete_account')}</h2>
            <div className="d-flex jcb aic">
              <p className="text-dark">{ t('general.delete_account') }</p>
              <button onClick={() => openModal("DeleteAccount")} className="bg-danger">{t('general.delete_account')}</button>
            </div>
          </section>
        </main>
      </section>
    </section>
  );
}
