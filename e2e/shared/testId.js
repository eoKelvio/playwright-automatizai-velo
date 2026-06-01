const testId = (size = 4) =>
  Date.now()
    .toString()
    .slice(size * -1)

export default testId
