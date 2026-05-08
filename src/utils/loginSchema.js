import Joi from 'joi'

const loginSchema = Joi.object({
username: Joi.string()
.min(1)
.required()
.valid('admin')
,

password: Joi.string()
.min(1)
.required()
.valid('password')
})

export { loginSchema }