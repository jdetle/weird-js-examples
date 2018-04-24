// @flow //
import type {
  UserProfile,
} from "firebase-db-types"

export const getBase64 = (file: Blob): Promise<*> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}
