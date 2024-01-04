const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization;
  console.log("tokentokentokentoken", token);
  if (!token)
    return res.status(403).json({
      status: "error",
      error: true,
      message: "Access Denied: No token provided",
    });

  try {
    const tokenDetails = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_PRIVATE_KEY
    );
    req.user = tokenDetails;
    next();
  } catch (err) {
    console.log(err);
    res.status(403).json({
      status: "error",
      error: true,
      message: "Access Denied: Invalid token",
    });
  }
};

module.exports = {
  auth,
};
