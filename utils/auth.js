
const jwt = require('jsonwebtoken')


exports.generateTokens = (data) => {
  const accessToken = jwt.sign(
    { id: data },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }  // short expiry
  );

  const refreshToken = jwt.sign(
    { id: data },
    process.env.JWT_REFRESH_SECRET,
    { expiresIn: "7d" }   // longer expiry
  );

  return { accessToken, refreshToken };
};

