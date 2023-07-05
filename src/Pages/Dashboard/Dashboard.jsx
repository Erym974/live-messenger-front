import { useContext, useEffect, useState } from "react";
import { AuthentificationContext } from "../../Context/AuthentificationContext";

import './dashboard.scss';
import Aside from "../../Components/Aside/Aside";
import { useDispatch, useSelector } from "react-redux";
import { FaPaperPlane, FaXmark } from "react-icons/fa6";
import { FaEllipsisH } from "react-icons/fa";
import ButtonRounded from "../../Components/ButtonRounded";

import Chat from "./Tabs/Chat";
import Settings from "./Tabs/Settings";
import Profile from "../../Components/Profile";

export default function Dashboard() {

  // const [responsiveAside, setResponsiveAside] = useState(true)

  const conversation = useSelector(state => state.messenger.conversation)
  const profile = useSelector(state => state.profile.profile)
  const responsiveAside = useSelector(state => state.settings.responsiveAside)

  return (
    <section id="dashboard">

      {profile && <Profile profile={profile} />}

      <Aside />
      
      {conversation ?
        <Chat />  
        :
        <Settings />
      }

    </section>
  )
}
