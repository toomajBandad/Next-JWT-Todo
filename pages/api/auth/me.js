import { parse } from "cookie";
import UserModel from "@/models/User";
import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";

export default async function handler(req, res) {
  await connectToDB();

  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const cookies = parse(req.headers.cookie || "");
  const token = cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const jwtUser = verifyToken(token);
    const user = await UserModel.findOne({ email: jwtUser.email }).select(
      "-password -__v"
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(user);
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}
