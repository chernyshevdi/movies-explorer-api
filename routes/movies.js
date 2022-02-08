const moviesRouter = require('express').Router();
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidity, cardIdValidity, } = require('../middlewares/validity');

moviesRouter.get('/movies', getMovies);
moviesRouter.post('/movies', createMovieValidity, createMovie);
moviesRouter.delete('/movies/:_id', cardIdValidity, deleteMovie);

module.exports = moviesRouter;