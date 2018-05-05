import seats from "../__mockData__/seats.json"
import { ROOT_URL } from "../consts"

const axios = jest.genMockFromModule("axios")

axios.get = (url) => {
  switch (url) {
    case `${ROOT_URL}/seats`:
      return Promise.resolve({ data: seats })
    default:
      throw new Error("URL not specified.")
  }
}

module.exports = axios
