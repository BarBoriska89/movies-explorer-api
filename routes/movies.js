const moviesRouter = require('express').Router();

const {
  createMovieValidation,
  deleteMovieValidation,
} = require('../middlewares/validation');
const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.get('/', getMovies);
moviesRouter.post('/', createMovieValidation, createMovie);
moviesRouter.delete('/:_id', deleteMovieValidation, deleteMovie);

module.exports = moviesRouter;
