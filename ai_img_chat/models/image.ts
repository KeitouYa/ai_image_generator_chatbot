import mongoose from "mongoose";

// Define the Image schema
const ImageSchema = new mongoose.Schema(
  {
    userEmail: { type: String, required: true, index: true },
    userName: String,
    //input prompt
    name: String,
    url: String,
  },
  { timestamps: true }
);

const Image = mongoose.models.Image || mongoose.model("Image", ImageSchema);
export default Image;
