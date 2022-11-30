const { UserSession } = require("../../Models");
const helper = require("../../../helper/helper.js");

module.exports = class UserSessionController {

  //create user session
  async getRecentConservation(req, res, next) {
    
  }
  async getConversationByRoomId(req, res, next) {
  }

  async initiate(req, res, next) {
  }

  async postMessage(req, res, next) {
  }
  async markConversationReadByRoomId(req, res, next) {
  }

}

    // try {
    //   const token = await helper.sign("test");

    //   console.log("hello");
    //   let input = req.body;
    //   let user_id = input.user_id;
    //   console.log("hello");
    //   const usersession = {
    //     user_id: req.body.user_id,
    //     token:token,
    //   };
  //     console.log(req.body);
  //     console.log("reached2");

  //     let postResponse = await UserSession.create(usersession);
  //     console.log("hello", postResponse);

  //     if (!usersession) {
  //       return res.status(400).send({status: "RXERROR",message: "usersession  not create succesfully",});
  //     }
  //     return res.status(200).send({ status: "RXSUCESS",message: "usersession created successfully",data: usersession,});
  //   } catch (e) {
  //     console.log("Error #91", e);
  //     next(e);
  //   }
  // }
// };

