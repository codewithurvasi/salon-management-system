import jwt from "jsonwebtoken";

const generateToken = (id, role) => {
  const secret = process.env.JWT_SECRET || "salon-secret-key";
  return jwt.sign({ id, role }, secret, {
    expiresIn: "30d",
  });
};

export default generateToken;