import axios from "axios";

const { AOC_COOKIE_SESSION: cookieSession } = process.env;

export const fetchInput = async (year, day) => {
  if (new Date() < new Date(`${year}-12-${day}`)) {
    throw Error("Cannot fetch input before puzzle is released.");
  }

  if (!cookieSession) throw Error("Session cookie does not exist.");
  const url = `https://adventofcode.com/${year}/day/${day}/input`;
  const response = await axios.get(url, {
    headers: { Cookie: `session=${cookieSession}` },
  });
  return response.data;
};
