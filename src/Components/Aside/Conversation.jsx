import { Group } from './Group';
import { useAuth, useMessenger } from '../../Hooks/CustomHooks';
import { Loader } from '../Loader';
import { useEffect } from 'react';
import { socket } from '../../socket';
import { useDispatch } from 'react-redux';
import { moveConversationToTop } from '../../Slices/messengerSlice';

export default function Conversation() {

  const { groups, groupsIsLoading } = useMessenger()
  const dispatch = useDispatch()
  const { auth } = useAuth()

  useEffect(() => {

    if(!groups) return

    groups?.forEach(group => {
      socket.emit("join-conversation", {id: group.id, token: auth })
    })

    socket.on('conversation-to-top', (params) => dispatch(moveConversationToTop({group: params.group, message: params.message})))

    return () => {
      groups?.forEach(group => {
        socket.off("conversation")
      })
    }

  }, [groups])

  return (
    <section className="conversations">
        {groupsIsLoading && <Loader />}
        {groups?.map(group => 
            <Group key={group.id} group={group} />
        )}
    </section>
  )
}
