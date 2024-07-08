import randomString from "randomstring";

export const generateRandomUrl = () => {
  return randomString.generate({
    length: 7,
    charset: "alphabetic",
  });
};
