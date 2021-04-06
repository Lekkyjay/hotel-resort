import { createContext, useEffect, useState } from 'react'
import Client from './Contentful'

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
   

  useEffect(() => { 
    const getData = async() => {
      try {
        let response = await Client.getEntries({
          content_type: 'hotelRoomReservation',
        })
        let rooms = getFlatData(response.items)
        let featuredRooms = rooms.filter(room => room.featured === true);
        let maxPrice = Math.max(...rooms.map(item => item.price));
        let maxSize = Math.max(...rooms.map(item => item.size));
        setData(data => ({...data,
          rooms, 
          featuredRooms, 
          sortedRooms: rooms, 
          loading: false, 
          price: maxPrice, 
          maxPrice, 
          maxSize
        }));
      } catch (error) {
        console.log(error);
      }
    }
    getData() 
  }, [])

  //flattens data
  const getFlatData = (data) => {
    let flatData = data.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url)

      let room = { ...item.fields, images, id }
      return room
    });
    return flatData
  }

  const getRoom = slug => {
    //create a copy of rooms array in tempRooms
    let tempRooms = [...data.rooms];
    const room = tempRooms.find(room => room.slug === slug);
    return room;
  }

  const handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    console.log(target, name, value)
    setData(data => ({
      ...data,
      [name]: value,
      
    }))
  }
  
  useEffect(() => {
    const filterRooms = () => {
      let {rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = data;

      let tempRooms = [...rooms]

      capacity = parseInt(capacity);
      // price = parseInt(price);    
      
      // filter by type
      if (type !== "all") {
        tempRooms = tempRooms.filter(room => room.type === type);
      }
          
      // filter by capacity
      if (capacity !== 1) {
        tempRooms = tempRooms.filter(room => room.capacity >= capacity);
      }
      // filter by price
      tempRooms = tempRooms.filter(room => room.price <= price);

      //filter by size
      tempRooms = tempRooms.filter(
        room => room.size >= minSize && room.size <= maxSize
      );

      //filter by breakfast
      if (breakfast) {
        tempRooms = tempRooms.filter(room => room.breakfast === true);
      }

      //filter by pets
      if (pets) {
        tempRooms = tempRooms.filter(room => room.pets === true);
      }

      setData(data => ({...data, sortedRooms: tempRooms}));
    }
  
    filterRooms()
  }, [
    data.type,
    data.capacity,
    data.price,
    data.minPrice,
    data.maxPrice,
    data.minSize,
    data.maxSize,
    data.breakfastalse,
    data.pets
  ])

  return (
    <RoomContext.Provider value={{ ...data, getRoom, handleChange }}>
      { children }
    </RoomContext.Provider>
  )
}