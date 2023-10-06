import { Friends as Page } from "./Tabs/Friends";
import Layout from './Layout';
import { useTranslation } from "../../Hooks/CustomHooks";

export default function Friends() {
  const { t } = useTranslation()
  return (

    <Layout element={<Page />} name={t('settings.my_friends')} />

  )
}
