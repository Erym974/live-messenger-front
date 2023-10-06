import { General as Page } from "./Tabs/General";
import Layout from './Layout';
import { useTranslation } from "../../Hooks/CustomHooks";
export default function General() {

  const { t } = useTranslation()
  return (

    <Layout element={<Page />} name={t('settings.general')} />

  )
}
