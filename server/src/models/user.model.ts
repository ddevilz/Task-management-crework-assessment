import mongoose, { Document, Schema, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
  generateJWTToken(): string;
}

const userSchema: Schema<IUser> = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: [true, "Email address is required"],
      validate: {
        validator: (email: string) => {
          const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
          return re.test(email);
        },
        message: "Please fill a valid email address",
      },
    },
    password: {
      type: String,
      select: false,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
  },
  { timestamps: true }
);

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJWTToken = function (): string {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
    },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRY }
  );
};

const User: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default User;
