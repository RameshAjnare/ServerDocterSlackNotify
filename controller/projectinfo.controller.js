const Project = require('../model/project.model')
const Domain = require('../model/domain.model')

const projectDetails = async(req,res)=>{
    try {
        console.log("project===>",req.body);
        await Project.create(req.body).then(result=>{
            return res.status(201).json({
                status: "success",
                message: "Data insert successfully..",
                data : result
            })
        })
        
    } catch (error) {
        res.status(500).json({
            status: "Error",
            message : error.message
        })
    }
}

const domainName = async(req,res)=>{
    try {
        await Domain.create(req.body).then(result=>{
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

module.exports = {projectDetails,domainName}