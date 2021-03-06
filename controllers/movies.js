const Movie = require('../models/movie');
const NotFoundError = require('../utils/errors/notFound');
const BadRequestError = require('../utils/errors/badRequest');
const ForbiddenError = require('../utils/errors/forbidden');

module.exports.getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
        res.send({ movies })
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration, year, description,
    image, trailerLink, nameRU, nameEN, thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send({ movie }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Некорректные данные фильма');
      }
      throw err;
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params._id)
    .orFail(() => {
      throw new NotFoundError('Запрашиваемый фильм не найден');
    })
    .then((movie) => {
      if (req.user._id === movie.owner.toString()) {
        return Movie.findByIdAndRemove(req.params._id)
          .then(() => {
              res.send({ movie }); //check
          });
      } else {
        throw new ForbiddenError('Нельзя удалить фильм другого пользователя');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Некорректные данные');
      } else if (err.message === 'Запрашиваемый фильм не найден') {
        throw new NotFoundError('Запрашиваемый фильм не найден');
      } else if (err.message === 'Нельзя удалить фильм другого пользователя') {
        throw new ForbiddenError('Нельзя удалить фильм другого пользователя');
      }
      throw err;
    })
    .catch(next);
};
