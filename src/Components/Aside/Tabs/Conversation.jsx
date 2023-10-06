import { Group } from '../Group';
import { useMessenger } from '../../../Hooks/CustomHooks';
import { Loader } from '../../Loader';

export default function Conversation() {

  const { groups, loadingGroups } = useMessenger()

  return (
    <section className="conversations">
        {loadingGroups && <Loader />}
        {groups?.map(group => 
            <Group key={group.id} group={group} />
        )}
    </section>
  )
}
