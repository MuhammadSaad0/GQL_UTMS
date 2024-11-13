import jwt from "jsonwebtoken";

export const getUserFromToken = (token) => {
  try {
    if (token) {
      if (jwt.verify(token, "VERY_SECRET_KEY")) {
        const decoded = jwt.decode(token);
        return decoded;
      }
    }
    return null;
  } catch (err) {
    return null;
  }
};

export async function context({ req }) {
  const token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  const user = getUserFromToken(token);
  return { user };
}
