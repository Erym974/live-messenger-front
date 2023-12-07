import { Group } from './Group';
import { useMessenger } from '../../Hooks/CustomHooks';
import { Loader } from '../Loader';

export default function Conversation() {

  const { groups, groupsIsLoading } = useMessenger()

  return (
    <section className="conversations">
        {groupsIsLoading && <Loader />}
        {groups?.map(group => 
            <Group key={group.id} group={group} />
        )}
    </section>
  )
}
