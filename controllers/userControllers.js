const asyncHandler = require("express-async-handler");
const User = require("../db/models/user");
//const PasswordResetToken = require("../models/PasswordResetTokenModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
//const nodemailer = require("nodemailer");

// Login
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "User does not exist" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  const payload = { id: user.id };
  const options = { expiresIn: "1y" };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);

  res.status(200).json({ token, user: user });
});

// Register
const registerUser = asyncHandler(async (req, res) => {
  const { name , email,  password } =
    req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email is already registered" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,  
    password: hashedPassword,
  });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully" });
});

// Logout -- just for checking the auth middleware
const logout = asyncHandler(async (req, res) => {
  // blacklist ?

  res.status(200).json({ message: "Logout successful" });
});

// Updating user and adding image
// const updateUserInfo = asyncHandler(async (req, res) => {
//   const { firstName, lastName, phone, location, birthday, description } =
//     req.body;
//   // console.log(req.body)

//   const profileImage = req.file ? req.file.filename : null;

//   const userId = req.user.id;
//   // console.log(userId)

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     user.firstName = firstName || user.firstName;
//     user.lastName = lastName || user.lastName;
//     user.phone = phone || user.phone;
//     user.location = location || user.location;
//     user.birthday = birthday || user.birthday;
//     user.description = description || user.description;

//     if (profileImage) {
//       user.image = profileImage;
//     }
//     await user.save();
//     res
//       .status(200)
//       .json({ message: "User information updated successfully", user });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // Update password
// const updatePassword = asyncHandler(async (req, res) => {
//   const { currentPassword, newPassword } = req.body;
//   const userId = req.user.id;

//   try {
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if current password matches
//     const isMatch = await bcrypt.compare(currentPassword, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ message: "Current password is incorrect" });
//     }

//     // Hash the new password
//     const hashedPassword = await bcrypt.hash(newPassword, 10);
//     user.password = hashedPassword;

//     await user.save();

//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// });

// // verify password
// const verifyEmailToken = asyncHandler(async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     let passwordResetToken = await PasswordResetToken.findOne({
//       userId: user.id,
//     });

//     const resetToken = crypto.randomBytes(20).toString("hex");
//     const expires = Date.now() + 3600000; // 1 hour

//     if (passwordResetToken) {
//       // Update the existing token
//       passwordResetToken.token = resetToken;
//       passwordResetToken.expires = expires;
//       await passwordResetToken.save();
//     } else {
//       // Create a new token
//       passwordResetToken = new PasswordResetToken({
//         userId: user.id,
//         token: resetToken,
//         expires,
//       });
//       await passwordResetToken.save();
//     }

//     const transporter = nodemailer.createTransport({
//       service: "Gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD,
//       },
//     });

//     const resetUrl = `http://${req.headers.host}/reset-password/${resetToken}`;
//     const mailOptions = {
//       to: user.email,
//       from: process.env.EMAIL,
//       subject: "Merecato Password Reset Request",
//       text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
//               Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n
//               ${resetUrl}\n\n
//               If you did not request this, please ignore this email and your password will remain unchanged.\n`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.json({ message: "Password reset email sent" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // reset password
// const resetPassword = asyncHandler(async (req, res) => {
//   const { token } = req.params;
//   const { newPassword } = req.body;

//   try {
//     const passwordResetToken = await PasswordResetToken.findOne({
//       token,
//       expires: { $gt: Date.now() },
//     });

//     if (!passwordResetToken)
//       return res
//         .status(400)
//         .json({ message: "Password reset token is invalid or has expired" });

//     const user = await User.findById(passwordResetToken.userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);
//     await user.save();

//     // Remove the token after successful password reset
//     await PasswordResetToken.deleteOne({ _id: passwordResetToken._id });

//     res.json({ message: "Password has been reset" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = {
  registerUser,
  login,
  logout,
//   updateUserInfo,
//   updatePassword,
//   verifyEmailToken,
//   resetPassword,
};