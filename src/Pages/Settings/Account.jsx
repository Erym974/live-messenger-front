import { Account as Page } from "./Tabs/Account";
import Layout from './Layout';
import { useTranslation } from "../../Hooks/CustomHooks";

export default function Account() {

  const { t } = useTranslation()

  return (

    <Layout element={<Page />} name={t('settings.my_account')} />

  )
}
