
const express = require("express");
const { userAuth } = require("../middleware/auth");
const { ConnectionRequestModel} = require('../models/connectionRequest')
const User = require('../models/user')

const requestRouter = express.Router()


        requestRouter.post("/request/send/:status/:toUserId" ,userAuth , async (req, res) =>{
        
            try {
                
                const user = req.user;
                const fromUserId = req.user._id;
                const toUserId = req.params.toUserId ;
                const status = req.params.status ;
                

               //Status Check
               const allowedStatuses = ["ignored", "interested"];
               if (!allowedStatuses.includes(status)) {
               throw new Error("Invalid status type:" + status);
               }
                    
                 //toUser exist check 
                const toUser = await User.findById(toUserId);
                  if (!toUser) {
                    return res.status(400).json({  message: "User not found", success: false,});
                 }

               
              //Existing user exist check
               const existingConnectionRequest = await ConnectionRequestModel.findOne({
               $or: [
                  { fromUserId, toUserId },
                  { fromUserId: toUserId, toUserId: fromUserId },
               ],
               });
               // console.log(existingConnectionRequest);
               if (existingConnectionRequest) {
               throw new Error("Already sent the connection request before");
               }


                 const connectionRequest = new ConnectionRequestModel({
                    fromUserId,
                     toUserId,
                     status,
                 });
                  
                  const data = await connectionRequest.save();
                  res.status(200).json({
                     message: user.firstName + " is " + status + " in " + toUser.firstName,
                        data,
                       success: true,
                  });
            } 
               catch (error) {
                 res.status(400).json({ message: error.message,});
                 }    
        });



       module.exports = requestRouter ;