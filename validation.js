const Joi = require('@hapi/joi')

const registerValidation = (data) => {
  const schema = {
    name: Joi.string()
      .required(),
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  }

  return Joi.validate(data, schema)
}

const loginValidation = (data) => {
  const schema = {
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .min(8)
      .required()
  }

  return Joi.validate(data, schema)
}

module.exports.registerValidation = registerValidation
module.exports.loginValidation = loginValidation
