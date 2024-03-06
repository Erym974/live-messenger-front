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

  const { profile, profileIsLoading } = useProfile();
  const { id } = useParams()
  const { open: openImage } = useSelector(state => state.images)
  const { setConversation, groups, groupIsLoading, groupsIsLoading, group } = useMessenger()
  const [hasNoGroups, setHasNoGroups] = useState(false);
  const { searchModal } = useModal();

  useEffect(() => {
  }, [useDocumentTitle("SwiftChat")])

  useEffect(() => {
    if(groups?.length === 0) setHasNoGroups(true)
    else setHasNoGroups(false)
  }, [groups])

    useEffect(() => {
      setConversation(id)
    }, [id])

  return (
    <section id="dashboard">

      {profileIsLoading || profile ? <Profile /> : null}
      {openImage && <ModalImage />}
      {searchModal && <SearchModal />}

      <Aside />

      {(!groupIsLoading && !hasNoGroups) && <Chat conversation={group} />}
      {(!groupsIsLoading && hasNoGroups) && <NoGroupYet />}

    </section>
  )
}
