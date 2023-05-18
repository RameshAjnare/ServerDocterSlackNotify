const user_schema = require('./userValSchema')

module.exports = {
    
    userRegister : async (req, res,next) =>{
        
        const  value = await user_schema.creatUser.validate(req.body, {abortEarly : false})
        if(value.error){
            res.status(510).json({
                status : "Failed",
                message : value.error.details[0].message
            })
        }else{
            next()
        }
    },

    userLogin : async (req,res,next) => {
        console.log("email====>",req.body);
        const value = await user_schema.loginUser.validate(req.body, {abortEarly : false})
        console.log("validation value======>",value);
        if(value.error){
        res.status(510).json({
             status : "Failed",
             message : value.error.details[0].message
        })
        }else{
           next()
        }
    }
}