const router = require('express').Router();
const { auth } = require('../middlewares/auth');
const { loginValidation, createUserValidation } = require('../middlewares/validation');
const { login, createUser } = require('../controllers/auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const pathError = require('./pathError');

router.post('/signin', loginValidation, login);
router.post('/signup', createUserValidation, createUser);

router.use('/users', auth, usersRouter);
router.use('/movies', auth, moviesRouter);
router.use(pathError);

module.exports = router;
