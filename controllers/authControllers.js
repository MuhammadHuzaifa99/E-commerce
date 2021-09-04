const authModule = require("../module/authModule");
const jwt = require("jsonwebtoken");
const User = require("../module/authModule");
const bcrypt = require("bcryptjs");
const { promisify } = require("util");

exports.signUp = async (req, res) => {
  try {
    const user = await User.create(req.body);
    const token = await jwt.sign({ id: user._id }, process.env.jwt_web_secret);
    console.log(token);
    res.status(200).json({
      status: "success",
      token,
      user,
    });
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    var { email, password } = req.body;
    //check if user & email exits
    if (!email || !password) {
      return res.status(404).json({
        status: "error",
        error: "please enter email & password",
      });
    }
    //fetch user whose email is given
    var user = await User.findOne({ email }).select("+password");
    var { password, ...modifiedUser0 } = user.toObject();
    console.log(User);
    const token = await jwt.sign({ id: user._id }, process.env.jwt_web_secret);
    console.log(token);
    //verify password
    // enceptyed ps === password
    var passwordVerified = await bcrypt.compare(password, user.password);
    if (passwordVerified | !user) {
      return res.status(401).json({
        status: "error",
        error: "Invalid email & password",
      });
    }
    res.status(200).json({
      status: "login",
      token,
      User: modifiedUser0,
    });
    // if (!passwordVerified || !user) {
    //   return res.status(401).json({
    //     status: "error",
    //     error: "invalid email or password",
    //   });
    // }
    // var profileName = null;
    //fetching profile
  } catch (error) {
    res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};
// exports.forgotPassword = async (req, res) => {
//   try {
//     var { email } = req.body;
//     //1 - fetch user on the basis of email
//     var user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         status: "error",
//         error: "no user found!",
//       });
//     }
//     //2 - generate reset token
//     var resetToken = user.passwordResetTokenGenerator();
//     await user.save({ validateBeforeSave: false }); //saving already existing doc
//     //3 - send it to user's email
//     var msg = `please click to that link for changing your password, note that the link will expires in 10 min -  http://localhost:8000/api/v1/auth/reset-password/${resetToken}`;
//     await sendEmail({
//       to: email,
//       subject: "password reset token",
//       content: msg,
//     });
//     res.status(200).json({
//       status: "success",
//       msg: "reset token has been sent to the email",
//     });
//   } catch (error) {
//     return res.status(404).json({
//       status: "error",
//       error: error.message,
//     });
//   }
// };
exports.protect = async (req, res, next) => {
  try {
    var decodeToken = null;
    // 1- fetch the token
    if (
      req.headers.authentication &&
      req.headers.authentication.startsWith("Bearer")
    ) {
      decodeToken = req.headers.authentication.split(" ")[1];
      // console.log(decodeToken);
    }
    if (!decodeToken) {
      return res.status(401).json({
        error: "Please Sign In!",
      });
    }
    var { id, ...decodedToken } = await promisify(jwt.verify)(
      decodeToken,
      process.env.jwt_web_secret
    );
    // req.user = user;
    // return res.status(200).json({
    //   status: "success",
    //   id,
    // });
    next();
  } catch (error) {
    return res.status(404).json({
      status: "error",
      error: error.message,
    });
  }
};
