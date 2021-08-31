const { celebrate, Joi } = require('celebrate');

const createTaskValidation = celebrate({
  body: Joi.object().keys({
    task: Joi.string().required().min(2).max(400).messages({
        'string.min': 'Минимальная длина - 2 символа',
        'string.max': 'Максимальная длина - 400 символов',
        'string.required': 'Обязательное поле',
      }),
  }),
});

module.exports = createTaskValidation;