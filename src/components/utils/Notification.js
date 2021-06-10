import React from 'react'
/* eslint-disable eol-last */

const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  return <div className="alert">{message}</div>
}

export default Notification