import React from 'react'
import loadingGif from '../images/gif/loading-arrow.gif'

const Loading = () => {
  return (
    <div>
      <h4>loading rooms data ...</h4>
      <img src={loadingGif} alt="" />
    </div>
  )
}

export default Loading
