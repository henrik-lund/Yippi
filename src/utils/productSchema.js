import Joi from 'joi'

export const productSchema = Joi.object({
name: Joi.string().min(1).required().messages({
'string.empty': 'Namn krävs',
'any.required': 'Namn krävs'
}),
category: Joi.string().min(1).required().messages({
'string.empty': 'Kategori krävs',
'any.required': 'Kategori krävs'
}),
price: Joi.number().positive().required().messages({
'number.base': 'Pris måste vara ett nummer',
'number.positive': 'Pris måste vara positivt',
'any.required': 'Pris krävs'
})
})