import React from 'react'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return(
    <div>
      <a href='/' style={padding}>main page</a>
      <a href='/login' style={padding}>login</a>
    </div>
  )
    
}

export default Menu