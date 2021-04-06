import { createContext, useEffect, useState } from 'react'
import items from './data'

export const RoomContext = createContext()

export const RoomContextProvider = ({ children }) => {

  const [data, setData] = useState({
    rooms: [],
    sortedRooms: [],
    featuredRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false
  })

  const getFlatData = (data) => {
    let flatData = data.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url)

      let room = { ...item.fields, images, id }
      return room
    });
    return flatData
  }

  useEffect(() => {
    let rooms = getFlatData(items)
    let featuredRooms = rooms.filter(room => room.featured === true)
    let maxPrice = Math.max(...rooms.map(item => item.price))
    let maxSize = Math.max(...rooms.map(item => item.size))
    setData({
      ...data,
      rooms, 
      featuredRooms, 
      sortedRooms: rooms, 
      loading: false, 
      price: maxPrice, 
      maxPrice, 
      maxSize
    })
  }, [])


  return (
    <RoomContext.Provider value={{ ...data }}>
      { children }
    </RoomContext.Provider>
  )
}