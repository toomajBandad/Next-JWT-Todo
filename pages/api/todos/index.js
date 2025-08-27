import connectToDB from "@/configs/db";
import { verifyToken } from "@/utils/auth";
import UserModel from "@/models/User";
import TodoModel from "@/models/Todo";

const handler = async (req, res) => {
  connectToDB();

  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ message: "You are not login !!" });
  }

  const tokenPayload = verifyToken(token);
  if (!tokenPayload) {
    return res.status(401).json({ message: "You are not login !!" });
  }

  const user = await UserModel.findOne({ email: tokenPayload.email });

  if (req.method === "GET") {
    try {
      const todos = await TodoModel.find({ owner: user._id });
      return res.status(200).json({ data: todos });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "UnKnown Internal Server Erorr !!" });
    }
  } else if (req.method === "POST") {
    try {
      const { title, desc, isComplete } = req.body;
      const newTodo = {
        title,
        desc,
        isComplete,
        owner: user._id,
      };
      await TodoModel.create(newTodo);
      return res
        .status(201)
        .json({ message: "new Todo Created successfully!" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "UnKnown Internal Server Erorr !!" });
    }
  } else if (req.method === "DELETE") {
    try {
      const { id } = req.body;
      await TodoModel.findByIdAndDelete(id);
      res.status(200).json({ message: "Item Deleted successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "UnKnown Internal Server Erorr !!" });
    }
  } else if (req.method === "PUT") {
    try {
      const { id, isComplete } = req.body;
      await TodoModel.findByIdAndUpdate(id, { isComplete });
      res.status(200).json({ message: "Item Updated successfully!" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "UnKnown Internal Server Erorr !!" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
};

export default handler;
