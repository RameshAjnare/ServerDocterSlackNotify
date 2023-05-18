const jwt = require('jsonwebtoken');
const userSchema = require('../model/user.model')

const checkUserAuth = async(req,res,next)=>{
    let token;
    const {authorization} = req.headers;
    try {
        if (authorization && authorization.startsWith("Bearer")) {
            token = authorization.split(" ")[1]
             const {userID} = await jwt.verify(token,process.env.USER_SCREATE_KEY)
             console.log("user id==>",userID);
             req.user = await userSchema.findOne({where:{id:userID}})
             console.log("user data ==>",req.user);
             next()
        }else{
            res.status(401).json({
                status:"Failed",
                message:"Not authoriz user.."
            })
        }
    } catch (error) {
        res.status(500).json({
            status:"Failed",
            message:"Authorization Error"
        })
    }
}

module.exports = checkUserAuth