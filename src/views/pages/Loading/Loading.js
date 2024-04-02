import React from 'react'
import './loading.css'

const Loading = () => {
  return (
    <div className="loading_page">
      <div className="lds_roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  )
}

export default Loading
