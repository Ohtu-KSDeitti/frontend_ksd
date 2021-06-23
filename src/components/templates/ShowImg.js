import React from 'react'

const ShowImg = ({ img, id }) => {
  console.log(img)
  if (img === 'none') {
    return (
      <>
        Ei kuvaa, lisää kuva itsestäsi!
      </>
    )
  }
  return (
    <>
      <img src={`https://kdsimagebucket.s3.eu-central-1.amazonaws.com/${id}/${img}`} alt="user pic" onContextMenu={(e) => e.preventDefault()} />
    </>
  )
}

export default ShowImg
