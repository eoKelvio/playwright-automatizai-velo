const parseEnvParams = () => {
  return JSON.parse(process?.env?.PARAMS || '{}') || {}
}

export default parseEnvParams
