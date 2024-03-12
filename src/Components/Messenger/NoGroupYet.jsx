import React, { useEffect } from "react";
import useFriends from "../../Hooks/useFriends";
import { useNavigate } from "react-router-dom";
import { Loader } from "../Loader";
import useTranslation from "../../Hooks/useTranslation";

export const NoGroupYet = () => {
  const { friendsIsLoading, friends } = useFriends();
  const navigate = useNavigate();
  const { t } = useTranslation()

  return (
    <>
      {friendsIsLoading && <Loader />}
      {!friendsIsLoading && (
        <>
          {friends?.length <= 0 ? (
            <section id="no-group-yet" className="d-flex f-c aic jcc" style={{ width: "100%" }}>
              <h2 className="mt-5">{t('noGroupYet.noFriensYet')}</h2>
              <p className="mt-2 text-dark">{t('noGroupYet.startToTalk')}</p>
              <button className="btn btn-primary mt-4" onClick={() => { navigate("/settings/friends") }} >{t('noGroupYet.addFriends')}</button>
            </section>
          ) : (
            <section id="no-group-yet" className="d-flex f-c aic jcc" style={{ width: "100%" }}>
              <h2 className="mt-5">
                {t('noGroupYet.noGroupsYet')}
              </h2>
              <p className="mt-2 text-dark">{t('noGroupYet.startToTalkWithFriends')}</p>
              <ul>
                {friends.map((friend, index) => <li key={index}>
                  {friend?.friend?.fullname}
                </li>)}
              </ul>
            </section>
          )}
        </>
      )}
    </>
  );
};
