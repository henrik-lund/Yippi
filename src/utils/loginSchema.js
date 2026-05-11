import Joi from 'joi'

// Joi-schema som validerar inloggningsformuläret
// Båda fälten måste vara ifyllda (min 1 tecken) för att validering ska godkännas
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