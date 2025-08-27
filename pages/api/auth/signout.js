export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Clear the cookie by setting it to expire immediately
  res.setHeader("Set-Cookie", `token=; HttpOnly; Path=/; Max-Age=0`);

  return res.status(200).json({ message: "Signed out successfully" });
}
