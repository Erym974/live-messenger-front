import './../dashboard.scss';
import Aside from "../../Components/Aside/Aside";

import Chat from "../../Components/Messenger/Chat";
import Profile from "../../Components/Profile";
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useMessenger, useModal, useProfile } from '../../Hooks/CustomHooks';
import { useDocumentTitle } from '@uidotdev/usehooks';
import { useSelector } from 'react-redux';
import { ModalImage } from '../../Components/ModalImage';
import { NoGroupYet } from '../../Components/Messenger/NoGroupYet';
import { SearchModal } from '../../Components/Search/SearchModal';

export default function Messenger() {

  const { profile } = useProfile();
  const navigate = useNavigate();
  const { id } = useParams()
  const { open: openImage } = useSelector(state => state.images)
  const { groups, groupsIsLoading } = useMessenger()
  const [hasNoGroups, setHasNoGroups] = useState(false);
  const { searchModal } = useModal();

  useEffect(() => {
  }, [useDocumentTitle("Messenger")])

  useEffect(() => {
    if(groups?.length === 0) setHasNoGroups(true)
    else setHasNoGroups(false)
  }, [groups])

    useEffect(() => {
      if(groupsIsLoading) return
      if(!id && groups?.length > 0) return navigate(`/messenger/${groups[0]?.id}`)
      if(id && !groups.find(group => group.id === parseInt(id))) return navigate(`/messenger/${groups[0]?.id}`)
    }, [id, groupsIsLoading, groups])

  return (
    <section id="dashboard">

      {profile && <Profile />}
      {openImage && <ModalImage />}
      {searchModal && <SearchModal />}

      <Aside />

      {(!groupsIsLoading && !hasNoGroups) && <Chat conversation={groups.find(group => group.id === parseInt(id))} />}
      {(!groupsIsLoading && hasNoGroups) && <NoGroupYet />}

    </section>
  )
}
