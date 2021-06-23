import { useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GET_USER_IMAGES } from '../../queries'
import ShowImg from './ShowImg'

const ProfilePic = ({ id }) => {
  const [image, setImage] = useState('none')
  const { loading, error, data } = useQuery(GET_USER_IMAGES,
    {
      variables:
      {
        id,
      },
    })

  useEffect(() => {
    if (data) {
      const { getUserImages: { profilePic } } = data
      setImage(profilePic)
    }
  }, [data])

  if (loading) {
    return 'Loading...'
  }

  if (error) {
    return `Error! ${error.message}`
  }

  return (
    <>
      <ShowImg img={image} id={id} />
    </>
  )
}

export default ProfilePic
