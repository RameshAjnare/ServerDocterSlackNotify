const joi = require('@hapi/joi')
const { joiPasswordExtendCore } = require('joi-password');
const joiPassword = joi.extend(joiPasswordExtendCore);

console.log("hello=====>");
const user_schema = {

    creatUser: joi.object({
    
        first_name: joi.string().max(50).min(3).required().messages({
            'string.empty': 'Display name cannot be empty',
            'string.min': 'Min 2 characters',
        }),
        email: joi.string().trim().min(6).required().email().messages({
            'string.empty': 'Display email cannot be empty',
        }),
        password: joiPassword
            .string().trim()
            .minOfSpecialCharacters(2)
            .minOfLowercase(2)
            .minOfUppercase(1)
            .minOfNumeric(2)
            .noWhiteSpaces()
            .messages({
                'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                'password.minOfSpecialCharacters':
                    '{#label} should contain at least {#min} special character',
                'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                'password.noWhiteSpaces': '{#label} should not contain white spaces',
            }),
        work_space_auth_key: joi.string().trim().required().messages({
            'string.empty': 'Display city cannot be empty',
        }),
        work_space_sing_key: joi.string().trim().required().messages({
            'string.empty': 'Display state cannot be empty',
        }),
        channel_name: joi.string().trim().required().messages({
            'string.empty': 'Display state cannot be empty',
        })
    }).unknown(true),

    //user login validation
    loginUser: joi.object({
        email: joi.string().min(6).required().email().messages({
            'string.empty': 'Display email cannot be empty',
        }),
        password: joiPassword
            .string()
            .minOfSpecialCharacters()
            .minOfLowercase()
            .minOfUppercase()
            .minOfNumeric()
            .noWhiteSpaces()
            .messages({
                'password.minOfUppercase': '{#label} should contain at least {#min} uppercase character',
                'password.minOfSpecialCharacters':
                    '{#label} should contain at least {#min} special character',
                'password.minOfLowercase': '{#label} should contain at least {#min} lowercase character',
                'password.minOfNumeric': '{#label} should contain at least {#min} numeric character',
                'password.noWhiteSpaces': '{#label} should not contain white spaces',
            })
    })
}

module.exports = user_schema