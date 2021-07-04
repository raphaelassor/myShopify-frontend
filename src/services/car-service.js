import axios from 'axios'

const BASE_URL = process.env.NODE_ENV === 'production' ? '/api/car' : 'http://localhost:3030/api/car'

function query() {
  return axios.get(BASE_URL).then(res => res.data)
}

export const carService = {
  query
}