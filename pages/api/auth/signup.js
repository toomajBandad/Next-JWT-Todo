import connectToDB from "@/configs/db";
import User from "@/models/User";
import { hashPassword } from "@/utils/auth";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  await connectToDB();

  const { firstname, lastname, username, email, password } = req.body;

  // Basic validation
  if (!firstname || !lastname || !username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check for existing email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Check for existing username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    const users = await User.find({});
    // Create user
    const newUser = await User.create({
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      role: users.length > 0 ? "USER" : "ADMIN",
    });

    // Respond with user info (excluding password)
    res.status(201).json({
      message: "User created successfully",
      user: {
        id: newUser._id,
        firstname,
        lastname,
        username,
        email,
      },
    });
  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
}
