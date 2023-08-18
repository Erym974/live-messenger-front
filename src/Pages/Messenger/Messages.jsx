import './../dashboard.scss';
import Aside from "../../Components/Aside/Aside";
import { useSelector } from "react-redux";

import Chat from "./Chat";
import Profile from "../../Components/Profile";

export default function Messages() {

  // const [responsiveAside, setResponsiveAside] = useState(true)

  const conversation = useSelector(state => state.messenger.conversation)
  const profile = useSelector(state => state.profile.profile)
  const responsiveAside = useSelector(state => state.settings.responsiveAside)

  return (
    <section id="dashboard">

      {profile && <Profile profile={profile} />}

      <Aside />

      {/* <Chat />  */}

    </section>
  )
}
