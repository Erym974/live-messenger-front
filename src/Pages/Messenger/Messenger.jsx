import './../dashboard.scss';
import Aside from "../../Components/Aside/Aside";

import Chat from "./Chat";
import Profile from "../../Components/Profile";
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMessenger, useProfile } from '../../Hooks/CustomHooks';
import { useDocumentTitle } from '@uidotdev/usehooks';

export default function Messenger() {

  const { profile } = useProfile();
  const navigate = useNavigate();
  const { id } = useParams()
  const { fetchGroups, fetchGroup, groups, group, loadingGroups } = useMessenger()


  useEffect(() => {
    try {
      fetchGroups()
    } catch(e) {

    }
  }, [useDocumentTitle("Messenger")])

  useEffect(() => {
    if(group && group.id === parseInt(id)) return
    if(groups.length === 0) return navigate(`/messenger`)
    if(groups?.length === 0 && id) return navigate(`/messenger`)
    if(!id && groups?.length > 0) return navigate(`/messenger/${groups[0]?.id}`)
    if(groups && !groups?.find(g => g.id === parseInt(id))) return navigate(`/messenger/${groups[0]?.id}`)
    fetchGroup(id)
  }, [id, groups])

  return (
    <section id="dashboard">

      {profile && <Profile />}

      <Aside />

      <Chat />

    </section>
  )
}
