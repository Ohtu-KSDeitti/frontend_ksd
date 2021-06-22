import Resizer from 'react-image-file-resizer'
import { uuid } from 'uuidv4'

const resizeFile = (file) => new Promise((resolve) => {
  Resizer.imageFileResizer(
    file,
    500,
    500,
    'jpeg',
    90,
    0,
    (uri) => {
      resolve(uri)
    },
    'file',
  )
})

const resizeImg = (selectedFile) => {
  const newFile = new File([selectedFile], `${uuid()}.jpeg`)

  return resizeFile(newFile)
}

export default resizeImg
