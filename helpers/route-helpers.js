const Joi = require('joi')

module.exports = {
  validateBody: (schema) => {
    return (req, res, next) => {
      const result = Joi.validate(req.body, schema)
      if (result.error){
        return res.status(400).json(result.error.details[0].message)
      }

      if (!req.value) {
        req.value = {}
      }
      req.value.body = result.value
      next()
    }
  },
  schemas: {
    signup: Joi.object().keys({
      signupUsername: Joi.string().alphanum().min(8).max(30).required(),
      signupEmail: Joi.string().email().required(),
      signupPassword: Joi.string().min(8).max(30).required(),
      signupConfirmPassword: Joi.string().min(8).max(30).required()
    }),
    login: Joi.object().keys({
      loginUsername: Joi.string().alphanum().min(8).max(30).required(),
      loginPassword: Joi.string().min(8).max(30).required()
    }),
    newEvent: Joi.object().keys({
      content: Joi.string().alphanum().min(4).max(30).required(),
      description: Joi.string().max(60).required(),
      start: Joi.date().iso(),
      end: Joi.date().iso().required()
    })
  }
}
