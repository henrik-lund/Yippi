import Joi from 'joi'

const loginSchema = Joi.object({
username: Joi.string()
.min(1)
.required()
,

password: Joi.string()
.min(1)
.required()
})

export { loginSchema }