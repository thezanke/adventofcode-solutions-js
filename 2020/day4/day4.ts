import { BYR, ECL, EYR, HCL, HGT, IYR, PID } from "./constants.ts";

export interface Passport {
  [key: string]: string;
}

export const parsePassport = (str: string) => {
  const passport: Passport = {};

  str.split(/\n/).forEach((line) => {
    line.split(" ").forEach((field) => {
      const [fieldName, value] = field.split(":");
      passport[fieldName] = value;
    });
  });

  return passport;
};

const REQUIRED_FIELDS = [BYR, IYR, EYR, HGT, HCL, ECL, PID];
const VALID_ECL = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"];

export const hasAllRequiredFields = (passport: Passport) => {
  const passportFields = Object.keys(passport);
  return !REQUIRED_FIELDS.filter((f) => !passportFields.includes(f)).length;
};

export const isPassportValid = (passport: Passport) => {
  if (!hasAllRequiredFields(passport)) return false;

  // byr
  if (passport.byr.length != 4) return false;
  const byr = Number(passport.byr);
  if (byr < 1920 || byr > 2002) return false;

  // iyr
  if (passport.iyr.length != 4) return false;
  const iyr = Number(passport.iyr);
  if (iyr < 2010 || iyr > 2020) return false;

  // eyr
  if (passport.eyr.length != 4) return false;
  const eyr = Number(passport.eyr);
  if (eyr < 2020 || eyr > 2030) return false;

  // hgt
  const heightMatch = passport.hgt.match(/(\d+)(.+)/);
  if (!heightMatch) return false;
  const [, heightStr, heightUnit] = heightMatch;
  const height = Number(heightStr);
  if (!(height && heightUnit)) return false;
  if (heightUnit === "cm") {
    if (height < 150 || height > 193) return false;
  } else {
    if (height < 59 || height > 76) return false;
  }

  // hcl
  if (!/#[a-z0-9]{6}/.test(passport.hcl)) return false;

  // ecl
  if (!VALID_ECL.includes(passport.ecl)) return false;

  // pid
  if (passport.pid.length != 9) return false;

  return true;
};
