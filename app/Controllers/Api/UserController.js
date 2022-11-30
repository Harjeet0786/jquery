const { User } = require("../../Models");
const helper = require("../../../helper/helper.js");
const db = require("../../Models");


//user signup


 module.exports = class UserController {

async onGetAllUsers(req,res,next){
 
    let users=[];
 let data= await User.createUser(req.body);
 users.push(data);
 return data;
  }
  
  async onCreateUser(req,res,next){
 

//     let users=[];
//  let data= await User.createUser(req.body);
//  users.push(data);
//  return data;
try {
            console.log("hello");
            let hashedP = await helper.hashedPassword(req.body.password);
            let input = req.body;
            const token = await helper.sign("test");
            console.log("reached1");
            const users = {
              
              username: req.body.username,
              socket_id:req.body.socket_id,
              room:req.body.room
             
                };
                console.log(req.body);
                      console.log("reached2");
                
                      let userResponse = await User.create(users);
                      console.log("reached3", userResponse);
                
                      if (!users) {
                                return res.status(400).send({
                                  status: "RXERROR",
                                  message: "user  not create succesfully",
                                });
                              }
                              return res.status(200).send({
                                status: "RXSUCESS",
                                message: "user  created successfully",
                                data: users,
                              });
                            } catch (e) {
                              console.log("Error #91", e);
                              next(e);
                            }
                          }
  
    
  async onGetUserById(req,res,next){
 
    let users=[];
 let data= await User.createUser(req.params.id);
 users.push(data);
 return data;
  }
    
  async onDeleteUserById(req,res,next){
 
    let users=[];
 let data= await User.createUser(req.body);
 users.push(data);
 return data;
  }
  
 }


//   const users = [];

// // join users to chat
// function userJoin(id, username, room) {
//     const user = { id, username, room }
//     users.push(user);
//     return user;
// }

// function getCurrentUser(id) {
//     return users.find(user => user.id === id);
// }
// //user leaves user

// function userLeave(id) {
//     // console.log("kdsfmslkdfgmsdklngf")
//     const index = users.findIndex(user => user.id === id);
//     if (index !== -1) {
//         return users.splice(index, 1)[0];
//     }
// }
// function getRoomUsers(room) {
//     return users.filter(user => user.room === room);
// }

// module.exports = {
//     userJoin,
//     getCurrentUser,
//     userLeave,
//     getRoomUsers

// }






// async signup(req, res, next) {
//         try {
//           console.log("hello");
//           let hashedP = await helper.hashedPassword(req.body.password);
//           let input = req.body;
//           const token = await helper.sign("test");
//           console.log("reached1");
//           const users = {
//             firstname:req.body.firstname,
//             lastname:req.body.lastname,
//             username: req.body.username,
//             email: req.body.email,
//             password: hashedP,
//             token:token,
           
//               };
//               console.log(req.body);
//                     console.log("reached2");
              
//                     let userResponse = await User.create(users);
//                     console.log("reached3", userResponse);
              
//                     if (!users) {
//                               return res.status(400).send({
//                                 status: "RXERROR",
//                                 message: "user  not create succesfully",
//                               });
//                             }
//                             return res.status(200).send({
//                               status: "RXSUCESS",
//                               message: "user  created successfully",
//                               data: users,
//                             });
//                           } catch (e) {
//                             console.log("Error #91", e);
//                             next(e);
//                           }
//                         }

// ///user log in 



//   async login(req, res, next) {
//     try {
//         const users = await User.findOne({
//           where: {
//             email: req.body.email
//           },
//         });
//         console.log(users);
        
//         if (!users ) {
//           return res.status(400).send({
//             status: "RXERROR",
//             message: "user not found"
//           });
//         }
//         console.log (users);
//         const result = await helper.comparePass(req.body.password,users.password);
                                  
//         if (result == true) {
//           users.token = await helper.sign({ id: users.id });
//           console.log(typeof("token"));
//           console.log("token");
//            return res.status(201).send({
//             status: "RXSUCCESS",
//             message: "user login  succesfully now",
//             data: users,
//           });
//         } else {
//           return res.json({
//             status: "RXERROR",
//             message: "incorrect password",
//             data: {},
//           });
//         }
//       } catch (e) {
//         console.log(e);
//         next(e);
//         }
//       }  
//     }
    
    
      ////// get users
      // async getUser(req, res, next) {
      //   console.log("hello",req.params);
      //   try {
  

      //     //let userResponse = await User.findOne(req.query.id);
      //     //let userResponse = await User.findAll(req.query.id);
      //     //let userResponse = await User.findAll();
      //     let user = await User.findOne(req.params.id,{
      //       where: {
      //         id: 1,
      //       },
      //     });
      //     console.log(user);
    
      //     if (!user) {
      //       return res.status(400).send({
      //         status: "RXERROR",
      //         message: "user  not get succesfully",
      //       });
      //     }
      //     return res.status(200).send({
      //       status: "RXSUCESS",
      //       message: "user  get successfully",
      //       data: user,
      //     });
      //   } catch (e) {
      //     console.log("Error #91", e);
      //     next(e);
      //   }
      // }
//  async sendRequest(req,res,next){
       
//           try {
//             const user = await User.findOne(req.params.id,{
//                where: {
//                id: 1,
               
//                },
//                include: 'UserFriend',
//                 attributes:["send_by","send_to","type","status","notes"]
//            })
          //  pending=0,accept=1 reject =2,unfriend3
          // if(status==0 || status1) 
      //    let user_friends ={
      //     send_by: DataTypes.BIGINT,
      // send_to:DataTypes.BIGINT,
      // type:DataTypes.SMALLINT,
      // status:DataTypes.SMALLINT,
      // notes:DataTypes.TEXT
        //  }
      //      const userfriend=await UserFriend.create(user_friends);
      //     let user_friends={
      //       send_to:req.body.send_to,
      //       type:req.body.type,
      //       status:req.body.status,
      //       notes:req.body.notes,

      //     }
      // //      console.log(user_friends,"send to user")
      //      if (!user) {
      //       res.send(user.user_friend);}
      //    } catch (error) {
      //      res.send(error.message)
      //    }
      //  }
      // }
                 



// module.exports = class UserController {
 
// ////// user log in //////

//   async login(req, res, next) {
//     try {
//       const users = await User.findOne({
//         where: {
//           email: req.body.email
//         },
//       });
//       console.log(users);
      
//       if (!users ) {
//         return res.status(400).send({
//           status: "RXERROR",
//           message: "user not found"
//         });
//       }
// console.log (users);

//        const result = await helper.comparePass(req.body.password,users.password);

//       if (result == true) {
//         users.token = await helper.sign({ id: users.id });
//         console.log(typeof("token"));
//         console.log("token");


//         let userToken2 = await users.token;
//         let uId2 = await users.id;

//         let user_session_id = uId2;
//         let user_session_token = userToken2;
//         const user_sessions = {
//           user_id: user_session_id,
//           token: user_session_token,
//         }
        
//           try {
//             console.log(userToken2,"###########")
//             var userSessionReponse = await UserSession.create(user_sessions);
//             console.log(user_sessions);
//           } catch (err) {
//  console.log("#########s")
//             console.log(err);
//           }
//           if (!userSessionReponse) {
//             console.log("Some error occured");
//           } else {
//             console.log("created sucesssfully");
//           }
  
//           console.log("called user session");
  

//         return res.status(201).send({
//           status: "RXSUCCESS",
//           message: "user login  succesfully now",
//           data: users,
//         });
//       } else {
//         return res.json({
//           status: "RXERROR",
//           message: "incorrect password",
//           data: {},
//         });
//       }
//     } catch (e) {
//       console.log(e);
//       next(e);
//     }
//   }
  

//   ////  user signup //////


//   async signup(req, res, next) {
//     try {
//       console.log("hello");
//       let hashedP = await helper.hashedPassword(req.body.password);
//       let input = req.body;
//       const token = await helper.sign("test");
//     //  console.log(typeof(token));
//       console.log("reached1");
//       const users = {
//         name: req.body.name,
//         email: req.body.email,
//         password: hashedP,
//         token:token
//           };

//       console.log(req.body);
//       console.log("reached2");

//       let userResponse = await User.create(users);
//       console.log("reached3", userResponse);

//       //include the second model in create user

//       let userToken2 = userResponse.token;
//       let userid = userResponse.id;

      
//       let user_session_id=userid;
//       let user_session_token=userToken2;

//       const user_sessions = {
//         user_id: user_session_id,
//         token: user_session_token,
//       };
//       try {
//         var userSessionReponse = await UserSession.create(user_sessions);
//         console.log(userSessionReponse,"texxt")
//       } catch (err) {
//         console.log(err);
//       }
//       if (!userSessionReponse) {
//         console.log("Some error occured");
//       } else {
//         console.log("created sucesssfully");
//       }

//       console.log("called user session");


      
//       if (!users) {
//         return res.status(400).send({
//           status: "RXERROR",
//           message: "user  not create succesfully",
//         });
//       }
//       return res.status(200).send({
//         status: "RXSUCESS",
//         message: "user  created successfully",
//         data: users,
//       });
//     } catch (e) {
//       console.log("Error #91", e);
//       next(e);
//     }
//   }


//   //// get user with notes////

//   async getUserNotes(req, res, next) {
//     let data = await UserNote.findAll({
//       include:User
//     });
//     res.status(200).json(data);
//   }

//   //get user with  user session////
//   async getUserSession(req, res, next) {
//     let data = await UserSession.findAll({
//       include:User
//     });
//     res.status(200).json(data);
//   }




//    //get user with notes ans user session////
//   async getUserNotesWithUserSession(req, res, next) {
//     let data = await User.findAll({
//       include:
//       [
//         {
//           model: UserNote,
//         },
//         {
//           model: UserSession,
//         },
//       ],
//     });
//     res.status(200).json(data);
//   }
// };




