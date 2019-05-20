const express = require('express');
const UserApiRouter = express.Router();

const UserModel = require("../models/userModel");

UserApiRouter.get("/",(req,res) =>{
    UserModel.find({}, (err,users) => {
        if(err) res.json({success: false,err})
        else res.json({success: true, data: users});
    })
});

UserApiRouter.post("/", (req,res) => {
    const {user} = req.body;
    UserModel.create({
        user: user,
    }, function (err,user) {
        if(err) res.json({success: false})
        else {
            res.json({success: true, id: user._id})
        }
    })
});

UserApiRouter.put("/",(req,res) =>{
    const id = req.query.id;
    UserModel.findById(id,(err,user)=>{
        if(err) res.json({success: false, err})
        else if(!user) res.json({success: false, err: "Not Found!"})
        else {
            for( let key in req.body){
                let value = req.body[key];
                if( value !== null){
                    user[key] = value;
                }
            }
            user.save((err,user) => {
                if(err) res.json({success: false})
                else {
                    res.json({success: true, data: user})
                }
            })
        }
    })

});

UserApiRouter.delete("/", function (req,res) {
    const id = req.query.id;
    UserModel.findByIdAndDelete(id,function (err) {
        if(err) res.json({success: false,err})
        else res.json({success: true,});
    })
})






module.exports = UserApiRouter;