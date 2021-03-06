import React, { useContext } from 'react'
import { RoomContext } from '../context'
import Loading from './Loading'
import RoomsFilter from './RoomsFilter'
import RoomsList from './RoomsList'

const RoomsContainer = () => {

  const { loading, sortedRooms, rooms } = useContext(RoomContext)

  if (loading) {
    return <Loading />
  }

  return (
    <div>
      <h1>Rooms container</h1>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </div>
  )
}

export default RoomsContainer
