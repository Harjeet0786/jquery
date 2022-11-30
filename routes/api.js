let express = require("express");
let router = express.Router();
var multer = require("multer");
let Auth = require("../app/Middlewares/Auth");

//File Upload
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "." + file.originalname);
  },
});

var upload = multer({ storage: storage });


// user Routes//////
let UserController = require("../app/Controllers/Api/UserController");
var user = new UserController();

router.post("/login", [], (req, res, next) => {
  return user.login(req, res, next);
});
router.post("/signup", [], (req, res, next) => {
  return user.signup(req, res, next);
});
router.get("/createuser", [], (req, res, next) => {
  return user.userJoin(req, res, next);
});
module.exports = router;
// router.put("/sendrequest", [], (req, res, next) => {
//   return user.sendRequest(req,res, next);
// });
// router.get("/getuserwithusersession", [], (req, res, next) => {
//   return user.getUserSession(req, res, next);
// });
// router.get("/fullusernotewithsession", [], (req, res, next) => {
//   return user.getUserNotesWithUserSession(req, res, next);
// });




// // user note  Routes/////////
// let UserNoteController = require("../app/Controllers/Api/UserNoteController");
// var usernote = new UserNoteController();

// router.post("/usernote", [], (req, res, next) => {
//   return usernote.createUserNote(req, res, next);
// });
// router.get("/getusernote", [], (req, res, next) => {
//   return usernote.getUserNote(req, res, next);
// });
// router.put("/updateusernote", [], (req, res, next) => {
//   return usernote.updateUserNote(req, res, next);
// });
// router.delete("/deleteusernote", [], (req, res, next) => {
//   return usernote.deleteUserNote(req, res, next);
// });


// // usersession  Routes///////
// let UserSessionController = require("../app/Controllers/Api/UserSessionController");
// var usersession = new UserSessionController();

// router.post("/createusersession", [], (req, res, next) => {
//   return usersession.createUserSession(req, res, next);
// });

