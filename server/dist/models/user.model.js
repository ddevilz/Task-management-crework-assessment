"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const userSchema = new mongoose_1.default.Schema({
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
            validator: (email) => {
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
}, { timestamps: true });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password"))
        return next();
    this.password = await bcryptjs_1.default.hash(this.password, 10);
    next();
});
userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcryptjs_1.default.compare(enteredPassword, this.password);
};
userSchema.methods.generateJWTToken = function () {
    return jsonwebtoken_1.default.sign({
        _id: this._id,
        email: this.email,
    }, config_1.config.JWT_SECRET, { expiresIn: config_1.config.JWT_EXPIRY });
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
//# sourceMappingURL=user.model.js.map