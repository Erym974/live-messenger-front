import React, { useEffect, useState } from 'react'

import './friends.scss'
import Friend from '../../../Components/Friend/Friend'
import { fakeFriends } from '../../../faker'
import { Autocomplete, TextField } from '@mui/material'

export default function Friends() {

  const [friends, setFriends] = useState(fakeFriends)
  const [filteredFriends, setFilteredFriends] = useState(friends)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const searchedValue = search.toLocaleLowerCase()
    if(searchedValue === '') return setFilteredFriends(friends)
    setFilteredFriends( friends.filter(friend => friend.firstname.toLowerCase().includes(searchedValue) || friend.lastname.toLowerCase().includes(searchedValue)))
  }, [search])

  return (
    <section id="friends">
        <h1>Mes amis</h1>
        <div className="search-bar">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={friends.map(function(friend) { return friend.firstname + ' ' + friend.lastname })}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Rechercher" />}
          onKeyDown={({ target: { value } }) => {
            setSearch(value)
          }}
        />
        </div>

        <div className="friends-container">
          {filteredFriends.map((friend, index) => <Friend key={index} friend={friend} />)}
        </div>
    </section>
  )
}
