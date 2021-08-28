
export const extractErrors = (error): any => {
  const errorDetail = error.details.reduce((prev, curr) => {
    // if it exists
    if (prev[curr.path[0]]) {
      prev[curr.path[0]].push(curr.type)
    } else {
      prev[curr.path[0]] = [curr.type]
    }
    return prev
  }, {})

  return {
    errorDetail, // error detail
    errorFields: Object.keys(errorDetail) // fields name with error
  }
}
