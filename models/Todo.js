import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: false },
  isComplete: { type: Boolean, required: false, default: false },
  owner: { type: mongoose.Types.ObjectId, ref: "User", required: true },
});

module.exports = mongoose.models.Todo || mongoose.model("Todo", userSchema);
