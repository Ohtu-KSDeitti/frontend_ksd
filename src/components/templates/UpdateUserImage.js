/* eslint-disable no-unused-vars */
import { useQuery, useMutation } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { GET_USER_IMAGES, REMOVE_PROFILE_PIC, UPDATE_PROFILE_PIC } from '../../queries'
import resizeImg from '../utils/ImageUtils'
import ShowImg from './ShowImg'

const ProfilePic = ({ id }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [image, setImage] = useState('none')
  const [updatePicture] = useMutation(UPDATE_PROFILE_PIC)
  const [removePicture] = useMutation(REMOVE_PROFILE_PIC)
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

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const deletePicture = async (event) => {
    event.preventDefault()
    await removePicture({
      variables: {
        id,
      },
    })

    setImage('none')
  }

  const submitPicture = async (event) => {
    event.preventDefault()
    if (!selectedFile || !selectedFile.type.includes('image')) {
      return
    }

    const resizedImg = await resizeImg(selectedFile)

    const { data: { updateProfilePic } } = await updatePicture({
      variables: {
        id,
        profilePic: resizedImg.name,
      },
    })

    const s3data = JSON.parse(updateProfilePic)

    const formData = new FormData()
    Object.keys(s3data.fields).forEach((key) => {
      formData.append(key, s3data.fields[key])
    })

    formData.append('file', resizedImg)

    const response = await fetch(s3data.url, { method: 'POST', body: formData })
    if (!response.ok) {
      console.log('Error in uploading')
      console.log(response)
      return
    }

    setSelectedFile(null)
    setImage(resizedImg.name)
  }

  return (
    <>
      <h1>Muokkaa profiilikuvaasi</h1>
      <ShowImg img={image} id={id} />
      {(image !== 'none')
        ? <div><Button id="delete-picture" onClick={deletePicture} type="button">Poista profiilikuva</Button></div> : '' }
      <Form onSubmit={submitPicture}>
        <Form.Label>Lataa uusi kuva</Form.Label>
        <Form.Control
          type="file"
          onChange={onFileChange}
        />
        <Button id="submit-picture" type="submit">Lähetä</Button>
      </Form>
    </>
  )
}

export default ProfilePic
