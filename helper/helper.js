const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

async function hashedPassword(password) {
  const salt = await bcrypt.genSalt(10);
  console.log(salt,password);
  try {
    return bcrypt.hash(password, salt);
  } catch (error) {
    throw error;
  }
}

async function comparePass(dbpass, inputpass) {
  console.log("compare pass",dbpass, inputpass);
  const salt = await bcrypt.genSalt(10);
  try {
    return bcrypt.compare(dbpass, inputpass);
  } catch (error) {
    throw error;
  }
}
const verifyToken = (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "MYSECERETKEY");
    req.user = decoded;
  } catch (err) {
    return res
      .status(401)
      .send({ status: "RXERROR", message: "Invalid Token" });
  }
  return next();
};

function sign(payload) {
  return jwt.sign(payload, env("JWT_SECRET_KEY"));
}
function verify(token) {
  try {
    
    token = token.replace("Bearer", "");
    token = token.replace(" ", "");
    var decoded = jwt.verify(token, process.env.secret_key);
    console.log(decoded);
    return decoded;
  } catch (e) {
    return null;
  }

  
}

module.exports = {
  hashedPassword,
   comparePass,
  verifyToken,
  sign,
  verify,
};
