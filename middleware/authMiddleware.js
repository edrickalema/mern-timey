import { UnauthenticatedError } from "../customerrors/customError.js";
import { verifyJWT } from "../utils/jwt.js";

export const authMiddleware = async (req, res, next) => {
      const token = await req.cookies.token;
      if (!token) throw new UnauthenticatedError("unauthenticated user");

  try {
    const { userId, userRole } = verifyJWT(token);

    req.user = { userId, userRole };
    next();
  } catch (error) {
    console.log(error);
  }
};
