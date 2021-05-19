import React from 'react'

const Menu = () => {
  const padding = {
    paddingRight: 5
  }

  return(
    <div>
      <a href='/' style={padding}>Pääsivu</a>
      <a href='/login' style={padding}>Kirjaudu</a>
    </div>
  )
    
}

export default Menu