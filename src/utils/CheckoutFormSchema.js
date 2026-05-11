import Joi from "joi";

// Joi-schema som validerar kassaformuläret i kundvagnen
export const checkoutSchema = Joi.object({
// address måste vara en icke-tom sträng
address: Joi.string()
.required()
.messages({
	'string.empty': 'Adress krävs',
	'any.required': 'Adress krävs'
}),

// postalCode måste vara exakt 5 siffror, t.ex. "12345"
// .pattern() tar ett regex och validerar att strängen matchar det
postalCode: Joi.string()
.pattern(/^\d{5}$/)
.required()
.messages({
	'string.empty': 'Postnummer krävs',
	'string.pattern.base': 'Ange ett giltigt postnummer',
	'any.required': 'Postnummer krävs'
}),

// paymentMethod måste vara antingen 'card' eller 'invoice'
paymentMethod: Joi.string().valid('card', 'invoice').required(),

// Joi.when() gör valideringen konditionell baserat på ett annat fälts värde
// Om paymentMethod är 'card' krävs ett kortnummer, annars är fältet valfritt
cardNumber: Joi.when('paymentMethod', {
is: 'card',
then: Joi.string().min(16).max(19).required().messages({
	'string.empty': 'Kortnummer krävs',
	'string.min': 'Kortnumret är för kort',
	'any.required': 'Kortnummer krävs'
}),
otherwise: Joi.optional()
}),

// Om paymentMethod är 'invoice' krävs en giltig e-postadress, annars valfritt
// tlds: { allow: false } gör att Joi inte kräver en riktig toppdomän (.com, .se osv.)
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

