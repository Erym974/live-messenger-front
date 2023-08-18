import './../dashboard.scss';
import Aside from "../../Components/Aside/Aside";
import { useSelector } from "react-redux";

import Chat from "./Chat";
import Profile from "../../Components/Profile";
import { useParams } from 'react-router-dom';

export default function Message() {

  const { id } = useParams();

  const conversation = useSelector(state => state.messenger.conversation)
  const profile = useSelector(state => state.profile.profile)
  const responsiveAside = useSelector(state => state.settings.responsiveAside)

  return (
    <section id="dashboard">

      {profile && <Profile profile={profile} />}

      <Aside />

      <Chat id={id} />

    </section>
  )
}
