const mongoose = require('mongoose');
const Movie = require('../models/movie');

const BadRequest = require('../errors/BadRequest');
const NotFound = require('../errors/NotFound');
const ForbiddenError = require('../errors/ForbiddenError');

const getMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => {
      console.log(movies);
      res.send(movies);
    })
    .catch(next);
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
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
    thumbnail,
    owner,
    movieId,
    nameRU,
    nameEN,
  })
    .then((movie) => {
      res.send(movie);
    })
    .catch((err) => {
      console.log(err);
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные при создании фильма.'));
      } else {
        next(err);
      }
    });
};

const deleteMovie = (req, res, next) => {
  console.log(req.params);
  const movieId = req.params._id;
  console.log(movieId);

  Movie.findById(movieId)
    .then((movie) => {
      if (!movie) {
        throw new NotFound(`Фильм с указанным _id ${movieId} не найден. `);
      }
      if (!movie.owner.equals(req.user._id)) {
        throw new ForbiddenError('Вы не можете удалить чужой фильм.');
      }
      return Movie.deleteOne(movie)
        .then(() => { res.send({ message: 'Фильм удален.' }); });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new BadRequest(`Фильм с указанным _id ${movieId} не найден. `));
      } else {
        next(err);
      }
    });
};

module.exports = { getMovies, createMovie, deleteMovie };
