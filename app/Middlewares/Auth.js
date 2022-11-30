const helper = require("../../helper/helper");
module.exports = (req, res, next) => {
   async  function authmiddleware(req, res, next)  {
    console.log("in middleware", req.headers.authorization);
    var token = req.headers.authorization;
    const verify = await helper.helper.js.verify(token);
    if (verify == null) {
      return res.status(401).send({
        message: "invalid token",
        data: {},
      });
    }
    req.query.id = verify._id;
    next();
  };
  return res.status(401).send({ status: "RXERROR", message: "Un-authorised" });
};
