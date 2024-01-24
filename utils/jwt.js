import Jwt from "jsonwebtoken";

export const createJWT = (payload) => {
  return Jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });
};
export const verifyJWT = (Token) => {
  return Jwt.verify(Token, process.env.JWT_SECRET);
};
