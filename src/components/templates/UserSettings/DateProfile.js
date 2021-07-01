import React from 'react'
import { Form, Button } from 'react-bootstrap'
import Select from 'react-select'
import ReactIsCapsLockActive from '@matsun/reactiscapslockactive'
import regions from '../../utils/lists'
import Notification from '../../utils/Notification'

const DateProfile = ({
  dateNotification,
  user,
  submitDateProfile,
  dateOfBirth,
  location,
  bio,
  handleChange,
  setGender,
  setDateOfBirth,
  setStatus,
  setLocation,
  setBio,
}) => {
  const userRegions = regions.filter((option) => user.userInfo.prefRegions.includes(option.value))

  return (
    <>
      {user.userInfo.dateOfBirth === '' ? <h2>Luo deittiprofiili</h2> : <h2>Muokkaa deittiprofiiliasi</h2>}
      <Form onSubmit={submitDateProfile}>
        <ReactIsCapsLockActive>
          {(active) => <p style={{ color: 'blue' }}>{active ? 'Caps lock on päällä' : ''}</p>}
        </ReactIsCapsLockActive>
        <Notification message={dateNotification} />
        <Form.Group>
          <Form.Label>Sukupuoli:</Form.Label>
          <Form.Control id="gender" as="select" defaultValue={user.userInfo.gender} onChange={({ target }) => setGender(target.value)}>
            <option value="FEMALE">Nainen</option>
            <option value="MALE">Mies</option>
          </Form.Control><br />
          <Form.Label>Syntymäaika</Form.Label>
          <Form.Control
            id="dateOfBirth"
            required
            type="date"
            minDate="1900-01-01"
            maxDate="2003-06-29"
            value={dateOfBirth}
            onChange={({ target }) => setDateOfBirth(target.value)}
          /><br />
          <Form.Label>Siviilisääty:</Form.Label>
          <Form.Control id="status" as="select" defaultValue={user.userInfo.status} onChange={({ target }) => setStatus(target.value)}>
            <option value="SINGLE">Sinkku</option>
            <option value="DIVORCED">Eronnut</option>
            <option value="WIDOWED">Leski</option>
            <option value="TAKEN">Parisuhteessa</option>
            <option value="MARRIED">Naimisissa</option>
          </Form.Control>
          <br />
          <Form.Label>Paikkakunta:</Form.Label>
          <Form.Control
            id="location"
            as="select"
            required
            value={location}
            onChange={({ target }) => setLocation(target.value)}
          >
            <option value="AHVENANMAA">Ahvenanmaa</option>
            <option value="ETELAKARJALA">Etelä-Karjala</option>
            <option value="ETELAPOHJANMAA">Etelä-Pohjanmaa</option>
            <option value="ETELASAVO">Etelä-Savo</option>
            <option value="KAINUU">Kainuu</option>
            <option value="KANTAHAME">Kanta-Häme</option>
            <option value="KESKIPOHJANMAA">Keski-Pohjanmaa</option>
            <option value="KESKISUOMI">Keski-Suomi</option>
            <option value="KYMENLAAKSO">Kymenlaakso</option>
            <option value="LAPPI">Lappi</option>
            <option value="PIRKANMAA">Pirkanmaa</option>
            <option value="POHJANMAA">Pohjanmaa</option>
            <option value="POHJOISKARJALA">Pohjois-Karjala</option>
            <option value="POHJOISPOHJANMAA">Pohjois-Pohjanmaa</option>
            <option value="POHJOISSAVO">Pohjois-Savo</option>
            <option value="PAIJATHAME">Päijät-Häme</option>
            <option value="SATAKUNTA">Satakunta</option>
            <option value="UUSIMAA">Uusimaa</option>
            <option value="VARSINAIS-SUOMI">Varsinais-Suomi</option>
          </Form.Control><br />
          <Form.Label>Etsin seuraa maakunnista:</Form.Label>
          <Select
            id="regions"
            as="select"
            isMulti
            options={regions}
            defaultValue={userRegions}
            onChange={handleChange}
          />
          <Form.Label>Vapaa kuvaus itsestäsi:</Form.Label>
          <Form.Text id="bioInfo" muted>
            Kuvauksen maksimipituus on 500 merkkiä.
          </Form.Text>
          <Form.Control
            as="textarea"
            required
            rows="3"
            id="bio"
            type="text"
            maxLength="500"
            value={bio}
            onChange={({ target }) => setBio(target.value)}
          /><br />
          {user.userInfo.dateOfBirth === '' ? (
            <div><Form.Check
              id="christianAndSingle"
              required
              label="Olen täysi-ikäinen ja kristitty sinkku"
            /><br /> <Button id="dateprofile-button" type="submit"> Luo deittiprofiili</Button>
            </div>
          ) : <Button id="dateprofile-button" type="submit"> Tallenna muutokset</Button>}
        </Form.Group>
      </Form>
    </>
  )
}

export default DateProfile
