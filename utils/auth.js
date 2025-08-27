import bcrypt from "bcryptjs";
import { hash, compare } from "bcryptjs";
import { sign, verify } from "jsonwebtoken";

const hashPassword = async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  return hashedPassword;
};

const generateToken = (data) => {
  const token = sign(data, process.env.JWT_SECRET, { expiresIn: "1h" });
  return token;
};

const verifyPassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

const verifyToken = (token) => {
  try {
    const validationResult = verify(token, process.env.JWT_SECRET);
    return validationResult;
  } catch (err) {
    console.log("Verify Token Error =>", err);
    return false;
  }
};

export { hashPassword, generateToken, verifyPassword, verifyToken };
