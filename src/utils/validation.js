import Joi from '@hapi/joi';

const registerValidation = async (data) => {
  const registerSchema = Joi.object({
    name: Joi.string().min(6).required(),
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = await registerSchema.validate(data);
  return error
    ? {
        status: 400,
        error: {
          value: error.details[0].context.value,
          message: error.details[0].message,
        },
      }
    : null;
};

const loginValidation = async (data) => {
  const loginSchema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });
  const { error } = await loginSchema.validate(data);
  console.log(error);
  return error
    ? {
        status: 400,
        error: {
          value: error.details[0].context.value,
          message: error.details[0].message,
        },
      }
    : null;
};

export { registerValidation, loginValidation };
