import React, { useEffect, useState } from "react";

import "./../dashboard.scss";
import "./settings.scss";
import Aside from "../../Components/Aside/Aside";

import { Navbar } from "../../Components/Settings/Navbar";

import "./friends.scss";
import Friend from "../../Components/Friend/Friend";
import { useFriends, useModal, useTranslation } from "../../Hooks/CustomHooks";

import { InviteFriend } from "../../Components/Settings/Friends/InviteFriend";
import { InvitationList } from "../../Components/Settings/Friends/InvitationList";
import { SearchModal } from "../../Components/Search/SearchModal";

export default function Friends() {

  const { t } = useTranslation();
  const { searchModal } = useModal();

  const {
    friends,
    friendsIsLoading,
  } = useFriends();

  const [tab, setTab] = useState("friends");

  const [filter, setFilter] = useState("");

  const FriendTab = () => {
    return (
      <>
      {searchModal && <SearchModal />}
        <div className="search-friends mt-3">
          <input
            type="search"
            id="search"
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
            }}
            placeholder="Chercher dans mes Amis"
          />
        </div>
        <div className="friends-container">
          {friends?.length > 0 ? (
            friends?.filter((friend) => friend?.friend?.fullname?.includes(filter))?.map((friend) => (
              <Friend key={friend.id} friend={friend} />
            ))
          ) : friendsIsLoading ? (
            <span>Chargement...</span>
          ) : (
            <span>Aucun ami n'a été trouvé</span>
          )}
        </div>
      </>
    );
  };

  const InviteTab = () => {
    return (
      <>
        <InviteFriend />
        <InvitationList />
      </>
    );
  };

  return (
    <section id="dashboard">
      <Aside />
      <section id="settings">
        <header className="block">
          <Navbar />
        </header>
        <main className="block">
          <section id="friends">
            <h1>{t("settings.my_friends")}</h1>

            <ul>
              <li onClick={() => setTab("friends")}>{t("settings.friends")}</li>
              <li onClick={() => setTab("invite")}>
                {t("settings.friendsInvite")}
              </li>
            </ul>

            {/*  */}

            {tab === "friends" && FriendTab()}
            {tab === "invite" && InviteTab()}
          </section>
        </main>
        <footer className="block"></footer>
      </section>
    </section>
  );
}
