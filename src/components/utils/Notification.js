import React from 'react'
/* eslint-disable eol-last */

const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  if (message.match('^Salasana ') || message.match('^Virheellinen ')) {
    return <div className="alert">{message}</div>
  }
  return <div>{message}</div>
}

export default Notification