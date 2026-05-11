import Joi from "joi";

export const checkoutSchema = Joi.object({
address: Joi.string()
.required()
.messages({
	'string.empty': 'Adress krävs',
	'any.required': 'Adress krävs'
}),

postalCode: Joi.string()
.pattern(/^\d{5}$/)
.required()
.messages({
	'string.empty': 'Postnummer krävs',
	'string.pattern.base': 'Ange ett giltigt postnummer',
	'any.required': 'Postnummer krävs'
}),

	paymentMethod: Joi.string().valid('card', 'invoice').required(),

cardNumber: Joi.when('paymentMethod', {
is: 'card',
then: Joi.string().min(16).max(19).required().messages({
	'string.empty': 'Kortnummer krävs',
	'string.min': 'Kortnumret är för kort',
	'any.required': 'Kortnummer krävs'
}),
otherwise: Joi.optional()
}),

email: Joi.when('paymentMethod', {
is: 'invoice',
then: Joi.string().email({ tlds: { allow: false } }).required().messages({
	'string.empty': 'E-postadress krävs',
	'string.email': 'Ange en giltig e-postadress',
	'any.required': 'E-postadress krävs'
}),
otherwise: Joi.optional()
})
})

