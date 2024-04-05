import React from 'react'
import './loading.css'

const LoadingContent = () => {
  return (
    <div className="loading_content">
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

export default LoadingContent
