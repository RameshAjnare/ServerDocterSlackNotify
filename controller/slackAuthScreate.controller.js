const SlackAuthKeyRegister= require('../model/slackNotifaction.model')

const SlackInfoRegister = async(req,res)=>{
    try {
        await SlackAuthKeyRegister.create(req.body).then(result=>{
            return res.status(201).json({
                status: "success",
                message: "Data insert successfully..",
                data: result
            })
        })
        
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message : error.message
        })
    }
}

module.exports ={SlackInfoRegister}