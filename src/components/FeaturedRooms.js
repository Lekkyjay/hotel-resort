import React, { useContext } from 'react'
import { RoomContext } from '../context'

const FeaturedRooms = () => {
  const { capacity } = useContext(RoomContext)
  return (
    <div>
      <h1>Featured rooms { capacity }</h1>
    </div>
  )
}

export default FeaturedRooms
