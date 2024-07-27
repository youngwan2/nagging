import joi from 'joi';

export const emailSchema = joi.object({
  email: joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ['com', 'net'] },
  }),
});

export const accessTokenSchema = joi.object({
  access_token: [joi.string(), joi.number()],
});
