import React, { useContext } from 'react'
import { RoomContext } from '../context'
import Loading from './Loading'
import Room from './Room'
import Title from './Title'

const FeaturedRooms = () => {
  const { loading, featuredRooms: rooms } = useContext(RoomContext) //rooms is an alias

  const roomsJsx = rooms.map(room => {
    return <Room key={room.id} room={room} />
  })

  return (
    <section className="featured-rooms">
      <Title title="featured rooms" />
      <div className="featured-rooms-center">
        {loading ? <Loading /> : roomsJsx}
      </div>
    </section>
  )
}

export default FeaturedRooms
