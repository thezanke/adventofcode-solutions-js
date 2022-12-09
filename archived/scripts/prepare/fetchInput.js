import axios from 'axios'
import { JSDOM } from 'jsdom'

const { AOC_COOKIE_SESSION: cookieSession } = process.env

export const fetchInput = async (day, year) => {
  const baseUrl = `https://adventofcode.com/${year}/day/${day}`

  console.log(`❗ Fetching input for ${baseUrl}`)

  if (new Date() < new Date(`${year}-12-${day}`)) {
    throw Error('Cannot fetch input before puzzle is released')
  }

  if (!cookieSession) {
    throw Error('Session cookie does not exist')
  }

  const url = `${baseUrl}/input`
  const response = await axios.get(url, {
    headers: { Cookie: `session=${cookieSession}` }
  })

  return response.data.replace(/\r?\n$/, '')
}

export const fetchExampleInput = async (day, year) => {
  const url = `https://adventofcode.com/${year}/day/${day}`

  console.log(`❗ Fetching example input for ${url}`)

  if (new Date() < new Date(`${year}-12-${day}`)) {
    throw Error('Cannot fetch example input before puzzle is released')
  }

  if (!cookieSession) {
    throw Error('Session cookie does not exist')
  }

  const response = await axios.get(url)
  const dom = new JSDOM(response.data)

  return dom.window.document
    .querySelector('pre>code')
    .textContent.replace(/\r?\n$/, '')
}
