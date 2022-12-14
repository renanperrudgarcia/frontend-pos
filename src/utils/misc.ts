// export const trimObject = <T>(object: Object, values: any[] = [undefined, null, '']): T => {
//   const newObject = <T>{}

//   for (const key of Object.keys(object)) {
//     if (values.indexOf(object[key]) === -1) {
//       newObject[key] = object[key]
//     }
//   }

//   return newObject
// }

export const validateEmail = (email: string) => {
  const re = /\S+@\S+\.\S+/
  return re.test(email)
}
