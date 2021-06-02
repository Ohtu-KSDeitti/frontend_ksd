import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Notification from '../utils/Notification'

let notificationComponent

const errorCase1 = 'Virheellinen salasana'
const errorCase2 = 'Salasana ei vastaa varmennusta'
const errorCase3 = 'Hilipatihippaa'

test('Notification gives correct message case 1', () => {
  notificationComponent = render(
    <Notification message={errorCase1} />,
  )

  expect(notificationComponent.container).toHaveTextContent(
    'Virheellinen salasana',
  )
})
test('Notification gives correct message case 2', () => {
  notificationComponent = render(
    <Notification message={errorCase2} />,
  )

  expect(notificationComponent.container).toHaveTextContent(
    'Salasana ei vastaa varmennusta',
  )
})
/* test('Notification is not rendered', () => {
  notificationComponent = render(
    <Notification message={errorCase3} />,
  )

  expect(notificationComponent.type()).toEqual(null)
})
*/
