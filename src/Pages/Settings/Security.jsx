import { Security as Page } from "./Tabs/Security";
import Layout from './Layout';
import { useTranslation } from "../../Hooks/CustomHooks";
export default function Security() {
  const { t } = useTranslation()
  return (

    <Layout element={<Page />} name={t('settings.security')} />

  )
}
