import React, { useEffect, useState } from 'react'
import FormSwitch from '../../../Components/FormSwitch'

export default function General() {

  const [allowFriends, setAllowFriends] = useState(false);
  

  return (
    <section id="general">
        <h1>Géneral</h1>
        <FormSwitch setData={setAllowFriends} data={allowFriends} >Autoriser les demandes d'amis</FormSwitch>
    </section>
  )
}
