const router = require('express').Router();
const thoughtRoute = require('./thoughtRoutes');
const userRoute = require('./userRoutes');

router.use('/thoughts', thoughtRoute);
router.use('/users', userRoute);

module.exports = router;