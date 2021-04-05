import { createContext, useState } from "react";

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


  return (
    <RoomContext.Provider value={{ ...data }}>
      { children }
    </RoomContext.Provider>
  )
}