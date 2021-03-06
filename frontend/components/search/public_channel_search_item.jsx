import React from "react"
import { useSelector } from "react-redux"
import { Link, useHistory } from "react-router-dom"
import {joinChannel} from "../../util/action_cable_util/channel_util"

export default ({thread, setSearchEntry, setDisplaySearch}) => {

  const currentUserId = useSelector(state => state.session.id)
  const history = useHistory()

  function handleClick(){
    joinChannel(thread, currentUserId)
    setSearchEntry("")
    setDisplaySearch(false)
    history.push(`/client/${thread.id}`)
  }

  return(
    <div className="search-public-channel">
      <a onClick={handleClick}>{thread.title}</a>
      <Link onClick={handleClick} to={`${thread.id}`}>Join</Link>
    </div>
  )
}