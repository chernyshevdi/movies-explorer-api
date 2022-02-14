const { celebrate, Joi } = require('celebrate');
const { isURL } = require('validator');

const linkValidity = /^https?:\/\/(w{3}\.)*[a-z0-9-][-._~:/?[\]#@!$&'()*+,;=]*#?/;

const updateUserValidity = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
});

const createUserValidity = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).required().max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const loginValidity = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
});

const createMovieValidity = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().pattern(linkValidity).custom((value, helpers) => {
      if(isURL(value)) {
        return value;
      }
      return helpers.message('Неправильно заполнено поле image');
    }),
    trailerLink: Joi.string().required().pattern(linkValidity).custom((value, helpers) => {
      if(isURL(value)) {
        return value;
      }
      return helpers.message('Неправильно заполнено поле trailerLink');
    }),
    thumbnail: Joi.string().required().pattern(linkValidity).custom((value, helpers) => {
      if(isURL(value)) {
        return value;
      }
      return helpers.message('Неправильно заполнено поле thumbnail');
    }),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
    movieId: Joi.number().required(),
    _id: Joi.string().hex().length(24), //!!!
  }),
});

const cardIdValidity = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().required(),
  }),
});

module.exports = {
  updateUserValidity,
  createMovieValidity,
  loginValidity,
  createUserValidity,
  cardIdValidity,
};
