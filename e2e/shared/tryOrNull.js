const tryOrNull = async fn => {
  try {
    return await fn()
  } catch (e) {
    return null
  }
}
export default tryOrNull
