import { useQuery } from '@apollo/client'
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { GET_USER_IMAGES } from '../../queries'

const ShowImg = ({ img, id }) => {
  if (img === 'none') {
    return (
      <>
        Ei kuvaa, lisää kuva itsestäsi!
      </>
    )
  }
  return (
    <>
      <img src={`https://kdsimagebucket.s3.eu-central-1.amazonaws.com/${id}/${img}`} alt="user pic" />
    </>
  )
}

const ProfilePic = ({ id }) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const { loading, error, data } = useQuery(GET_USER_IMAGES,
    {
      variables:
      {
        id,
      },
    })

  if (loading) {
    return 'Loading...'
  }

  if (error) {
    return `Error! ${error.message}`
  }

  const { getUserImages: { profilePic } } = data

  const onFileChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const submitPicture = (event) => {
    event.preventDefault()
    /* Tähän logiikka kuvan lähettämiseen
      presigned urlit vai backendin kautta?
    */

    console.log(selectedFile)
  }

  return (
    <>
      <h1>Muokkaa profiilikuvaasi</h1>
      <ShowImg img={profilePic} id={id} />
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
