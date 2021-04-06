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

  const flatData = (data) => {
    let flattenData = data.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);

      let room = { ...item.fields, images, id };
      return room;
    });
    return flattenData;
  }

  useEffect(() => {
    let rooms = flatData(items)
    console.log(rooms)
  }, [])


  return (
    <RoomContext.Provider value={{ ...data }}>
      { children }
    </RoomContext.Provider>
  )
}