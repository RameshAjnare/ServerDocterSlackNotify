const { where } = require('sequelize');
const userSchema = require('../model/user.model')
const bcrypt = require('bcrypt')
const CryptoJS = require("crypto-js");
const jwtToken = require('jsonwebtoken')


const createUser = async (req, res) => {

    try {
        await userSchema.findOne({ where: { email: req.body.email } }).then(async (userExits) => {
            console.log("find data===>", userExits);
            if (userExits == null) {
                if (req.body.password === req.body.confirm_pass) {
                    // password encrypted 
                    const gensalt = await bcrypt.genSalt(10)
                    req.body.password = await bcrypt.hash(req.body.password, gensalt);
                    await userSchema.create(req.body).then(result=>{
                        return res.status(201).json({
                            status: "success",
                            message: "Data insert successfully..",
                            data:result
                        })
                    })
                } else {
                    return res.status(203).json({
                        message: "Password and Confirm Password should be same.."
                    })
                }
            } else {
                return res.status(203).json({
                    message: "Your data already exits.."
                })
            }
        })
    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }
}

const loginUser = async (req, res) => {
    try {
        await userSchema.findOne({ where: { email: req.body.email } }).then(async (userExits) => {
            const isPassMatch = await bcrypt.compare(req.body.password, userExits.password)
            if (isPassMatch) {
                const token = jwtToken.sign({ userID: userExits.id }, process.env.USER_SCREATE_KEY, { expiresIn: '2d' })
                res.status(200).json({
                    status: "success",
                    token: token
                })
            } else {
                res.status(200).json({
                    status: "Failed",
                    message: "Opps!!.. Password is not match.."
                })
            }
        })
    } catch (error) {
        res.status(500).json({
            status: "error",
            message: error.message
        })
    }
}

module.exports = { createUser, loginUser }