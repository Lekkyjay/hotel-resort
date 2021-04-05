import React, { useState } from 'react'
import { FaBeer, FaCocktail, FaHiking, FaShuttleVan } from 'react-icons/fa'
import Title from './Title'

const Services = () => {

  const [services, setServices] = useState([
    {
      icon: <FaCocktail />,
      title: "Free Cocktails",
      info:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?"
    },
    {
      icon: <FaHiking />,
      title: "Endless Hiking",
      info:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?"
    },
    {
      icon: <FaShuttleVan />,
      title: "Free Shuttle",
      info:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?"
    },
    {
      icon: <FaBeer />,
      title: "Strongest Beer",
      info:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias molestias eius libero?"
    }
  ])

  return (
    <section className="services">
      <Title title="services" />
      <div className="services-center">
        {services.map(item => (
            <article key={`item-${item.title}`} className="service">
              <span>{item.icon}</span>
              <h6>{item.title}</h6>
              <p>{item.info}</p>
            </article>
          )
        )}
      </div>
    </section>
  )
}

export default Services
